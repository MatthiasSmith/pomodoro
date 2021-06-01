/**
 * Queries focusable elements inside the given React ref
 * Note*: not all focusable types are queried.
 * @param {React.MutableRefObject<any>} dialogRef
 * @returns {Array<HTMLElement>} collection of HTML elements
 */
export const getFocusableElements = (
  dialogRef: React.MutableRefObject<any>
): Array<HTMLElement> => {
  const selectors = ['a[href]', 'button', 'input', '[tabindex]', 'textarea'];
  return [...dialogRef.current.querySelectorAll(selectors.join(','))];
};

/**
 * Focuses the first "tabbable" element from the given array of HTML elements, except when that element has a class of "tab-focus-trap."
 * @param {Array<HTMLElement>} focusableElements
 */
export const focusFirstTabbableElement = (
  focusableElements: Array<HTMLElement>
): void => {
  for (let i = 0; i < focusableElements.length; i++) {
    if (!focusableElements[i].classList.contains('tab-focus-trap')) {
      focusableElements[i].focus();
      return;
    }
  }
};
