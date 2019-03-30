const createUI = async (rootElement) => {
  const errorElem = document.getElementById('error')
  errorElem.innerHTML = 'Hello'
  errorElem.classList.add('visible')
}

export default createUI
