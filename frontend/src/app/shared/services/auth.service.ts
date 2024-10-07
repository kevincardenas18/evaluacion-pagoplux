import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseURL = 'http://localhost:5000/api/v1';

  createUser(formData:any){
    return this.http.post(this.baseURL+'/user/register',formData);
  }

  signin(formData:any){
    return this.http.post(this.baseURL+'/user/login',formData);
  }

  protected(token: string): Observable<any> {

    const headers = { 'x-access-token': token };
    return this.http.get(`${this.baseURL}/user/protected`, { headers });
  }

}
