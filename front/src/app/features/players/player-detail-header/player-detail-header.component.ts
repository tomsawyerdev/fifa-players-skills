import { Component, Input } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-player-detail-header',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './player-detail-header.component.html',
  styleUrl: './player-detail-header.component.css'
})
export class PlayerDetailHeaderComponent {

  private router = inject(Router);
  @Input() player: any;


  clickedEdit(){

     console.log("clickedEdit",this.player.id);
     
      this.router.navigate(['/players/edit'], {
        queryParams: { id: this.player.id, mode:"edit"  },
        });  
      
  }


}
