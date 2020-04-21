/* global describe, it, cy, before */
import * as queryString from 'query-string'

const wetuDesc = `Spectacularly located`

describe('Item page - Accommodation', () => {
  before(() => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageAccommodationLoad()
  })

  it('accommodation loads', () => {
    cy.wait(4000)
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
  })

  it('accommodation item layout check', () => {
    // Checking for language switcher
    cy.get('[data-test=item-language-switcher]').should('have.length', 1)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains('No description')
  })

  it('accommodation rooms check', () => {
    // Check rooms
    cy.get('[data-test=item-rooms-header]').contains('Rooms')

    const names = ['Presidential Suite', 'Front View', 'Luxury Suite', 'Pool View']
    const mealBases = ['BB', 'BB+', 'FB', 'FB+']
    names.forEach((el, i) => {
      cy.get(`[data-test=item-room-${i}]`)
        .find('p')
        .find('span')
        .first()
        .contains(names[i])
        .parent()
        .find('span')
        .last()
        .contains(mealBases[i])
    })
  })

  it('accommodation images check', () => {
    // Check images
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')
  })

  it('accommodation location check', () => {
    // Check location
    cy.scrollTo('bottom')
    cy.get('[data-test=item-location-header]').contains('Location')
    cy.get('.gm-style')
  })

  it('accommodation editing item properties', () => {
    // Check editing item page
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=save-item-button]')
    cy.get('[data-test=cancel-item-button]')
    // EDIT ITEM
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type('new description here done')
    cy.get('[data-test=item-page]')
      .find('[data-test=address]')
      .setSelectOption('las heras recoleta argentina', 1500)
    cy.get('[data-test=save-item-button]').click()

    // assert edited item
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
    cy.get('[data-test=item-description-wrapper]').contains('new description here done')

    // assert the lat lng inputs are disabled when address has been filled out
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-page]').as('itemPage')

    // Assert that lat/lon inputs are disabled when there is an address
    cy.get('@itemPage')
      .find('[data-test=latitude]')
      .should('be.disabled')

    cy.get('@itemPage')
      .find('[data-test=longitude]')
      .should('be.disabled')

    cy.get('@itemPage')
      .find('[data-test=address]')
      .clearSelectOption()

    cy.get('@itemPage')
      .find('[data-test=no-location]')
      .should('exist')

    cy.get('@itemPage')
      .find('[data-test=latitude]')
      .type('-34,5875522')

    cy.get('@itemPage')
      .find('[data-test=longitude]')
      .type('-58,3972196')

    cy.get('@itemPage')
      .find('[data-test=no-location]')
      .should('not.exist')

    cy.get('[data-test=save-item-button]').click()
  })

  it('accommodation cancel item editing changes', () => {
    // Edit for cancellation
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-title-input]').type('10')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type('new description here done2')
    cy.get('[data-test=cancel-item-button]').click()
    // Should have basic information
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
    cy.get('[data-test=item-description-wrapper]').contains('No description')
  })
})

describe('Item Page - Area', () => {
  it('area loads', () => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageAreaLoad()
    cy.get('h2').contains('Some example oof Area')
    cy.wait(4000)

    // check area item layout
    // Checking for language switcher
    cy.get('[data-test=item-language-switcher]').should('have.length', 1)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains('Some description')
    // Check images
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')

    // Check location
    cy.get('[data-test=item-location-header]').contains('Location')

    // Check editing item page
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type(' again')
    cy.get('[data-test=save-item-button]').click()

    // Check edited item
    cy.get('h2').contains('Some example oof Area2')
    cy.get('[data-test=item-description-wrapper]').contains('Some description again')
  })
})
describe('Item Page - Country', () => {
  it('country loads', () => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageCountryLoad()
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
    cy.get('[data-test="item-information-additional_info"]')
      .click()
      .contains('Additional Infor EN')

    // check language switcher
    cy.get('[data-test=item-language-switcher]').click()
    cy.get('a')
      .contains('Deutsch')
      .click()

    // assert that user route to correct query
    cy.location().should(location => {
      expect(queryString.parse(location.search).language).to.eq('de-DE')
    })
    cy.get('[data-test=item-description-wrapper]').contains('DE Desc')
    cy.get('[data-test="item-information-additional_info"]')
      .click()
      .contains('Additional DE')

    cy.get('[data-test=item-language-switcher]').click()
    cy.get('a')
      .contains('English (UK)')
      .click()
  })
})
