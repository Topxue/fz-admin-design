declare interface ITreeMenuItem {
  _id: string
  children?: ITreeMenuItem[]
  name: string | undefined
  path: string
  pid: number
  icon: string
  rid: number
  title: string
  link?: string
}
