export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface GoogleRegisterData extends Pick<RegisterData, 'name'> {}
