describe('countryDrawer successfull countries call', () => {
    before(() => {
        cy.server()
        cy.route('/.netlify/functions/countries', 'fixture:countries').as(
            'getCountries'
        )

        cy.visit('/')

        cy.get('[data-testid=loader]', { timeout: 5000 }).should(
            'not.be.visible'
        )
        cy.get('[data-cy=searchInputField]').click()
        cy.get('[data-testid=CountriesListItem]')
            .eq(1)
            .click()

        cy.get('.leaflet-marker-icon').click({ force: true })

        cy.wait('@getCountries')
    })

    describe('countriesDrawer', () => {
        it('it should show country information', () => {
            cy.get('[data-testid=countryNativeName]').contains(
                'Native name: Nederland'
            )
            cy.get('[data-testid=countryRegionName]').contains('Region: Europe')
            cy.get('[data-testid=countrySubRegionName]').contains(
                'Subregion: Western Europe'
            )
            cy.get('[data-testid=countryPopulation]').contains(
                'Population: 17019800'
            )
            cy.get('[data-testid=countryCurrencies]').contains(
                'Currencies: EUR($)'
            )
        })

        describe('countriesDrawer general', () => {
            it('it should close the drawer on button click', () => {
                cy.get('[data-testid=SwipeIndicator]').click()

                cy.get('[data-testid=swipeableDrawer]').should('not.exist')
            })
        })
    })
})

describe('countryDrawer successfull country call', () => {
    before(() => {
        cy.server()
        cy.route('/.netlify/functions/countries', 'fixture:countries').as(
            'getCountries'
        )
        cy.route('/api?countrycode=NL', 'fixture:countryNL').as('getCountryNL')

        cy.visit('/')

        cy.get('[data-testid=loader]', { timeout: 5000 }).should(
            'not.be.visible'
        )
        cy.get('[data-cy=searchInputField]').click()
        cy.get('[data-testid=CountriesListItem]')
            .eq(1)
            .click()

        cy.get('.leaflet-marker-icon').click({ force: true })

        cy.wait('@getCountries')
        cy.wait('@getCountryNL')
    })

    describe('countriesDrawer advisory', () => {
        it('it should show country advisory', () => {
            cy.get('[data-cy=countryAdvisoryScoreText]').contains('Score: 4')
            cy.get('[data-cy=countryAdvisoryScoreMessage]').contains(
                'Message: Netherlands has a current risk level of 4 (out of 5). We advise: Please reconsider your need to travel to Netherlands.'
            )
            cy.get('[data-cy=countryAdvisorySource]').contains(
                'Source: https://www.travel-advisory.info/netherlands'
            )
            cy.get('[data-cy=countryAdvisoryDate]').contains(
                '2020-10-02 07:20:43'
            )
        })
    })
})

describe('countryDrawer fail', () => {
    before(() => {
        cy.server()
        cy.route('/.netlify/functions/countries', 'fixture:countries').as(
            'getCountries'
        )

        cy.route('/api?countrycode=NL', 'fixture:noData').as('getCountryNL')

        cy.visit('/')

        cy.get('[data-testid=loader]', { timeout: 5000 }).should(
            'not.be.visible'
        )
        cy.get('[data-cy=searchInputField]').click()
        cy.get('[data-testid=CountriesListItem]')
            .eq(1)
            .click()

        cy.get('.leaflet-marker-icon').click({ force: true })

        cy.wait('@getCountries')
        cy.wait('@getCountryNL')
    })

    it('it should show not found message for advisory', () => {
        cy.get('[data-testid=countryAdvisoryScore]').contains(
            'Advisory not found.'
        )
    })
})

// Advisory message not available. check
// check if values aren't available if nothing is shown (for example )
//   cy.get('[data-testid=countryPopulation]').contains(
// 'Population: 17019800'
// )

// make these test better by reusing stuff?

export {}
