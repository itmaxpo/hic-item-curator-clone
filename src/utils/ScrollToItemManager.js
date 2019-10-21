/**
 * Scroll to Item management service
 *
 */

class ScrollToItemManager {
  itemToScrollTo = null

  setItemToScrollTo = itemId => {
    this.itemToScrollTo = itemId
  }

  scrollToItem = () => {
    if (!this.itemToScrollTo) return
    const element = document.getElementById(this.itemToScrollTo)
    element && element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const scrollToItemManager = new ScrollToItemManager()
export { scrollToItemManager }
