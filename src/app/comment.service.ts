import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

   public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
    getComments(id:number) {
    return this.http.get<{content:[]}>(this.url+"/comments/"+id)
    }
      addComments(id:number,comment:any) {
       this.http.post<any>(this.url + "/comments/" + id, comment).subscribe()
        return this.getComments(id);
    }
}
