import { Component,Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import {StoreService} from '../../../core/services/store/store.service';
import {PlayersTableSelectionComponent} from '../players-table-selection/players-table-selection.component';

export interface PlayerElement {
  id:number;
  long_name : string;
  nationality_name : string;
  club_name : string;
  club_jersey_number : string;
  value_eur : number;
  height_cm : number;
  weight_kg : number;
  gender: string;

}
/*
const ELEMENT_DATA: PlayerElement[] = [
  {id:1,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Hrogen', weight_kg: 81},
  {id:2,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Helium', weight_kg: 94},
  {id:3,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Lthium', weight_kg: 69},
  {id:4,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Bllium', weight_kg: 59},
  {id:5,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Bgoron', weight_kg: 81},
  {id:6,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Carbon', weight_kg: 72},
  {id:7,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Niogen', weight_kg: 67},
  {id:8,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Oxggen', weight_kg: 54},
  {id:9,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Fluine', weight_kg: 84},
  {id:10,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Neoggn', weight_kg: 77},
  {id:1,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Hrogen', weight_kg: 81},
  {id:2,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Helium', weight_kg: 94},
  {id:3,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Lthium', weight_kg: 69},
  {id:4,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Bllium', weight_kg: 59},
  {id:5,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Bgoron', weight_kg: 81},
  {id:6,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Carbon', weight_kg: 72},
  {id:7,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Niogen', weight_kg: 67},
  {id:8,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Oxggen', weight_kg: 54},
  {id:9,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Fluine', weight_kg: 84},
  {id:10,nationality_name: "Argentina", club_name:"Boca", club_jersey_number: "10", value_eur: 10500, height_cm: 180, gender:"m", long_name: 'Neoggn', weight_kg: 77}

];
*/


@Component({
  selector: 'app-players-table',
  standalone: true,
  imports: [MatTableModule,PlayersTableSelectionComponent],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.css'
})

export class PlayersTableComponent {

  private store = inject(StoreService);
  
  @Input() dataSource : PlayerElement[] =[];
  
  //@Output() emitterClickRow = new EventEmitter<PlayerElement>();
  //  <app-players-table  (emitterClickRow)="funcion_del_padre($event)" [dataSource]="items" ></app-players-table>
  constructor( private router: Router) {}
  ngOnInit() {
    this.selected=this.store.getSelectedPlayers();
  }

  selected: PlayerElement []=[];

  displayedColumns: string[] = [
                  'long_name',
                  'nationality_name',
                  'club_name',
                  'club_jersey_number',
                  'value_eur',
                  'height_cm',
                  'weight_kg',
                  'gender'
                 
                 ];

  //dataSource = ELEMENT_DATA;
  // Detectar el evento click
  //choice = 0;
  
  // Detectar el evento click
  clickedRows( row : PlayerElement ): void{

     //console.log("clickedRows:",row);
     //this.emitterClickRow.emit(row);//row.id

     var temp: PlayerElement []  = this.selected;

     //temp.unshift(row);
     temp.push(row);
     if(temp.length>4) temp.pop();

     this.selected = temp; 
     // Almacenarlo en la store
     this.store.setSelectedPlayers(temp);
     

     //Route to /players/:id
     //this.router.navigate([`/players/detail/${row.id}`]);     
  }

  listenClickRemove(id: any ){

    //console.log("listenClickRemove:",id);

    // Remove from selected
    var temp: PlayerElement []  = this.selected;
    this.selected = temp.filter(e=> e.id!=id);

    this.store.setSelectedPlayers(temp);
    // Almacenarlo en la store

  }


}
//  (click)="clickedRows(row)"