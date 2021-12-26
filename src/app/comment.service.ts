import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

   public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getComments(id:number) {
    let token = <string>localStorage.getItem("token")
    return this.http.get<{content:[]}>(this.url+"/comments/"+id,{headers : new HttpHeaders().set('Authorization',  JSON.parse(token))})
    }
      addComments(id:number,comment:any) {
    let token = <string>localStorage.getItem("token")
       this.http.post<any>(this.url + "/comments/" + id, comment, { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) }).subscribe()
        return this.getComments(id).subscribe();
    }
}
