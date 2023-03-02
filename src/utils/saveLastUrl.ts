export const saveLastUrl = (location: { pathname: string; search: string }) => {
  const savedPath = `${location.pathname}${location.search}`

  if (savedPath !== '/login') {
    sessionStorage.setItem('savedPath', savedPath)
  }
}
