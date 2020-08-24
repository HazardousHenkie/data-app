describe('HomePage', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('MenuDrawer', () => {
        it('it should open the drawer when button is clicked and close when clicked again', () => {
            cy.get('[data-testid=IconButtonStyled]').click()
            cy.get('[data-testid=StyledDrawer]')
            cy.get('.MuiBackdrop-root').click()
            cy.get('[data-testid=StyledDrawer]').should('not.exist')
        })

        it('it should change language correctly', () => {
            cy.get('[data-testid=IconButtonStyled]').click()
            cy.get('[data-testid=languageSwitcher_select]').click()
            cy.get('[role=option]')
                .eq(1)
                .click()
            cy.get('.MuiBackdrop-root').click()
            cy.get('[placeholder=検索]')
        })
    })
})

// login/logout test
// should display favorited countries when logged in (also already done in jest)
// should test change languages
// should test change theme
// check if all three langauges are present?

export {}
