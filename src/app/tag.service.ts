import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getTags() {
    let token = <string>localStorage.getItem("token")
    return this.http.get(this.url+"/tags/",{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
    getTagsById(id:number) {
    let token = <string>localStorage.getItem("token")
    return this.http.get<any>(this.url+"/tags/"+id,{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
    addTag(tag:any) {
    let token = <string>localStorage.getItem("token")
    return this.http.post(this.url+"/tags/",tag,{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
    deleteTag(id:number) {
    let token = <string>localStorage.getItem("token")
    return this.http.delete(this.url+"/tags/"+id,{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }

}
