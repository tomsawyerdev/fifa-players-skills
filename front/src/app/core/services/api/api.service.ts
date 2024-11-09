import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
//import {  take, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authService = inject(AuthService);

  private urlPlayers = environment.apiUrl + 'players';
  private urlTeams = environment.apiUrl + 'utils/teams';
  private urlCountries = environment.apiUrl + 'utils/countries';


  constructor(private http: HttpClient  ) {}

 
  getTeams(): Observable<any> {
    var token : string = (this.authService.getBearerToken() as string);
     return this.http.get(this.urlTeams,{  headers: { Authorization: token  }});     
    }
  
  getCountries(): Observable<any>  {     
      
      var token : string = (this.authService.getBearerToken() as string);
      return this.http.get(this.urlCountries,{  headers: { Authorization: token  }}); 
  } 

  //----------------------------
  // Players
  //----------------------------
  getPlayer(id : number): Observable<any> { 
    var token : string = (this.authService.getBearerToken() as string);
    return this.http.get(this.urlPlayers+`/${id}`, {  headers: { Authorization: token  }}); 
   }

  updPlayer(id : number, player:any): Observable<any> { 
    var token : string = (this.authService.getBearerToken() as string);
    return this.http.post(this.urlPlayers+`/${id}`,player, {  headers: { Authorization: token  }});
    //.pipe( tap(value => { console.log('api.updPlayer:', value); }));; 
   }

  newPlayer(player:any): Observable<any> { 
    var token : string = (this.authService.getBearerToken() as string);
    return this.http.post(this.urlPlayers,player, {  headers: { Authorization: token  }}); 
   }


  getPlayersSet(ids : any): Observable<any> { 
    var token : string = (this.authService.getBearerToken() as string);
    return this.http.post(this.urlPlayers+'/set',{ids}, {  headers: { Authorization: token  }}); 
   }

  getPlayers(query : any): Observable<any>  {
      
      var token : string = (this.authService.getBearerToken() as string);

      return this.http.get(this.urlPlayers, { params: query , headers: { Authorization: token  }})
      //.pipe( tap(value => { console.log('Spy:', value); }));

  }

  
  
}
