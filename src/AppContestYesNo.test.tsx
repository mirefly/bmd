import React from 'react'
import { fireEvent, render, wait, within } from '@testing-library/react'

import App from './App'

import withMarkup from '../test/helpers/withMarkup'

import { advanceTimers, getNewVoterCard } from '../test/helpers/smartcards'

import {
  measure102Contest,
  setElectionInStorage,
  setStateInStorage,
} from '../test/helpers/election'
import { MemoryCard } from './utils/Card'
import { MemoryStorage } from './utils/Storage'
import { AppStorage } from './AppRoot'

jest.useFakeTimers()

beforeEach(() => {
  window.location.href = '/'
})

it('Single Seat Contest', async () => {
  // ====================== BEGIN CONTEST SETUP ====================== //

  const storage = new MemoryStorage<AppStorage>()
  const card = new MemoryCard()

  setElectionInStorage(storage)
  setStateInStorage(storage)

  const { getByText, queryByText, getByTestId } = render(
    <App storage={storage} card={card} />
  )

  // Insert Voter Card
  card.insertCard(getNewVoterCard())
  advanceTimers()

  // Go to First Contest
  await wait(() => fireEvent.click(getByText('Start Voting')))
  advanceTimers()

  // ====================== END CONTEST SETUP ====================== //

  const getByTextWithMarkup = withMarkup(getByText)

  // Advance to multi-seat contest
  while (!queryByText(measure102Contest.title)) {
    fireEvent.click(getByText('Next'))
    advanceTimers()
  }

  // Select Yes
  fireEvent.click(getByText('Yes'))
  expect(getByText('Yes').closest('button')!.dataset.selected).toBe('true')

  // Unselect Yes
  fireEvent.click(getByText('Yes'))
  expect(getByText('Yes').closest('button')!.dataset.selected).toBe('false')

  // Select Yes
  fireEvent.click(getByText('Yes'))
  expect(getByText('Yes').closest('button')!.dataset.selected).toBe('true')

  // Select No
  fireEvent.click(getByText('No'))
  expect(
    within(getByTestId('contest-choices'))
      .getByText('No')
      .closest('button')!.dataset.selected
  ).toBe('false')

  // Overvote modal is displayed
  getByTextWithMarkup(
    'Do you want to change your vote to No? To change your vote, first unselect your vote for Yes.'
  )
  fireEvent.click(getByText('Okay'))
  advanceTimers() // For 200ms Delay in closing modal

  // Go to review page and confirm write in exists
  while (!queryByText('Review Your Votes')) {
    fireEvent.click(getByText('Next'))
    advanceTimers()
  }

  const reviewTitle = getByTextWithMarkup(
    `${measure102Contest.section}${measure102Contest.title}`
  )
  const siblingTextContent =
    (reviewTitle.nextSibling && reviewTitle.nextSibling.textContent) || ''
  expect(siblingTextContent.trim()).toBe(
    `Yes on ${measure102Contest.shortTitle}`
  )
})
