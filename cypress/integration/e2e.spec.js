/* global cy */

describe('repo.now.sh', function() {
  it('can visit homepage', function() {
    cy.visit('/')
    cy.get('[data-testid=app-title]').should('to.contain', 'repo.now.sh')
  })
  it('redirects to GitHub project for valid repo', function() {
    cy.visit('/react')
    cy.url().should('equal', 'https://github.com/facebook/react')
  })
  it('shows error page for project that is not found', function() {
    cy.visit('/@macklinu/not-a-thing')
    cy.get('[data-testid=error-message]').should(
      'to.contain',
      "It looks like @macklinu/not-a-thing wasn't found in the npm registry."
    )
  })
})
