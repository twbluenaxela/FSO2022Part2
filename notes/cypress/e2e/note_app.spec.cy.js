describe('Note app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tudou',
      username: 'tudou',
      password: 'tudou'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('tudou')
    cy.get('#password').type('tudou')
    cy.get('#login-button').click()

    cy.contains('Tudou logged in')
})
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('tudou')
    cy.get('#password').type('tudou')
    cy.get('#login-button').click()

    cy.contains('Tudou logged in')
  })


  // it('login fails with wrong password', function () {
  //   cy.contains('login').click()
  //   cy.get('#username').type('mluukai')
  //   cy.get('#password').type('wrong')
  //   cy.get('#login-button').click()
  //   cy.get('.error')
  //   .should('contain', 'wrong credentials')
  //   .and('have.css', 'color', 'rgb(255, 0, 0)')
  //   .and('have.css', 'border-style', 'solid')

  //   cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  //   //wow... so remember to include the space between each color value or else the test will fail
  // })
  // it('front page contains random text', function() {
  //     cy.visit('http://localhost:3000')
  //     cy.contains('wtf is this app?')
  // })

  
  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'tudou', password: 'tudou' })
      // cy.contains('login').click()
      // cy.get('input:first').type('tudou')
      // cy.get('input:last').type('tudou')
      // cy.get('#login-button').click()
    })
    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()

      cy.contains('a note created by cypress')
    })
    describe('and a note exists', function () {
      beforeEach(function() {
        // cy.contains('new note').click()
        // cy.get('input').type('another note cypress')
        // cy.contains('save').click()
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })
      it('it can be made important', function() {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})