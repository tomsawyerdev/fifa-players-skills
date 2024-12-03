import { Component,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
//import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartData} from 'chart.js';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import {PlayerEditHeaderComponent} from '../player-edit-header/player-edit-header.component';
import {getDefaultPlayer} from './defaultPlayer';


@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [FormsModule, MatSliderModule,BaseChartDirective,PlayerEditHeaderComponent],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent {

  private api = inject(ApiService);

 mode="edit";
 message="";
 id = 0;
 //player:any = {};
 playerHeader:any = {};
 radarMoveData : ChartData<'radar'>| undefined; ;
 radarPowerData:any = {};
 radarAttackData:any = {};
 radarSkillsData:any = {};

 attacking_crossing = 0;
 attacking_finishing=0;
 attacking_heading_accuracy=0;
 attacking_short_passing=0;
 attacking_volleys=0;

 skill_dribbling=0;
 skill_curve=0;
 skill_fk_accuracy=0;
 skill_long_passing=0;
 skill_ball_control=0;

 movement_acceleration=0;
 movement_sprint_speed=0;
 movement_agility=0;
 movement_reactions=0;
 movement_balance=0;

 power_shot_power=0;
 power_jumping=0;
 power_stamina=0;
 power_strength=0;
 power_long_shots=0;

 public radarChartOptions: ChartConfiguration['options'] = {  
  animation: {
    duration: 0
  },
  scales: {
    r: {
        angleLines: { display: false  },
        suggestedMin: 0,
        suggestedMax: 100
    }
    }}
  
    constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        this.mode = params['mode'];
        //console.log("Player-edit:",this.id,this.mode);
        if (params['mode']=='edit'){
        this.api.getPlayer(this.id).subscribe({next: (resp) => { this.id = resp.player.id; this.unPackPlayer(resp.player);this.updateCharts();}});}
        else
        {
          this.unPackPlayer(getDefaultPlayer());
          this.updateCharts();
          
        }

      });
    }

    unPackPlayer(player:any){

      this.playerHeader.long_name =   player.long_name;
      this.playerHeader.nationality_name =   player.nationality_name;
      this.playerHeader.club_name =   player.club_name;
      this.playerHeader.club_jersey_number =   player.club_jersey_number;
      this.playerHeader.dob =   player.dob;
      this.playerHeader.value_eur =   player.value_eur;
      this.playerHeader.height_cm =   player.height_cm;
      this.playerHeader.weight_kg =   player.weight_kg;
      this.playerHeader.gender =   player.gender;
      this.playerHeader.player_face_url=player.player_face_url;

      this.attacking_crossing=player.attacking_crossing;
      this.attacking_finishing=player.attacking_finishing;
      this.attacking_heading_accuracy=player.attacking_heading_accuracy;
      this.attacking_short_passing=player.attacking_short_passing;
      this.attacking_volleys=player.attacking_volleys;
      this.skill_dribbling=player.skill_dribbling;
      this.skill_curve=player.skill_curve;
      this.skill_fk_accuracy=player.skill_fk_accuracy;
      this.skill_long_passing=player.skill_long_passing;
      this.skill_ball_control=player.skill_ball_control;
      this.movement_acceleration=player.movement_acceleration;
      this.movement_sprint_speed=player.movement_sprint_speed;
      this.movement_agility=player.movement_agility;
      this.movement_reactions=player.movement_reactions;
      this.movement_balance=player.movement_balance;
      this.power_shot_power=player.power_shot_power;
      this.power_jumping=player.power_jumping;
      this.power_stamina=player.power_stamina;
      this.power_strength=player.power_strength;
      this.power_long_shots=player.power_long_shots;

    }

    packPlayer(header:any){

      var player:any={}  

      player.long_name= header.long_name;  
      player.nationality_name=header.nationality_name;   
      player.club_name=header.club_name;   
      player.club_jersey_number=header.club_jersey_number;  
      player.dob=header.dob;  
      player.value_eur=header.value_eur;  
      player.height_cm=header.height_cm;  
      player.weight_kg=header.weight_kg;  
      player.gender=header.gender;   
      player.player_face_url=header.player_face_url;
      

      player.attacking_crossing=this.attacking_crossing;
      player.attacking_finishing=this.attacking_finishing;
      player.attacking_heading_accuracy=this.attacking_heading_accuracy;
      player.attacking_short_passing=this.attacking_short_passing;
      player.attacking_volleys=this.attacking_volleys;
      player.skill_dribbling=this.skill_dribbling;
      player.skill_curve=this.skill_curve;
      player.skill_fk_accuracy=this.skill_fk_accuracy;
      player.skill_long_passing=this.skill_long_passing;
      player.skill_ball_control=this.skill_ball_control;
      player.movement_acceleration=this.movement_acceleration;
      player.movement_sprint_speed=this.movement_sprint_speed;
      player.movement_agility=this.movement_agility;
      player.movement_reactions=this.movement_reactions;
      player.movement_balance=this.movement_balance;
      player.power_shot_power=this.power_shot_power;
      player.power_jumping=this.power_jumping;
      player.power_stamina=this.power_stamina;
      player.power_strength=this.power_strength;
      player.power_long_shots=this.power_long_shots;

      return player;

    }
    //ngDoCheck() {
    onChangeAttack(e:any){
        var attack_ds= [{data: [this.attacking_crossing,this.attacking_finishing,this.attacking_heading_accuracy,this.attacking_short_passing,this.attacking_volleys],label:''}];
        this.radarAttackData = {
          labels: ['crossing','finishing','heading accuracy','short passing','volleys'],
          datasets:  attack_ds  
        } ;
    }

    onChangeSkill(e:any){

      var skills_ds = [{ data: [this.skill_dribbling,this.skill_curve,this.skill_fk_accuracy,this.skill_long_passing,this.skill_ball_control],label:''}];

      this.radarSkillsData = {
          labels: ['dribbling','curve','accuracy','long passing','ball control'],
          datasets: skills_ds    
        } ;

    }

    onChangeMovement(e:any){
      var move_ds = [{ data: [this.movement_acceleration,this.movement_sprint_speed,this.movement_agility,this.movement_reactions,this.movement_balance],label:''}];
   
      this.radarMoveData = {
        labels: ['acceleration','sprint speed','agility','reactions','balance'],
        datasets: move_ds,    
      } 
    }


    onChangePower(e:any){


      var power_ds = [{ data: [this.power_shot_power,this.power_jumping,this.power_stamina,this.power_strength,this.power_long_shots],label:''}];
      this.radarPowerData= {
      labels: ['shot_power','jumping','stamina','strength','long_shots'],
      datasets: power_ds  };


    }

    updateCharts(){
          this.onChangeAttack(null);
          this.onChangeSkill(null);
          this.onChangeMovement(null);
          this.onChangePower(null);
    }
 
    // event listenner from the edit-header component
    listenSave(header:any){

    
     var player = this.packPlayer(header);
      //console.log("Player-edit, listenSave, packPlayer:",player);

      // Arreglar el bad request codigo:400
     
     if (this.mode=="edit"){
        //console.log("Player-edit, updPlayer:",this.id,player);
        this.api.updPlayer(this.id,player).subscribe({
          next: (resp) => { this.message = resp.message + (resp.errors ? `: ${resp.errors}`:'') ;                          
                            //console.log("updPlayer next:", resp.message,resp.errors);    
                          },
          error: (err) => { // Recibe un 400
                            this.message = err.error.message + err.error.errors;
                            console.error("Receive 400, Error:",err);                         
                        }});
      }
     else
     {
        //console.log("Player-edit, newPlayer");
        this.api.newPlayer(player).subscribe({
          next: (resp) => { this.message = resp.message + (resp.errors ? `: ${resp.errors}`:'') ;   
                            if(resp.status==201){ // Object was created
                            this.mode="edit" ;
                            this.id = resp.id;
                            }                      
                            //console.log("newPlayer next:", resp.message,resp.errors);    
                          }
                          ,
          error: (err) => { // Recibe un 400
                            this.message = err.error.message + err.error.errors;
                            console.error("Receive 400, Error:",err);                         
                        }
                        });
     }
     


    }

  

    

 


}
