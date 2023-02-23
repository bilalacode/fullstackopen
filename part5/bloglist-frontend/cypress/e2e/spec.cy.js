describe('Blog page', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('login').click()
  })

  it('contain,s login form', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('login').click()
    cy.contains('Login Form')
  })

})