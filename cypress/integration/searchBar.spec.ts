describe('searchBar', () => {
    before(() => {
        cy.server()
        cy.route('/.netlify/functions/countries', 'fixture:countries').as(
            'getCountries'
        )

        cy.route('/api?countrycode=NLL', 'fixture:countryNL').as('getCountryNL')

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
})

// check closing button
// swiping and swipebutton

export {}
