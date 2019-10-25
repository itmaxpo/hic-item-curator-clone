import {
  firstPageAreaData,
  secondPageAreaData,
  fifthPageAreaData,
  lastPageAreaData,
  testItemPage,
  pageAccomData,
  pageAccomDataAfterMerge
} from './utils'

describe('Homepage', () => {
  before(() => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').homePageLoad()
  })

  it('it loads', () => {
    cy.get('h3').contains('What item are you looking for?')
  })

  it('go to country', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-country',
      'fixture:search/goToCountry.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/869babbb-d6b5-456b-a20c-0744b3e33d57?**',
      'fixture:search/emptyAreaName.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )

    cy.get('[data-test=searchBox]').as('searchBox')

    // select country tab
    cy.get('@searchBox')
      .find('[data-test=Country]')
      .click()

    // select country: Argentina
    cy.get('@searchBox')
      .find('[data-test=country-dropdown]')
      .setSelectOption('Argentina', 3000)

    // go to country
    cy.get('@searchBox')
      .find('[data-test=search]')
      .click()

    // assert that user is redirected to item page
    cy.location().should(location => {
      expect(location.pathname).to.eq('/item/test-argentina')
    })

    cy.go('back')
  })

  it('go to area', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-area',
      'fixture:search/goToArea.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/869babbb-d6b5-456b-a20c-0744b3e33d57?**',
      'fixture:search/emptyAreaName.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )

    cy.get('[data-test=searchBox]').as('searchBox')

    // select country tab
    cy.get('@searchBox')
      .find('[data-test=Area]')
      .click()

    // select area: Buenos Aires
    cy.get('@searchBox')
      .find('[data-test=area-dropdown]')
      .setSelectOption('Buenos Aires', 3000)

    // go to area
    cy.get('@searchBox')
      .find('[data-test=search]')
      .click()

    // assert that user is redirected to item page
    cy.location().should(location => {
      expect(location.pathname).to.eq('/item/test-buenos-aires')
    })

    cy.go('back')
  })

  it('search for areas', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-area',
      'fixture:search/areaSearch.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )

    cy.get('[data-test=searchBox]').as('searchBox')
    // clear area
    cy.get('@searchBox')
      .find('[data-test=area-dropdown]')
      .clearSelectOption()

    // search for areas
    cy.get('@searchBox')
      .find('[data-test=search]')
      .click()
      .wait(1000)

    cy.get('[data-test=searchResult]').as('searchResult')

    // assert first page items
    cy.get('[data-test=page]').within(() => {
      testItemPage(firstPageAreaData)
    })

    // go to next page and assert
    cy.get('@searchResult')
      .find('[data-test=next-page]')
      .click()
      .wait(1000)

    cy.get('[data-test=page]').within(() => {
      testItemPage(secondPageAreaData)
    })

    // go to previous page and assert first page items again
    cy.get('@searchResult')
      .find('[data-test=previous-page]')
      .click()
      .wait(1000)

    cy.get('[data-test=page]').within(() => {
      testItemPage(firstPageAreaData)
    })

    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-area',
      'fixture:search/secondAreaSearch.json'
    )
    // go to 5th page and assert
    cy.get('@searchResult')
      .find('[data-test=page-5]')
      .click()
      .wait(1000)

    // assert 5th page items
    cy.get('[data-test=page]').within(() => {
      testItemPage(fifthPageAreaData)
    })

    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-area',
      'fixture:search/lastAreaSearch.json'
    )
    // go to last page and assert
    cy.get('@searchResult')
      .find('[data-test=last-page]')
      .click()
      .wait(1000)

    cy.get('[data-test=page]').within(() => {
      testItemPage(lastPageAreaData)
    })
  })

  it('going to item page and back (back button functionality)', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-area',
      'fixture:search/lastAreaSearch.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )
    // go to item page and back
    cy.get('[data-test=page]')
      .find('#1392f674-67de-4ca5-8764-81f3f2de918d')
      .click()
      // assert that user is redirected to item page
      .location()
      .should(location => {
        expect(location.pathname).to.include('/item/1392f674-67de-4ca5-8764-81f3f2de918d')
      })
      .go('back')

    // assert
    cy.get('[data-test=page]').within(() => {
      testItemPage(lastPageAreaData)
    })
  })

  it('clicking the app icon should clear search box', () => {
    cy.get('[data-test=app-icon]').click({ force: true })

    cy.get('[data-test=searchBox]').as('searchBox')

    // country dropdown should not be rendered
    cy.get('@searchBox')
      .find('[data-test=country-dropdown]')
      .should('not.exist')

    // search button is disabled
    cy.get('@searchBox')
      .find('[data-test=search]')
      .should('be.disabled')
  })

  it('search for accommodations', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-country',
      'fixture:search/goToCountry.json'
    )
    cy.route(
      'POST',
      'https://kiwi.**.com/search/v1/items?test-accommodation',
      'fixture:search/accomSearch.json'
    )
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )
    cy.route('GET', 'https://kiwi.**.com/content/items/**?**', 'fixture:search/emptyAreaName.json')
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/af406cf9-8f9e-4d92-9c1f-1baa14c9d454?**',
      'fixture:search/areaName.json'
    )

    cy.get('[data-test=searchBox]').as('searchBox')

    // select accommodation tab
    cy.get('@searchBox')
      .find('[data-test=Accommodation]')
      .click()

    // select country: Argentina
    cy.get('@searchBox')
      .find('[data-test=country-dropdown]')
      .setSelectOption('Argentina', 3000)

    // search for accommodations
    cy.get('@searchBox')
      .find('[data-test=search]')
      .click()
      .wait(1000)

    cy.get('[data-test=searchResult]').as('searchResult')

    // assert page items
    cy.get('[data-test=page]').within(() => {
      testItemPage(pageAccomData)
    })
  })

  it('merging accommodations', () => {
    cy.server()
    cy.route('POST', 'https://kiwi.**.com/content/items/merge', 'fixture:search/merge.json')
    cy.route(
      'GET',
      'https://kiwi.**.com/content/items/**/attachments**',
      'fixture:search/attachments.json'
    )

    cy.get('[data-test=searchResult]').as('searchResult')

    // select items for merging
    cy.get('[data-test=page]').within(() => {
      cy.get('[data-test=search-item]')
        .eq(1)
        .find('[data-test=checkbox]')
        .find('input')
        .click({ force: true })

      cy.get('[data-test=search-item]')
        .eq(3)
        .find('[data-test=checkbox]')
        .find('input')
        .click({ force: true })
    })

    // click merge action button
    cy.get('@searchResult')
      .find('#items-sticky-actions')
      .find('[data-test=merge]')
      .click()

    cy.get('[data-test=mergeItems]').as('mergeItems')

    // assert that items selected for merging are correct
    cy.get('@mergeItems')
      .find('[data-test=items]')
      .within(() => {
        cy.get('[data-test=item]')
          .eq(0)
          .find('[data-test=title]')
          .contains(pageAccomData[1].title)

        cy.get('[data-test=item]')
          .eq(1)
          .find('[data-test=subtitle]')
          .contains(pageAccomData[3].subtitle)
      })

    // merge!
    cy.get('@mergeItems')
      .find('[data-test=merge]')
      .click()
      .wait(1500)

    // assertions after merge

    // notification is pushed
    cy.get('[data-test=merge-notification]').contains('🥳  Successfully merged')

    // assert that merged items are not in the search result
    // and that the resulted item is on top of the list
    cy.get('[data-test=page]').within(() => {
      testItemPage(pageAccomDataAfterMerge)
    })
  })

  it('clicking the create new item button', () => {
    cy.get('[data-test=createNewItem]').click()

    // assert that user is redirected to the create item page
    cy.location().should(location => {
      expect(location.pathname).to.eq('/create')
    })

    cy.go('back')
  })
})
