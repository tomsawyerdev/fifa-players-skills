import { Component } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {PlayersTableComponent} from '../players-table/players-table.component';
//import {PlayerDetailComponent} from '../player-detail/player-detail.component';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { inject } from '@angular/core';
//import {ApiService} from '../../../core/services/api/api.service';
import {StoreService} from '../../../core/services/store/store.service';
//import { count } from 'rxjs';




@Component({
  selector: 'app-players-main',
  standalone: true,
  imports: [PlayersTableComponent,MatPaginatorModule, SearchBarComponent],
  templateUrl: './players-main.component.html',
  styleUrl: './players-main.component.css'
})
export class PlayersMainComponent {

 //private api = inject(ApiService);
  private store = inject(StoreService);


  // Managed values, only for display
  // ----------------------------
  items = []; 
  pageSize =0; 
  pageIndex = 0; // current page 
  length = 0; // total count
  // ---------------------------
     
  // Al cargarse la pagina siempre mantiene la ultima busqueda con la respectiva pagina
  ngOnInit() {
      //this.store.setSearchPagination(this.pageSize,this.pageIndex);{name:"Ab"} 
      this.fetchPlayers(null,null) ;
      this.pageIndex = this.store.getSearchPageIndex();
      this.pageSize =  this.store.getSearchPageSize();

  }

  /*
  fetchPlayers0(): void {  
    let options = this.store.getSearchOptions() //paginations + filters
    //console.log("options:",options);   
    this.api.getPlayers(options).subscribe({
      next: (resp) => { this.items = resp.items;                        
                        this.length= resp.count;                         
                      },
  });
  }*/

  fetchPlayers(filters: any,pagination: any): void {  
   
    this.store.getPlayers(filters,pagination).subscribe({
      next: (resp) => { this.items = resp.items;                        
                        this.length= resp.count;    
                      
                        //console.log("players-main getPlayers next:", this.items.length)

                      },
  });
  }



  //Change Page event from pagination

  handlePageEvent(e: PageEvent) {
    //this.pageEvent = e;
    //this.length = e.length;
    //this.store.setSearchPagination(e.pageSize,e.pageIndex); 
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.fetchPlayers(null, {pageSize:e.pageSize,pageIndex:e.pageIndex}); //filter,pagination

    //this.fetchPlayers() ;
  }


  // Event comming from the Search Bar
  handleSearchEvent(filters:object){  
    // console.log("players-main, handleSearchEvent:",filters); 
    this.pageIndex =0;  
    this.fetchPlayers(filters,{pageSize:this.pageSize,pageIndex:0}) ;//filter,pagination    
    //
  }



  //rowChanged(row: any){    this.current_player=row;  }
  // la tabla dispara el router

}
