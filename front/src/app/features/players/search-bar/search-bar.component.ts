import { Component,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/// For autocomplete
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import axios from 'axios';

import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {StoreService} from '../../../core/services/store/store.service';

//export interface Country {id:number, name: string};

export interface Team {id:number, country:string, name: string};

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,             
            MatButtonModule,
            MatButtonToggleModule,
            MatFormFieldModule,            
            MatInputModule,
            MatAutocompleteModule,
            ReactiveFormsModule,
            AsyncPipe,
          ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() emitterClickSearch = new EventEmitter<any>();
  
  constructor( private router: Router) {}

  private api = inject(ApiService);
  private auth = inject(AuthService);//for download
  private store = inject(StoreService);

  //----------------------------
  // Countries Autocomplete
  //----------------------------
  countriesControl = new FormControl<string >(''); 
  countries: string[]=[];
  //countries:Country[]=[{id:1,name: 'Argentina'}, {id:2,name: 'Albania'}, {id:3, name: 'Colombia'}];
  filteredCountries ! : Observable<string[]>; // ! parche
  //----------------------------
  // Teams Autocomplete
  //----------------------------
  teamsControl = new FormControl<string >('');   
  teams:Team[]=[];//Raw storage
  teamsOptions:string[]=[];//intermediate storage
  filteredTeams! : Observable<string[]>; // ! parche
  //----------------------------

  
  name="";
  country="";
  team="";
  gender="";

 
 

  ngOnInit() {
    this.fetchCountries();     
    this.fetchTeams();
    this.populateCountries();
    this.populateTeams();
    
    var  filters = this.store.getSearchFilters();
    this.name = filters.name ? filters.name : "";
    this.country =  filters.country ? filters.country : "";
    this.team= filters.team ? filters.team : "";
    this.gender = filters.gender ? filters.gender :"";
    //console.log('SearchBar: ngOnInit',this.store.getSearchFilters());
    //console.log('SearchBar: ngOnInit',filters.name,this.name);
    // Set filters from store
    //({name:this.name, country:this.country,team:this.team, gender: this.gender}= this.store.getSearchFilters());


  }

  fetchCountries(): void {     
    this.api.getCountries().subscribe({next: (resp) => { this.countries = resp.items.map( (e:any) =>e.name);}});
  }
  fetchTeams(): void {     
    this.api.getTeams().subscribe({next: (resp) => { this.teams = resp.items;}});
  }

  //-----------------------------------------
  //  Autocomplete Controls
  //-----------------------------------------
  populateCountries() {
    this.filteredCountries = this.countriesControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value || '')),
    );  
  }

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }  
  
  onCountrySelectionChange(option: string){
    this.teamsOptions = this.teams.filter(e=> e.country.toLowerCase().includes(option.toLowerCase())).map(e=>e.name);
  }

  //-----------------------------------------
  // Teams  Autocomplete
  //-----------------------------------------
  populateTeams() {
    this.filteredTeams = this.teamsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTeams(value || '')),
    );  
  }

  private _filterTeams(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }  

  //-----------------------------------------

  getFilters(){
    var options:any={};
      // console.log('clickedSearch:',country)
     this.name!=="" &&  (options.name = this.name) ;
     this.country!=="" && (options.country = this.country);
     this.team!=="" &&  (options.club = this.team) ;
     this.gender!=="" &&  (options.gender = this.gender) ;
    return options;

  }

  //-----------------------------------------
  // Search Button event
  //-----------------------------------------
  
  clickedSearch( ): void{
    /*
    var options:any={};
      // console.log('clickedSearch:',country)
     this.name!=="" &&  (options.name = this.name) ;
     this.country!=="" && (options.country = this.country);
     this.team!=="" &&  (options.club = this.team) ;
     this.gender!=="b" &&  (options.gender = this.gender) ;
     */
    
    //console.log('clickedSearch:',options);

    //let filters  = {name: this.name};
    this.emitterClickSearch.emit(this.getFilters());

  }

  clickedExport(): void {  

    console.log(this.teams[0]);
    console.log(this.teamsOptions[0]);

   
   //this.store.getPlayersFilters(filters) 
   var headers ={ Authorization: this.auth.getBearerToken()};
   var params= {...this.getFilters(),format:"csv"};
   
   axios.get("http://localhost:3000/players",{params, responseType: 'blob', headers}        
    ).then(response => {
        //console.log('Response:',Object.keys(response.headers));       
        //let filename = response.headers['x-filename'];
        //console.log('filename:',filename);        
        //const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        let blob = new Blob([response.data], {type: 'application/octet-stream'});
        link.href = window.URL.createObjectURL(blob);//url;
        link.setAttribute('download', "players.csv");
        //document.body.appendChild(link);
        link.click();
    })
    .catch(error => { console.log("Download error:",error.message); }) //show error in label



  } 

  clickedCreate(): void {  

    this.router.navigate(['/players/create']);  

  }

  /*

  clickedCompare(): void {  

    //this.router.navigate([`/players/detail/${row.id}`]); 

    this.router.navigate(['/players/detail'], {
      queryParams: { ids:  JSON.stringify([3,4,5,6]) },
      });  

  }*/




}
