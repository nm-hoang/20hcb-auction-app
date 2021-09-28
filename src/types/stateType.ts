export interface IState<T> {
  requesting: boolean
  success?: boolean
  error?: string
  list?: T[]
  single?: T
}
