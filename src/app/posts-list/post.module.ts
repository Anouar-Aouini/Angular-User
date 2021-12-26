import { User } from "../userlist/user.module";

export class Post{
  constructor(
    public id: number,
    public title: string,
    public user:User,
    public published: boolean,
    public description: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
