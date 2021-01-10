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

    describe('countriesList', () => {
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
    })

    describe('countriesList', () => {
        it('it should open selected country drawer and show country title', () => {
            cy.get('[data-testid=CountriesListItem]').click()
            cy.get('.leaflet-marker-icon').click({ force: true })
            cy.get('[data-jy=countryDrawerTitle]').should(
                'have.text',
                'Netherlands'
            )
        })

        it('it should show country information', () => {
            // stub or mock call and check if data is there.
            cy.get('[data-testid=countryNativeName]').contains(/Native name: /)
            cy.get('[data-testid=countryRegionName]').contains(/Region: /)
            cy.get('[data-testid=countrySubRegionName]').contains(/Subregion: /)
            cy.get('[data-testid=countryPopulation]').contains(/Population: /)
            cy.get('[data-testid=countryCurrencies]').contains(/Currencies: /)
        })

        it('it should show country advisory', () => {})

        it('it should close the drawer on button click', () => {
            cy.get('[data-testid=SwipeIndicator]').click()

            cy.get('[data-testid=swipeableDrawer]').should('not.exist')
        })
    })
})

// check closing button
// check drawer

export {}
