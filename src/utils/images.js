const IMAGE_WIDTHS = [320, 480, 640, 960];

export function buildSrcSet(url) {
  return IMAGE_WIDTHS.map((w) => `${url}?w=${w} ${w}w`).join(', ')
}

export const CARD_IMAGE_SIZES = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
