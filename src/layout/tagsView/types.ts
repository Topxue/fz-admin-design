// tagView Menu Action
export enum Eaction {
  reload = 'reload',
  current = 'current',
  others = 'others',
  left = 'left',
  right = 'right',
  all = 'all',
  screenFull = 'screenFull'
}

// tagView Menu Action type...
export type TEaction =
  | Eaction.reload
  | Eaction.current
  | Eaction.others
  | Eaction.all
  | Eaction.screenFull
  | Eaction.left
  | Eaction.right
