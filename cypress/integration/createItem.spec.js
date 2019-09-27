describe('Create Item', () => {
  before(() => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').createItemPageLoad()

    cy.get('[data-test=createItemPage]').as('createItemPage')
  })

  it('when creating an item', () => {
    // select item type: Accommodation
    cy.get('@createItemPage')
      .find('[data-test=item]')
      .setSelectOption('Accommodation')

    // set item name: Ah si el nombre
    cy.get('@createItemPage')
      .find('[data-test=name]')
      .type('Ah si el nombre')

    // set supplier tag: aot
    cy.get('@createItemPage')
      .find('[data-test=supplier]')
      .setSelectOption('aot')

    // select address: las heras recoleta argentina
    cy.get('@createItemPage')
      .find('[data-test=address]')
      .setSelectOption('las heras recoleta argentina', 1500)

    // assert that the item was correctly set
    cy.get('@createItemPage')
      .find('[data-test=item]')
      .contains('Accommodation')

    // assert that the supplier was correctly set
    cy.get('@createItemPage')
      .find('[data-test=supplier]')
      .contains('aot')

    // assert that the address was correctly set
    cy.get('@createItemPage')
      .find('[data-test=address]')
      .contains('Las Heras')

    // submit
    cy.get('@createItemPage')
      .find('[data-test=submit]')
      .click()

    // assert that user should be redirected to item page with the created item: item/test-123456
    cy.location().should(location => {
      expect(location.pathname).to.eq('/item/test-123456')
    })
  })
})
