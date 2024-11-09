import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  
  //constructor(private authService: AuthService ) { }
   
  isLogged(): boolean {return this.authService.isLogged()};
  getUsername(): string | null {return this.authService.getUsername()};


  click_logout(): void {
   this.authService.logout();
   //console.log("Logout");
   this.router.navigate(['/']);
  }

  
  navigate(route: string):void{
    this.router.navigate([route]);    
  }

  /*
  click_edit(){
  this.router.navigate(['/players/edit'], {
    queryParams: { id: 4, mode:"edit"  },
    });  
  }*/


}
