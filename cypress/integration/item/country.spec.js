/* global describe, it, cy, before */
import * as queryString from 'query-string'

const wetuDesc = `Spectacularly located`

describe('Item Page - Country', () => {
  it('country loads', () => {
    cy.itemPageCountryLoad()
    cy.get('h2').contains('South Africa')
    cy.wait(4000)

    // Checking for language switcher
    cy.get('[data-test=item-language-switcher]').should('have.length', 1)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains(wetuDesc)

    //check images
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')

    // check location
    cy.get('[data-test=item-location-header]').should('not.exist')
    // Check location
    cy.get('[data-test=item-information-header]').contains('Information')
    cy.get('[data-test=item-information-additional_info]')
    cy.get('[data-test=item-information-climate]')
    cy.get('[data-test=item-information-cuisine]')
    cy.get('[data-test=item-information-currency]')
    cy.get('[data-test=item-information-dress]')
    cy.get('[data-test=item-information-electricity]')
    cy.get('[data-test=item-information-entry_requirements]')
    cy.get('[data-test=item-information-health]')
    cy.get('[data-test=item-information-safety]')

    // Check additional info
    cy.get('[data-test="item-information-additional_info"]').click().contains('Additional Infor EN')

    // check source
    cy.get('[data-test=source]').should('not.exist')

    // check language switcher
    cy.get('[data-test=item-language-switcher]').click()
    cy.get('a').contains('Deutsch').click()

    // assert that user route to correct query
    cy.location().should((location) => {
      expect(queryString.parse(location.search).language).to.eq('de-DE')
    })
    cy.get('[data-test=item-description-wrapper]').contains('DE Desc')
    cy.get('[data-test="item-information-additional_info"]').click().contains('Additional DE')

    cy.get('[data-test=item-language-switcher]').click()
    cy.get('a').contains('English (UK)').click()
  })
})
