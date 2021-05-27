export function generateId (stringLength: number = 6, prefix: string = ''): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = prefix

  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export function findParent ($element: HTMLElement | null, rootElement: HTMLElement | null): HTMLElement | null {
  let $sourceElement = $element
  while ($sourceElement !== null) {
    if ($sourceElement === rootElement) {
      return $sourceElement
    }

    $sourceElement = $sourceElement.parentElement
  }

  return null
}

export function outClick (rootElement: HTMLElement | null, callback: Function): void {
  document.addEventListener('click', (event) => {
    const res = findParent(event.target as HTMLElement, rootElement)
    res === null && callback(event)
  })
}

export function plural (num: number, words: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2]
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]]
}
