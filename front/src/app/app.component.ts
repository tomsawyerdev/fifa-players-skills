import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent} from './core/components/nav/nav.component';
//import {PlayersTableComponent} from './features/players/players-table/players-table.component';
//PlayersTableComponent
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}

//  (click)="clickedRows(row)"