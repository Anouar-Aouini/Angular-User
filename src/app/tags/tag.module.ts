import { Post } from './../posts-list/post.module';

export class Tag{
  constructor(
    public id: number,
    public user_id: string,
    public posts: Post[],
    public name: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
