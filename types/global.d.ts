interface KeyMap {
    [key: string]: string
  }

interface ObjectModel {
  [key: string]: any;
}

interface ColObject {
  title: string
  key: string
  justify?: string
  align?: string
  customClass?: string
  cols?: number | string
  lg?: number | string
}