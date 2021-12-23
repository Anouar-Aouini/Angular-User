import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './addposition/position.module';
import { User } from './userlist/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string ="http://localhost:8000/api/v1";
  constructor(public http: HttpClient) { }
  login(user:{email:string,password:string}) {
    return this.http.post<{token:string,email:string}>(this.url + "/auth/login", user);
  }
  register(user:any) {
    return this.http.post(this.url + "/auth/register", user);
  }

  deleteUser(id: number) {
     let token=<string>localStorage.getItem("token")
     this.http.delete<User[]>(this.url + "/users/" + id,
      { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
      .subscribe();
   return this.getUsers().subscribe();
  }
  getUsers(): Observable<User[]>{
    let token=<string>localStorage.getItem("token")
    return this.http.get<User[]>(this.url+"/users/",{headers : new HttpHeaders().set('Authorization', JSON.parse(token))})
  }
    getFilteredUsers(search:string): Observable<User[]>{
    let token=<string>localStorage.getItem("token")
    return this.http.get<User[]>(this.url+"/users/search/"+search,{headers : new HttpHeaders().set('Authorization', JSON.parse(token))})
  }
  getPositions(){
     let token=<string>localStorage.getItem("token")
    return this.http.get("http://localhost:8000/api/v1/posts/", { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
      .subscribe(data=>console.log(data));
  }
  addPosition(p_name:{}) {
    return this.http.post(this.url + "/positions", p_name);
  }
  addUser(user:User) {
    return this.http.post<User>(this.url + "/users", user).subscribe(data => console.log(data));
  }
    getPosts() {
    let token=<string>localStorage.getItem("token")
    return this.http.get("http://localhost:8000/api/v1/posts/", { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
  }
  getRoles() {
    let token=<string>localStorage.getItem("token")
    return this.http.get("http://localhost:8000/api/v1/roles/", { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
  }

}
