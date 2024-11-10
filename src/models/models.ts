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

export interface TaskProps{
  title: string;
  description: string;
  start_date: string;
  status?: "incomplete" | "completed";
  id: number | string;
  tags: string[];
  end_date: string;
  author_id: string;
}

export interface TaskInput{
  title: string;
  description: string;
  start_date?: string;
  status?: "incomplete" | "completed";
  tags?: string[];
  end_date?: string;
  author_id: string;
}

