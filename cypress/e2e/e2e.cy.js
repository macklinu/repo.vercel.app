/* global cy */

describe('repo.now.sh', () => {
  it('can visit homepage', () => {
    cy.visit('/')
    cy.get('[data-testid=app-title]').should('to.contain', 'repo.now.sh')
  })
  it('redirects to GitHub project for valid repo', () => {
    cy.visit('/react')
    cy.url().should('equal', 'https://github.com/facebook/react')
  })
  it('shows error page for project that is not found', () => {
    cy.visit('/@macklinu/not-a-thing')
    cy.get('[data-testid=error-message]').should(
      'to.contain',
      "It looks like @macklinu/not-a-thing wasn't found in the npm registry."
    )
  })
})
