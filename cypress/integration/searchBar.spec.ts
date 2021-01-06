describe('searchBar', () => {
    before(() => {
        cy.server()
        // stubbing might not be the way to go
        cy.route('/.netlify/functions/countries', 'fixture:countries').as(
            'getCountries'
        )
        cy.visit('/')
        cy.wait('@getCountries')
    })

    it('it should wait for loading to finish', () => {
        cy.get('[data-testid=loader]', { timeout: 5000 }).should(
            'not.be.visible'
        )
    })

    describe('countriesLIst', () => {
        it('it should open the countries element and show the countries when searchinput is clicked', () => {
            cy.get('[data-cy=searchInputField]').click()
        })

        it('it should filter the countries when searched', () => {
            cy.get('[data-cy=searchInputField]').type('Netherlands')
            cy.get('[data-testid=CountriesListItem]').should(
                'have.text',
                'Netherlands'
            )
        })

        it('it should open selected country drawer', () => {
            cy.get('[data-testid=CountriesListItem]').click()
            cy.get('.leaflet-marker-icon').click({ force: true })
            cy.get('[data-jy=countryDrawerTitle]').should(
                'have.text',
                'Netherlands'
            )
        })
    })
})

// check closing button
// check drawer

export {}
