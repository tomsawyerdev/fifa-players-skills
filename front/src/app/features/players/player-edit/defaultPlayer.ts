export function  getDefaultPlayer(){

      var player:any={} ; 

      player.long_name="";  
      player.nationality_name="";   
      player.club_name="";
      player.club_jersey_number=0;  
      player.dob ="2000-10-10";
      player.value_eur=0;  
      player.height_cm=0;  
      player.weight_kg=0;  
      player.gender="";   
      player.player_face_url="";
      

      player.attacking_crossing=50;
      player.attacking_finishing=50;
      player.attacking_heading_accuracy=50;
      player.attacking_short_passing=50;
      player.attacking_volleys=50;
      player.skill_dribbling=50;
      player.skill_curve=50;
      player.skill_fk_accuracy=50;
      player.skill_long_passing=50;
      player.skill_ball_control=50;
      player.movement_acceleration=50;
      player.movement_sprint_speed=50;
      player.movement_agility=50;
      player.movement_reactions=50;
      player.movement_balance=50;
      player.power_shot_power=50;
      player.power_jumping=50;
      player.power_stamina=50;
      player.power_strength=50;
      player.power_long_shots=50;

      return player;
    }

