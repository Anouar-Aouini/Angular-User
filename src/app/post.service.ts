import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './posts-list/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getPosts() {
      let token = <string>localStorage.getItem("token")
    return this.http.get<Post[]>(this.url+"/posts/",{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
    addPost(id:number , post:any) {
      let token = <string>localStorage.getItem("token")
    return this.http.post<Post>(this.url+"/posts/"+id,post,{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
}
