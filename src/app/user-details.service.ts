import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './dashboard/userdetails.module';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  public url: string ="http://localhost:8000/api/v1/";
  constructor(public http: HttpClient) { }
    userDetailsProfile(userDetails:any) {
      return this.http.post<UserDetails>(this.url + "user-details/", userDetails);
    }
    affectUserToDetails(idUser:number,idDetails:number) {
      return this.http.put<{userDetails:UserDetails,message:string}>(`${this.url}users/affect-details/${idUser}/${idDetails}`,"");
    }
      getUserDetails() {
      return this.http.get<UserDetails[]>(this.url + "user-details/");
      }
        updateUserDetails(idUserDetails:number,userDetails:any) {
      return this.http.put<{message:string,userDetails:UserDetails}>(this.url + "user-details/"+idUserDetails,userDetails);
    }
}
