export class Users{
  id: number;
  name: string;
  email: string;
  phone: number;
  created_at: string;
  updated_at: string;
  constructor(){
    this.id = 0;
    this.name = "";
    this.email = "";
    this.phone = 0;
    this.created_at = '' ,
    this.updated_at = ''
  }
}
