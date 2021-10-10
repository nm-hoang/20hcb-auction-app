export interface IState<T> {
  requesting: boolean
  success?: boolean
  error?: string | any
  list?: T[]
  single?: T
}
