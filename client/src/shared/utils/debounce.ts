export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function () {
    // @ts-ignore
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate && !timeout) func.apply(context, args);

    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
  };
}
