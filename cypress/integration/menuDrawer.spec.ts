import { initialUserState } from '../../src/globals/authentication/constants'
import { loginSuccess } from '../../src/globals/authentication/login/actions'
import { logoutSuccess } from '../../src/globals/authentication/logout/actions'

describe('MenuDrawer', () => {
    before(() => {
        cy.visit('/')
    })

    it('it should wait for loading to finish', () => {
        cy.get('[data-testid=loader]', { timeout: 5000 }).should(
            'not.be.visible'
        )
    })

    it('it should open the drawer when button is clicked and close when clicked again', () => {
        cy.get('[data-testid=IconButtonStyled]').click()
        cy.get('[data-testid=StyledDrawer]')
        cy.get('.MuiBackdrop-root').click()
        cy.get('[data-testid=StyledDrawer]').should('not.exist')
    })

    describe('LanguageSwitcher', () => {
        it('it should show the language title', () => {
            cy.get('[data-testid=IconButtonStyled]').click()
            cy.get('[data-cy=languageTitleText]').should(
                'have.text',
                'Language'
            )
        })

        it('it should show all three languages as options', () => {
            cy.get('[data-testid=languageSwitcher_select]').click()
            cy.get('[role=option]').should('have.length', 3)
            cy.get('[role=option]')
                .eq(0)
                .should('have.text', 'en')
            cy.get('[role=option]')
                .eq(1)
                .should('have.text', 'ja')
            cy.get('[role=option]')
                .eq(2)
                .should('have.text', 'nl')
        })

        it('it should change language correctly', () => {
            cy.get('[role=option]')
                .eq(1)
                .click()
            cy.get('.MuiBackdrop-root').click()
            cy.get('[placeholder=検索]')
            cy.get('[data-testid=IconButtonStyled]').click()
            cy.get('[data-testid=languageSwitcher_select]').click()
            cy.get('[role=option]')
                .eq(0)
                .click()
        })
    })

    describe('ThemeSwitcher', () => {
        it('it should show the theme title', () => {
            cy.get('[data-cy=themeSwitcherText]').should('have.text', 'Theme')
        })

        it('it should change theme correctly', () => {
            cy.get('[data-testid=app]').should('have.class', 'darkmode')
            cy.get('[data-testid=ThemeSwitcher]').click()
            cy.get('[data-testid=app]').not('darkmode')
            cy.get('[data-testid=ThemeSwitcher]').click()
            cy.get('[data-testid=app]').should('have.class', 'darkmode')
        })
    })

    describe('authentication', () => {
        it('it should have the app title', () => {
            cy.get('[data-cy=appTitle]').should('have.text', 'Data App')
        })

        it('it should login correctly', () => {
            cy.get('[data-testid=googleLoginButton]')
            cy.window()
                .its('store')
                .invoke('dispatch', loginSuccess(initialUserState))
            cy.get('[data-testid=googleLogoutButton]')
        })

        it('it should logout correctly', () => {
            cy.get('[data-testid=googleLogoutButton]')
            cy.window()
                .its('store')
                .invoke('dispatch', logoutSuccess())
            cy.get('[data-testid=googleLoginButton]')
            cy.get('.MuiBackdrop-root').click()
        })
    })
})

// should display favorited countries when logged in (also already done in jest)

export {}
