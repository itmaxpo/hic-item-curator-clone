/* global cy before */
import { testItemPage, pageAccomData, pageAccomDataAfterMerge } from '../../utils/utils'

describe('Homepage', { testIsolation: false }, () => {
  before(() => {
    cy.homePageLoad()
  })

  it('go to country', () => {
    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/countries/search', {
      fixture: 'search/goToCountry.json'
    })

    cy.intercept('GET', 'https://partners-staging.**.com/content/items/**/attachments**', {
      fixture: 'search/attachments.json'
    })

    cy.intercept(
      'GET',
      'https://partners-staging.**.com/content/items/869babbb-d6b5-456b-a20c-0744b3e33d57?**',
      {
        fixture: 'search/emptyAreaName.json'
      }
    )

    cy.get('[data-test=searchBox]').as('searchBox')
    // select country tab
    cy.get('@searchBox').find('[data-test=Country]').click()

    // select country: Argentina
    cy.get('@searchBox').find('[data-test=country-dropdown]').setSelectOption('Argentina', 3000)

    // go to country
    cy.get('@searchBox').find('[data-test=search]').click()

    cy.location().should((location) =>
      expect(location.pathname).to.eq('/item/087e8ead-fd75-4c11-9dce-ad8a2c649c17')
    )
    cy.go('back')
  })

  it('go to area', () => {
    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/countries/search', {
      fixture: 'search/goToCountry.json'
    })

    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/areas/search', {
      fixture: 'search/goToArea.json'
    })

    cy.intercept(
      'GET',
      'https://partners-staging.**.com/content/items/316c1b1f-ad72-49b8-84bb-69c4b82674ab?**',
      {
        fixture: 'search/emptyAreaName.json'
      }
    )
    cy.get('[data-test=searchBox]').as('searchBox')
    // select country tab
    cy.get('@searchBox').find('[data-test=Area]').click({ force: true })

    // select country: Argentina
    cy.get('@searchBox').find('[data-test=country-dropdown]').setSelectOption('Argentina', 3000)

    // select area: Buenos Aires
    cy.get('@searchBox').find('[data-test=area-dropdown]').setSelectOption('Buenos Aires', 3000)

    // go to area
    cy.get('@searchBox').find('[data-test=search]').click()

    // assert that user is redirected to item page
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/item/316c1b1f-ad72-49b8-84bb-69c4b82674ab')
    })
    cy.get('[data-test=source]').should('not.exist')
    cy.go('back')
  })

  it('clicking the app icon should clear search box', () => {
    cy.get('[data-test=app-icon]').click({ force: true })

    cy.get('[data-test=searchBox]').as('searchBox')

    // country dropdown should not be rendered
    cy.get('@searchBox').find('[data-test=country-dropdown]').should('not.exist')

    // search button is disabled (can't search)
    cy.get('@searchBox').find('[data-test=search]').click()

    cy.get('[data-test=searchResult]').should('not.exist')
  })

  it('search for accommodations', () => {
    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/countries/search', {
      fixture: 'search/goToCountry.json'
    })

    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/accommodations/search', {
      fixture: 'search/accomSearch.json'
    })

    cy.intercept('GET', 'https://partners-staging.**.com/content/items/**/attachments**', {
      fixture: 'search/attachments.json'
    })

    cy.intercept(
      'GET',
      'https://partners-staging.**.com/content/items/869babbb-d6b5-456b-a20c-0744b3e33d57?**',
      {
        fixture: 'search/emptyAreaName.json'
      }
    )

    cy.intercept(
      'GET',
      'https://partners-staging.**.com/content/items/af406cf9-8f9e-4d92-9c1f-1baa14c9d454?**',
      {
        fixture: 'search/areaName.json'
      }
    )

    cy.get('[data-test=searchBox]').as('searchBox')

    // select accommodation tab
    cy.get('@searchBox').find('[data-test=Accommodation]').click()

    // select country: Argentina
    cy.get('@searchBox').find('[data-test=country-dropdown]').setSelectOption('Argentina', 3000)

    // search for accommodations
    cy.get('@searchBox').find('[data-test=search]').click().wait(1000)

    cy.get('[data-test=searchResult]').as('searchResult')

    // assert page items
    cy.get('[data-test=page]').within(() => {
      testItemPage(pageAccomData)
    })
  })

  it('verify accommodation source', () => {
    cy.get('[data-test=page]').within(() => {
      cy.get('[data-test=search-item]')
        .eq(0)
        .find('[data-test=source]')
        .should('exist')
        .contains('Giata, Google Places')

      cy.get('[data-test=search-item]')
        .eq(1)
        .find('[data-test=source]')
        .should('exist')
        .contains('Giata, Google Places')

      cy.get('[data-test=search-item]')
        .eq(2)
        .find('[data-test=source]')
        .should('exist')
        .contains('Giata, Google Places')
    })
  })

  it(`validate accommodation selection to max 2
      THEN verify info button exists next to the merge button, and its tooltip
      THEN merging accommodations`, () => {
    cy.intercept('POST', 'https://partners-staging.**.com/content/items/merge', {
      fixture: 'search/merge.json'
    })

    cy.intercept('POST', 'https://partners-staging.**.com/content/items/merge_validation', {
      fixture: 'search/merge_validation.json'
    })

    cy.intercept('GET', 'https://partners-staging.**.com/content/items/**/attachments**', {
      fixture: 'search/attachments.json'
    })

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

      // validate accommodation selection to max 2
      cy.get('[data-test=search-item]')
        .eq(2)
        .find('[data-test=checkbox]')
        .find('input')
        .should('be.disabled')

      cy.get('[data-test=search-item]')
        .eq(4)
        .find('[data-test=checkbox]')
        .find('input')
        .should('be.disabled')
    })

    // verify info button exists next to the merge button, and its tooltip
    cy.get('@searchResult')
      .find('#items-sticky-actions')
      .find('[data-test=mergeInfo]')
      .should('exist')
      .trigger('mouseover', { force: true })

    cy.get('[data-test=mergeInfoMessage]')
      .should('exist')
      .contains('Only 2 items can be merged at a time.')
    // click merge action button
    cy.get('@searchResult').find('#items-sticky-actions').find('[data-test=merge]').click()

    cy.get('[data-test=mergeItems]').as('mergeItems')

    // assert that items selected for merging are correct
    cy.get('@mergeItems')
      .find('[data-test=items]')
      .within(() => {
        cy.get('[data-test=item]').eq(0).find('[data-test=title]').contains(pageAccomData[1].title)

        cy.get('[data-test=item]')
          .eq(1)
          .find('[data-test=subtitle]')
          .contains(pageAccomData[3].subtitle)
      })

    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/accommodations/search', {
      fixture: 'search/after_merge.json'
    }).as('afterMerge')

    // merge!
    cy.get('@mergeItems').find('[data-test=merge]').click()
    cy.wait('@afterMerge')

    // assertions after merge

    // notification is pushed
    cy.get('[data-test=merge-notification]').contains('🥳 Successfully merged')

    // assert that merged items are not in the search result
    // and that the resulted item is on top of the list
    cy.get('[data-test=page]').within(() => {
      testItemPage(pageAccomDataAfterMerge)
    })
  })

  it('verify source after accommodation merging', () => {
    cy.get('[data-test=page]').within(() => {
      cy.get('[data-test=search-item]')
        .eq(0)
        .find('[data-test=source]')
        .should('exist')
        .contains('Giata, Google Places')
    })
  })

  it('Search for activities with no filters', () => {
    cy.intercept('GET', 'https://partners-staging.**.com/content/activities?*', {
      fixture: 'search/activitySearch.json'
    })

    cy.get('[data-test=searchBox]').as('searchBox')

    // select activity tab
    cy.get('@searchBox').find('[data-test=Activity]').click()

    cy.get('[data-test=search-item]').should('have.length', 14)
  })

  it('Searching for activities by country', () => {
    cy.intercept('GET', 'https://partners-staging.**.com/content/activities?*', {
      fixture: 'search/activitySearch.json'
    })

    cy.intercept('POST', 'https://partners-staging.tlservers.com/content/countries/search', {
      fixture: 'search/goToCountry.json'
    })

    cy.get('[data-test=searchBox]').as('searchBox')

    // select activity tab
    cy.get('@searchBox').find('[data-test=Activity]').click()

    // select country: Argentina
    cy.get('@searchBox').find('[data-test=country-dropdown]').setSelectOption('Argentina', 3000)

    cy.get('[data-test=search-item]').should('have.length', 14)

    cy.get('[data-test=search-item]').first().as('searchItem')

    // select search item title
    cy.get('@searchItem').find('[data-test=title]').contains('111')
    cy.get('@searchItem').find('[data-test=subtitle]').contains('Argentina')
    cy.get('@searchItem').find('[data-test=provider]').contains('Provider: Creole')
    cy.get('@searchItem').find('[data-test=supplier]').contains('Supplier: Chamäleon')
    cy.get('@searchItem')
      .find('[data-test=description]')
      .contains(
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a mo'
      )
    cy.url().should('include', 'countryId')
    cy.url().should('include', 'countryName')
  })
})
