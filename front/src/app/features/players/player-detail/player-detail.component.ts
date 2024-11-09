import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
//import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
//import { Router } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import {PlayerDetailHeaderComponent} from '../player-detail-header/player-detail-header.component';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [MatButtonModule,BaseChartDirective,PlayerDetailHeaderComponent],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent {

  //@ViewChild(BaseChartDirective) chartPower: BaseChartDirective | undefined;
  //@ViewChild('chartPower', {static: false}) chartPower: BaseChartDirective | undefined;

  private api = inject(ApiService);
  //private router = inject(Router);

  radarMoveData : ChartData<'radar'>| undefined; ;
  radarPowerData:any = {};
  radarAttackData:any = {};
  radarSkillsData:any = {};

  ids=[];
  players =[]; 
  //player : any={};
  
  //@Input() player: any;// ={long_name:"default"};
    constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.ids = JSON.parse(params['ids']);
        console.log(this.ids);
        this.api.getPlayersSet(this.ids).subscribe({next: (resp) => { this.players = resp.items; this.updCharts(resp.items);}});

      });

      
      
     

    }

   // this.api.getPlayer(this.id).subscribe({next: (resp) => { this.player = resp.player; this.updCharts(this.player);}});

   /*
    clickedEdit(){
      console.log(this.player);
      this.router.navigate([`/players/edit/${this.ids}`]); 
    }*/


/*
    attackData(){
        
       var data= [ this.player.attacking_crossing,this.player.attacking_finishing,this.player.attacking_heading_accuracy,this.player.attacking_short_passing,this.player.attacking_volleys ];
       console.log("attackData:",data);
       return data;
      }
*/

  updCharts(players:any){

    //console.log("updCharts:",players.length);

    
    console.log("updCharts:",this.radarPowerData.datasets);
    var attack_ds = players.map( (e:any) => ({ data: [e.attacking_crossing,e.attacking_finishing,e.attacking_heading_accuracy,e.attacking_short_passing,e.attacking_volleys],label:e.long_name}));
    var skills_ds = players.map( (e:any) => ({ data: [e.skill_dribbling,e.skill_curve,e.skill_fk_accuracy,e.skill_long_passing,e.skill_ball_control],label:e.long_name}));
    var move_ds = players.map( (e:any) => ({ data: [e.movement_acceleration,e.movement_sprint_speed,e.movement_agility,e.movement_reactions,e.movement_balance],label:e.long_name}));
    var power_ds = players.map((e:any) => ({ data: [e.power_shot_power,e.power_jumping,e.power_stamina,e.power_strength,e.power_long_shots],label:e.long_name}))

    //console.log("updCharts:",move);
    this.radarAttackData = {
      labels: ['crossing','finishing','heading accuracy','short passing','volleys'],
      datasets: attack_ds,    
    } ;
  
    this.radarSkillsData = {
      labels: ['dribbling','curve','accuracy','long passing','ball control'],
      datasets: skills_ds    
    } ;


    this.radarMoveData = {
      labels: ['acceleration','sprint speed','agility','reactions','balance'],
      datasets: move_ds,    
    } ;
    this.radarPowerData= {
      labels: ['shot_power','jumping','stamina','strength','long_shots'],
      datasets: power_ds  };

    //console.log("updCharts:",this.radarPowerData.datasets);

   
    //console.log(Object.keys(this.chartPower ))
    //this.chartPower.update();
  }      

  public radarChartOptions: ChartConfiguration['options'] = {  
      scales: {
    r: {
        angleLines: { display: false  },
        suggestedMin: 0,
        suggestedMax: 100
     }
    }}

  //}};
  //,this.attackData(): ChartData<'radar'> 
/*
  public radarAttackData :  ChartData<'radar'>= {
    labels: ['crossing','finishing','heading accuracy','short passing','volleys'],
    datasets: [{ data: [20,30,40,50,60], label: 'Attack'}],    
  } ;

  public radarSkillsData: ChartData<'radar'> = {
    labels: ['dribbling','curve','accuracy','long passing','ball control'],
    datasets: [{ data: [30,40,50,60,20], label: 'Attack'}],    
  } ;
  
  public radarMoveData = {
    labels: ['acceleration','sprint speed','agility','reactions','balance'],
    datasets: [{ data: [40,50,60,20,30], label: 'Attack'}],    
  } ;
  //ChartData<'radar'>
  public radarPowerData  = {
    labels: ['shot_power','jumping','stamina','strength','long_shots'],
    datasets: [{ data: [50,60,20,30,40], label: 'Attack'}],    
  } ;*/



  
}
