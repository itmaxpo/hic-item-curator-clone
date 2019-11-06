import * as queryString from 'query-string'

const wetuDesc = `Spectacularly located`

describe('Item page', () => {
  before(() => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageAccommodationLoad()
  })

  it('accommodation loads', () => {
    cy.wait(4000)
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
  })

  it('accommodation item layout check', () => {
    // Check basic information
    cy.get('[data-test=item-supplier-tag]').contains('Alex1')
    // Checking for length 2 because one is rendered and second is in the dropdown
    cy.get('[src="//www.countryflags.io/GB/flat/64.png"]').should('have.length', 2)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains('No description')
  })

  it('accommodation rooms check', () => {
    // Check rooms
    cy.get('[data-test=item-rooms-header]').contains('Rooms')
    cy.get('.accordion')
      .children()
      .should('have.length', 4)

    const names = ['Presidential Suite', 'Front View', 'Luxury Suite', 'Pool View']
    names.forEach((el, i) => {
      cy.get('.accordion > div')
        .eq(i)
        .contains(names[i])
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

  it('accommodation editing item layout', () => {
    // Check editing item page
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=save-item-button]')
    cy.get('[data-test=cancel-item-button]')
  })

  it('accommodation editing item properties', () => {
    // EDIT ITEM
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-supplier-dropdown]').setSelectOption('aot', 1000)
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type('new description here done')
    cy.get('[data-test=item-page]')
      .find('[data-test=address]')
      .setSelectOption('las heras recoleta argentina', 1500)
    cy.get('[data-test=save-item-button]').click()
  })

  it('accommodation check edited item properties', () => {
    // Check edited item
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel2')
    cy.get('[data-test=item-supplier-tag]').contains('aot')
    cy.get('[data-test=item-description-wrapper]').contains('new description here done')
  })

  it('accommodation cancel item editing changes', () => {
    // Edit for cancellation
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-title-input]').type('10')
    cy.get('[data-test=item-supplier-dropdown]').setSelectOption('egoli', 1000)
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type('new description here done2')
    cy.get('[data-test=cancel-item-button]').click()
    // Should have basic information
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
    cy.get('[data-test=item-supplier-tag]').contains('Alex1')
    cy.get('[data-test=item-description-wrapper]').contains('No description')
  })

  it('area loads', () => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageAreaLoad()
    cy.get('h2').contains('Some example oof Area')
    cy.wait(4000)
  })

  // Check basic information
  it('area check item layout', () => {
    // Checking for length 2 because one is rendered and second is in the dropdown
    cy.get('[src="//www.countryflags.io/GB/flat/64.png"]').should('have.length', 2)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains('Some description')
  })

  it('area check images', () => {
    // Check images
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')
  })

  it('area check location', () => {
    // Check location
    cy.get('[data-test=item-location-header]').contains('Location')
  })

  it('area check edit buttons', () => {
    // Check editing item page
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type(' again')
    cy.get('[data-test=save-item-button]').click()
  })

  it('area check edited item', () => {
    // Check edited item
    cy.get('h2').contains('Some example oof Area2')
    cy.get('[data-test=item-description-wrapper]').contains('Some description again')
  })

  it('country loads', () => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageCountryLoad()
    cy.get('h2').contains('South Africa')
    cy.wait(4000)
  })

  it('country check item layout', () => {
    // Checking for length 2 because one is rendered and second is in the dropdown
    cy.get('[src="//www.countryflags.io/GB/flat/64.png"]').should('have.length', 2)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains(wetuDesc)
  })

  it('country check images', () => {
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')
  })

  it('country check location', () => {
    cy.get('[data-test=item-location-header]').should('not.exist')
  })

  it('country check country information', () => {
    // Check location
    cy.get('[data-test=item-information-header]').contains('Information')
    cy.get('#accordion__heading-additional_info')
    cy.get('#accordion__heading-climate')
    cy.get('#accordion__heading-cuisine')
    cy.get('#accordion__heading-currency')
    cy.get('#accordion__heading-dress')
    cy.get('#accordion__heading-electricity')
    cy.get('#accordion__heading-entry_requirements')
    cy.get('#accordion__heading-health')
    cy.get('#accordion__heading-safety')
    // Check additional info
    cy.get('#accordion__heading-additional_info').click()
    cy.get('[data-test="item-information-Additional info"]').contains('Additional Infor EN')
  })

  it('country check language switcher', () => {
    cy.get('[src="//www.countryflags.io/GB/flat/64.png"]')
      .eq(0)
      .click({ force: true })
    cy.get('[src="//www.countryflags.io/DE/flat/64.png"]').click({ force: true })
    cy.get('[src="//www.countryflags.io/DE/flat/64.png"]').should('have.length', 2)
    // assert that user route to correct query
    cy.location().should(location => {
      expect(queryString.parse(location.search).language).to.eq('de-DE')
    })
    cy.get('[data-test=item-description-wrapper]').contains('DE Desc')
    cy.get('#accordion__heading-additional_info').click({ force: true })
    cy.get('[data-test="item-information-Additional info"]').contains('Additional DE')
    cy.get('[src="//www.countryflags.io/DE/flat/64.png"]')
      .eq(0)
      .click({ force: true })
    cy.get('[src="//www.countryflags.io/GB/flat/64.png"]').click({ force: true })
  })
})
