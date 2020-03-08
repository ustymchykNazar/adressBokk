export interface User {
  id: string,
  firstName: string,
  middleName: string,
  lastName: string,
  birth: string,
  phone: {
    name: string,
    value: string
  }[],
  email: string[]
}