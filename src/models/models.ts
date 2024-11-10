export interface UserInput{
  id?: string
  title: string
  slug: string
  author_id: number
}


export interface UserInputProps{
  id?:number | string
  username: string
  email: string
  password: string
  is_admin: boolean
}