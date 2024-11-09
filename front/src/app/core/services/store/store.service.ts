import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private api = inject(ApiService);
  constructor() { }

  filters: any={}; //{ name:"", country:"", team:"", gender:"b"};
  pageSize = 10;
  pageIndex = 0;//current page
  selectePlayers=[];

  getSearchPageIndex(){ return this.pageIndex; }

  getSearchPageSize(){return this.pageSize;}

  getSearchFilters(){ return this.filters;}

  setSearchPagination(pageSize : number,pageIndex: number){
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  } 

  setSearchFilters(filters : any) {

    this.filters = filters;
    
  }
  

  getPlayers( filters:any, pagination : any,): Observable <any> {
    //console.log("Store getPlayers:",filters,pagination);
    var options={};
    //filters ? options= filters : options = this.filters;
    //pagination ? options = {...options , page:pagination.pageIndex,size: pagination.pageSize} : options = {...options , page:this.pageIndex,size: this.pageSize} 
    if (filters)
    {
      options= filters;
      this.setSearchFilters(filters)
    }
    else 
     {
       options = this.filters
    }
    if (pagination)
    { 
      options = {...options , page:pagination.pageIndex,size: pagination.pageSize};
      this.setSearchPagination(pagination.pageSize,pagination.pageIndex)
     }
     else
     { 
       options = {...options , page:this.pageIndex,size: this.pageSize} ;
      }

    //console.log("Store getPlayers:",options);

    //{...filters,page:pagination.pageIndex,size: pagination.pageSize}
    //return this.api.getPlayers({...filters,page:0, size: 50})
    return this.api.getPlayers(options);

  }

   setSelectedPlayers(players : any){

     this.selectePlayers = players;

   }
   getSelectedPlayers(){

     return this.selectePlayers 
   }


}
