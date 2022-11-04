export function getClassSelector(element: HTMLElement) {
  const tagName = element.tagName.toLocaleLowerCase();
  const classes = element.className.split(' ').join('.');
  return `${tagName}.${classes}`;
} 
