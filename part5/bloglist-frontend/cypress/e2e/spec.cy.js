describe('Blog page', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "bilal",
      username: "bilal",
      password: "bilal"
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')

  })
  it('front page can be opened', function ()  {
    cy.contains('login').click()
  })

  it('contains login form', function () {
    cy.contains('login').click()
    cy.contains('Login Form')
  })

  it('can login with correct credentials', function () {
    cy.contains('login').click()
    cy.get("#username").type("bilal")
    cy.get("#password").type("bilal")

    cy.get("#loginbutton").click()
    cy.contains("bilal logged in")
    cy.contains("logout").click()
  })

  it('fails with the wrong credentials', function () {
    cy.contains('login').click()
    cy.get("#username").type("wrong")
    cy.get("#password").type("wrong")

    cy.get("#loginbutton").click()
    cy.contains("wrong username or password")
  })
})


describe("When user is logged in, they can create a blog", function () {

  beforeEach(function (){
    cy.visit('http://localhost:3000/')
    cy.contains("login").click()
    cy.get("#username").type("bilal")
    cy.get("#password").type("bilal")
    cy.get("#loginbutton").click()

    
  })

  it("logged in and can create a new blog", function () {
    
    cy.contains("bilal logged in")
    cy.contains("new blog").click()
    cy.get('input[placeholder="title"]').type("test blog by bilal")
    cy.get('input[placeholder="author"]').type("bilal")
    cy.get('input[placeholder="url"]').type("testingblog.com")
    cy.get('button').contains("create").click()
    cy.contains("blog has been added")
  })

  it("user can like the blog", function () {
    cy.contains("view").click()
    cy.get("button").contains("like").click()
    cy.contains("1")
  })

  it("user who created the blog can delete the blog", function() {
    cy.contains("view").click()
    cy.contains("remove").click()
    cy.contains("view").should("not.exist")


  })

})