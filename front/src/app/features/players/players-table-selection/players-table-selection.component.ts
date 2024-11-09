import { Component,Input,Output,EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-players-table-selection',
  standalone: true,
  imports: [CommonModule,MatChipsModule,MatIconModule,MatButtonModule],
  templateUrl: './players-table-selection.component.html',
  styleUrl: './players-table-selection.component.css'
})
export class PlayersTableSelectionComponent {

  @Input() players: any; //angular how to detect input change

  @Output() emitterClickRemove = new EventEmitter<number>();

  constructor( private router: Router) {}

  //clickView(){}

  clickedRemove(id:number){
    //console.log("clickedRemove:",id);
    //llamar al callback ?
    this.emitterClickRemove.emit(id);
  }

  clickedView(){
    //console.log("Table Selection clickView");

    if(this.players.length > 0) 
    {
      var ids = this.players.map((e:any)=> e.id);
      //console.log("clickView",ids);

      this.router.navigate(['/players/detail'], {
        queryParams: { ids:  JSON.stringify(ids) },
        });  

    }

    
  }

  
}
