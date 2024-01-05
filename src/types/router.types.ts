export interface routerType {
  title: string
  path: string
  element: JSX.Element
  params?:
    | {
        productId: string
        productName: string
      }
    | {
        firstName: string
        id: string
      }
}
