import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './tags/tag.module';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getTags() {
    return this.http.get<Tag[]>(this.url+"/tags/")
    }
    getTagsById(id:number) {
    return this.http.get<any>(this.url+"/tags/"+id)
    }
    addTag(tag:{name:string,user_id:number}) {
    return this.http.post(this.url+"/tags/",tag)
    }
    deleteTag(id:number) {
    return this.http.delete(this.url+"/tags/"+id)
    }

}
