/* eslint-disable cypress/no-unnecessary-waiting */
describe('Scroll Buttons', () => {
  const waitTime = 500

  it('Scroll buttons appear and function correctly', () => {
    cy.visit('/#sample')
    cy.get('nav')
      .contains('Start Voting')
      .click()
    cy.contains('Next →').click()
    cy.wait(waitTime)
    cy.contains('Next →').click()
    cy.wait(waitTime)
    cy.contains('Brad Plunkard').should('be.visible')
    cy.queryByText('↑ See More', { timeout: 0 }).should('not.be.visible')
    cy.queryByText('↓ See More', { timeout: 0 }).should('not.be.visible')
    cy.contains('Next →').click()
    cy.wait(waitTime)
    cy.get('button').should('have.length', 26 + 7) // 26 candidates + 7 UI
    cy.contains('Charlene Franz').should('be.visible')
    cy.contains('↑ See More').should('be.disabled')
    cy.contains('↓ See More').click()
    cy.wait(waitTime)
    cy.contains('Charlene Franz', { timeout: 0 }).should('not.be.visible')
    cy.contains('↓ See More').click()
    cy.wait(waitTime)
    cy.contains('↓ See More').click()
    cy.wait(waitTime)
    cy.contains('↓ See More').click()
    cy.wait(waitTime)
    cy.contains('↓ See More').click()
    cy.wait(waitTime)
    cy.contains('Glenn Chandler').should('be.visible')
    cy.contains('↓ See More').should('be.disabled')
    cy.contains('↑ See More').click()
    cy.wait(waitTime)
    cy.contains('↑ See More').click()
    cy.wait(waitTime)
    cy.contains('↑ See More').click()
    cy.wait(waitTime)
    cy.contains('↑ See More').click()
    cy.wait(waitTime)
    cy.contains('↑ See More').click()
    cy.wait(waitTime)
    cy.contains('Charlene Franz').should('be.visible')
  })
})
