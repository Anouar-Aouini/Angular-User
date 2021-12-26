import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    activeUser() {
     let token=<string>localStorage.getItem("token")
    return this.http.get<User>(this.url + "/auth/activeuser",{headers : new HttpHeaders().set('Authorization', JSON.parse(token))});
  }
  current() {
     let token=<string>localStorage.getItem("token")
    return this.http.get<{message:string}>(this.url + "/auth/currentuser",{headers : new HttpHeaders().set('Authorization', JSON.parse(token))});
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
  addPosition(p_name:{}) {
    return this.http.post(this.url + "/positions", p_name);
  }
  addUser(user:User) {
    return this.http.post<User>(this.url + "/users", user).subscribe(data => console.log(data));
  }
  getRoles() {
    let token=<string>localStorage.getItem("token")
    return this.http.get("http://localhost:8000/api/v1/roles/", { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
  }
  updateUser(user:{firstName:string,lastName:string,password:string},id:number):Observable<{user:User}> {
    let token=<string>localStorage.getItem("token")
    return this.http.put<{message:string,user:User}>("http://localhost:8000/api/v1/users/"+id,user, { headers: new HttpHeaders().set('Authorization', JSON.parse(token)) })
  }

}
