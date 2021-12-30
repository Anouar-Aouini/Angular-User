import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './posts-list/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getPosts() {
    return this.http.get<Post[]>(this.url+"/posts/")
    }
    addPost(id:number , post:any) {
    return this.http.post<Post>(this.url+"/posts/"+id,post)
    }
    updatePost(id:number , updatedPost:{title:string,description:string}) {
    return this.http.put<{message:string,post:Post}>(this.url+"/posts/"+id,updatedPost)
    }
    deletePost(id:number) {
    return this.http.delete<{message:string,posts:Post[]}>(this.url+"/posts/"+id)
    }
    getFilteredPosts(search:string): Observable<Post[]>{
    return this.http.get<Post[]>(this.url+"/posts/search-by-title/"+search)
  }
}
