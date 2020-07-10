/* global describe, it, cy, before */

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

    // Check category
    cy.get('[data-test=category]')
      .find('p')
      .contains('Eco-Budget')

    // Check item allowed
    cy.get('[data-test=Allowed]').contains('Allowed')

    // Check item initial rank
    cy.get('[data-test=ranking]')
      .find('p')
      .contains('No Rank')
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

    // Blacklisting
    cy.get('[data-test=Blacklisting]').as('Blacklisting')

    cy.get('@Blacklisting')
      .find('[data-test=Status]')
      .setSelectOption('Blacklisted')

    cy.get('@Blacklisting')
      .find('[data-test=Markets]')
      .setSelectOption('all markets')

    cy.get('@Blacklisting')
      .find('[data-test=Reason-1]')
      .click({ force: true })

    cy.get('@Blacklisting')
      .find('[data-test=Notes]')
      .type('Closed for Corona Season ⚰️')

    // EDIT ITEM
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type('new description here done')

    // Ranking Dropdown should be disabled
    cy.get('[data-test=ranking]')
      .invoke('attr', 'data-test-disabled')
      .should('eq', 'false')

    // Edit category
    // check the existing category selection is currently chosen Eco-Budget
    cy.get('[data-test=category-dropdown]').contains('Eco-Budget')
    cy.get('[data-test=category]').setSelectOption('High-End', 500)

    // Edit ranking
    cy.get('[data-test=ranking-dropdown]').contains('No Rank')
    cy.get('[data-test=ranking]').setSelectOption('2nd', 500)

    cy.get('[data-test=item-page]')
      .find('[data-test=address]')
      .setSelectOption('las heras recoleta argentina', 1500)

    cy.get('[data-test=save-item-button]').click()

    // assert edited item
    cy.get('h2').contains('131 on Herbert Baker Boutique Hotel')
    cy.get('[data-test=item-description-wrapper]').contains('new description here done')

    // assert blacklisting
    cy.get('[data-test=Blacklisted-GB]').should('exist')
    cy.get('[data-test=Blacklisted-DE]').should('exist')
    cy.get('[data-test=Blacklisted-NL]').should('exist')
    cy.get('[data-test=Blacklisted-FR]').should('exist')
    cy.get('[data-test=Blacklisted-US]').should('exist')

    cy.get('[data-test=Reason]').contains('Closed for Corona Season ⚰️')

    // assert category
    cy.get('[data-test=category]')
      .find('p')
      .contains('High-End')

    // assert ranking
    cy.get('[data-test=ranking]')
      .find('p')
      .contains('2nd')

    // Assert the lat lng inputs are disabled when address has been filled out
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

    cy.get('[data-test=edit-item-button]').click()

    // changing the category should update the ranking
    cy.get('[data-test=category]').setSelectOption('Standard', 500)

    cy.get('[data-test=save-item-button]').click()

    // assert category and ranking
    cy.get('[data-test=category]')
      .find('p')
      .contains('Standard')

    // assert ranking
    cy.get('[data-test=ranking]')
      .find('p')
      .contains('No Rank')
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
