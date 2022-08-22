describe('Note app', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it(`front page can be opened`, () => {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    // it('front page contains random text', function() {
    //     cy.visit('http://localhost:3000')
    //     cy.contains('wtf is this app?')
    // })
    // it('login form can be opened', function() {
    //     cy.contains('login').click()
    // })
    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Nick logged in')
    })
    describe('when logged in', function () {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('input:first').type('admin')
            cy.get('input:last').type('salainen')
            cy.get('#login-button').click()    
        })
        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
    })
})