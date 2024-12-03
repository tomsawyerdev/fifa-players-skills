import { Component,Input, Output,EventEmitter,SimpleChanges } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
//-----------------------------
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




//import { inject } from '@angular/core';
//import {ApiService} from '../../../core/services/api/api.service';

//import {StoreService} from '../../../core/services/store/store.service';
export interface Team {id:number, country:string, name: string};

@Component({
  selector: 'app-player-edit-header',
  standalone: true,  
  imports: [FormsModule,     
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,            
    MatInputModule,
    MatAutocompleteModule,   
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,   
    
  ],
  templateUrl: './player-edit-header.component.html',
  styleUrl: './player-edit-header.component.css'
})
export class PlayerEditHeaderComponent {

  private api = inject(ApiService);
   //----------------------------
  // Countries Autocomplete
  //----------------------------
  countriesControl = new FormControl<string >('',[Validators.required, Validators.minLength(4)]); 
  countries: string[]=[];
  //countries:Country[]=[{id:1,name: 'Argentina'}, {id:2,name: 'Albania'}, {id:3, name: 'Colombia'}];
  filteredCountries ! : Observable<string[]>; // ! parche
  //----------------------------
  // Teams Autocomplete
  //----------------------------
  teamsControl = new FormControl<string >('',[Validators.required, Validators.minLength(4)]);   
  teams:Team[]=[];//Raw storage
  teamsOptions:string[]=[];//intermediate storage
  filteredTeams! : Observable<string[]>; // ! parche
  //----------------------------
  long_name_ctrl= new FormControl('',[Validators.required, Validators.minLength(4)])

  playerHeaderForm = new FormGroup({ 

            long_name: this.long_name_ctrl,
            nationality_name: this.countriesControl,
            club_name : this.teamsControl,
            club_jersey_number : new FormControl(0,[Validators.required, Validators.min(0)]),
            dob : new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(12)]),
            value_eur : new FormControl(0,[Validators.required, Validators.min(0)]),
            height_cm : new FormControl(0,[Validators.required, Validators.min(0)]),
            weight_kg    : new FormControl(0,[Validators.required, Validators.min(0)]),
            player_face_url : new FormControl('',[Validators.required, Validators.minLength(4)]),
            gender: new FormControl('')});

  @Output() emitterClickSave = new EventEmitter<any>();
  
  @Input() player: any;


    ngOnInit() {
    this.fetchCountries();     
    this.fetchTeams();
    this.populateCountries();
    this.populateTeams();
    //console.log("this.player.nationality_name:",this.player.nationality_name);
    setTimeout(() => {this.onCountrySelectionChange(this.player.nationality_name)},200);// Precarga los equipos de su pais

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
  //--------------------------------

  //-----------------------------------------
  


   clickedSave(){ 
    
    //console.log("Player edit header, clickedSave:",this.playerHeaderForm.value);

    this.emitterClickSave.emit(this.playerHeaderForm.value);

   

  }

}
