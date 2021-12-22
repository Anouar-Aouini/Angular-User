import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getPosts() {
      let token = <string>localStorage.getItem("token")
    return this.http.get(this.url+"/posts/",{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
  }
}
