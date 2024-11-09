const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const Player = db.define("players", {
    long_name: { type: DataTypes.STRING,   allowNull: false    },    
    player_face_url: { type: DataTypes.STRING,   allowNull: false    },
    value_eur : { type: DataTypes.INTEGER,   allowNull: false    },
    dob: { type: DataTypes.STRING,   allowNull: false    },
    height_cm : { type: DataTypes.INTEGER,   allowNull: false    },
    weight_kg : { type: DataTypes.INTEGER,   allowNull: false    },
    club_name : { type: DataTypes.STRING,   allowNull: false    },
    club_jersey_number : { type: DataTypes.INTEGER,   allowNull: false    },
    nationality_name : { type: DataTypes.STRING,   allowNull: false    },     
    attacking_crossing : { type: DataTypes.INTEGER,   allowNull: false    },
    attacking_finishing : { type: DataTypes.INTEGER,   allowNull: false    },
    attacking_heading_accuracy : { type: DataTypes.INTEGER,   allowNull: false    },
    attacking_short_passing : { type: DataTypes.INTEGER,   allowNull: false    },
    attacking_volleys : { type: DataTypes.INTEGER,   allowNull: false    },
    skill_dribbling : { type: DataTypes.INTEGER,   allowNull: false    },
    skill_curve : { type: DataTypes.INTEGER,   allowNull: false    },
    skill_fk_accuracy: { type: DataTypes.INTEGER,   allowNull: false    },
    skill_long_passing : { type: DataTypes.INTEGER,   allowNull: false    },
    skill_ball_control : { type: DataTypes.INTEGER,   allowNull: false    },
    movement_acceleration : { type: DataTypes.INTEGER,   allowNull: false    },
    movement_sprint_speed : { type: DataTypes.INTEGER,   allowNull: false    },
    movement_agility : { type: DataTypes.INTEGER,   allowNull: false    },
    movement_reactions : { type: DataTypes.INTEGER,   allowNull: false    },
    movement_balance : { type: DataTypes.INTEGER,   allowNull: false    },
    power_shot_power : { type: DataTypes.INTEGER,   allowNull: false    },
    power_jumping : { type: DataTypes.INTEGER,   allowNull: false    },
    power_stamina : { type: DataTypes.INTEGER,   allowNull: false    },
    power_strength : { type: DataTypes.INTEGER,   allowNull: false    },
    power_long_shots : { type: DataTypes.INTEGER,   allowNull: false    },
    gender : { type: DataTypes.STRING,   allowNull: false    }
 });
 
module.exports= Player