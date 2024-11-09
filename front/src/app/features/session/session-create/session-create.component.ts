import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-session-create',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, MatButtonModule,MatFormFieldModule, MatInputModule],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css'
})
export class SessionCreateComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  error=true;

 // sessionForm: FormGroup;
 username ="Alice";
 password="secret";
 message="";
  async onSubmit() {

   // console.log("onSubmit, clicked with:",this.username,this.password, Date.now());
      
    
   let res = await this.authService.loginUser(this.username,this.password);

   // console.log("onSubmit, res:",res);

   if (res.status == 400 ||res.status == 401 )
     {
       this.message = res.message;
     }

   if (res.status == 200) {
    this.error=false;
    this.message = 'Login Success'; //setear en verde o azul
    setTimeout(()=>{ this.router.navigate(['/players'])}, 250);     
    //this.router.navigate(['/players']);
    }     
  
   }
}
