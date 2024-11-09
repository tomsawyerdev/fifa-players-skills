import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { tap } from 'rxjs/operators';
import {  take, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService   {

  private isAuthenticated = false;
  private authToken: string | null = null;
  private apiURL = environment.apiUrl + 'sessions';
  //private apiURL : string =  'http://localhost:3000/sessions';
  private username : string | null = null;
  

  constructor(private http: HttpClient,
              private router: Router) {}



  isLogged():boolean {return this.isAuthenticated};
  //isLogged():boolean {return true};

  logout():void {
           this.isAuthenticated=false;
           this.authToken= null;
           this.router.navigate(['/']);};

  getUsername():string| null { return this.username};         
  getRawToken():string| null { return this.authToken};  
  getBearerToken():string| null { return "Bearer " + this.authToken}; 

  //Nota: Habria que manejarlo con observables

  async loginUser(username: string, password: string): Promise<any> {
    var res$ = this.http.post(this.apiURL, { username, password }).pipe(take(1));
    
    const data:any = await lastValueFrom(res$);
    
    //console.log('loginUser:', typeof(data));
    //console.log('loginUser:', data);
    if (data.status == 200)
    {
      this.setSession(data);
    }
    return data;    
}

  
  setSession(body : any): void {

    if (body.token && body.username)
    {
    this.isAuthenticated=true;
    this.authToken=body.token;
    this.username=  body.username;
    }
    //console.log('Auth Service, body:',body);
    //console.log('Auth Service, setSession:', this.isAuthenticated,this.authToken,this.username);

  }
   


}
