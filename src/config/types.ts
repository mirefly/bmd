import {
  OptionalVote,
  VotesDict,
  Contests,
  BallotStyle,
  Precinct,
  Election,
} from '@votingworks/ballot-encoder'
import { Printer } from '../utils/printer'

// Generic
export type VoidFunction = () => void

// App
export type AppModeNames = 'VxMark' | 'VxPrint' | 'VxMark + VxPrint'
export interface AppMode {
  readonly name: AppModeNames
  readonly isVxPrint?: boolean
  readonly isVxMark?: boolean
}
export const VxPrintOnly: AppMode = { name: 'VxPrint', isVxPrint: true }
export const VxMarkOnly: AppMode = { name: 'VxMark', isVxMark: true }
export const VxMarkPlusVxPrint: AppMode = {
  name: 'VxMark + VxPrint',
  isVxPrint: true,
  isVxMark: true,
}

export function getAppMode(name: AppModeNames): AppMode {
  switch (name) {
    case VxPrintOnly.name:
      return VxPrintOnly
    case VxMarkOnly.name:
      return VxMarkOnly
    case VxMarkPlusVxPrint.name:
      return VxMarkPlusVxPrint
    default:
      throw new Error(`unknown app mode: ${name}`)
  }
}

// Events
export type EventTargetFunction = (event: React.FormEvent<EventTarget>) => void

// Election
export interface ActivationData {
  ballotCreatedAt: number
  ballotStyle: BallotStyle
  precinct: Precinct
}

export interface SerializableActivationData {
  ballotCreatedAt: number
  ballotStyleId: string
  precinctId: string
}

// Votes
export interface WriteInCandidateTally {
  name: string
  tally: number
}
export type TallyCount = number
export interface CandidateVoteTally {
  candidates: TallyCount[]
  writeIns: WriteInCandidateTally[]
}
export interface YesNoVoteTally {
  yes: TallyCount
  no: TallyCount
}
export type Tally = (CandidateVoteTally | YesNoVoteTally)[]

// Ballot
export type UpdateVoteFunction = (contestId: string, vote: OptionalVote) => void
export type MarkVoterCardFunction = () => Promise<boolean>
export interface BallotContextInterface {
  activateBallot: (activationData: ActivationData) => void
  appMode: AppMode
  ballotStyleId: string
  contests: Contests
  readonly election: Election
  isLiveMode: boolean
  markVoterCardPrinted: MarkVoterCardFunction
  markVoterCardVoided: MarkVoterCardFunction
  precinctId: string
  printer: Printer
  resetBallot: (path?: string) => void
  setUserSettings: SetUserSettings
  updateTally: () => void
  updateVote: UpdateVoteFunction
  userSettings: UserSettings
  votes: VotesDict
}

// Smart Card Content
export type CardDataTypes = 'voter' | 'pollworker' | 'clerk'
export interface CardData {
  readonly t: CardDataTypes
}
export interface VoterCardData extends CardData {
  readonly t: 'voter'
  readonly c: number // created date
  readonly bs: string // ballot style id
  readonly pr: string // precinct id
  readonly uz?: number // used (voided)
  readonly bp?: number // ballot printed date
  readonly u?: number // updated date
  readonly m?: string // mark machine id
}
export interface PollworkerCardData extends CardData {
  readonly t: 'pollworker'
  readonly h: string
}
export interface ClerkCardData extends CardData {
  readonly t: 'clerk'
  readonly h: string
}

export interface CardAbsentAPI {
  present: false
}
export interface CardPresentAPI {
  present: true
  shortValue?: string
  longValueExists?: boolean
}
export type CardAPI = CardAbsentAPI | CardPresentAPI

// Machine ID API
export interface MachineIdAPI {
  machineId: string
}

// User Interface
export type ScrollDirections = 'up' | 'down'
export interface ScrollShadows {
  showBottomShadow: boolean
  showTopShadow: boolean
}
export interface Scrollable {
  isScrollable: boolean
}

export type TextSizeSetting = 0 | 1 | 2 | 3

export interface UserSettings {
  textSize: TextSizeSetting
}
export type SetUserSettings = (partial: PartialUserSettings) => void
export type PartialUserSettings = Partial<UserSettings>

export default {}
