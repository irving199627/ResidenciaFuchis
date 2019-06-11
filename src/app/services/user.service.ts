import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  constructor( private http: HttpClient ) { }

  login( usuario: string, pass: string) {
    this.http.post(this.url, {email: usuario , password: pass});
    console.log(usuario, pass);
  }
}
