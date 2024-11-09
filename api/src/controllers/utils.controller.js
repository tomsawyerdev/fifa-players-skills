var Countries = require('../models/countries.model')
var Teams = require('../models/teams.model')
const { Op } = require('sequelize');


const getCountries = async (req, res)=>{ 
    //console.log("list:");    
    result = await Countries.findAll()       
    res.json({status:200,items:result});    
      
} 

const getTeams = async (req, res)=>{ 
    //console.log("list:");    
    result = await Teams.findAll()       
    res.json({status:200,items:result});    
      
} 


module.exports = { getCountries,getTeams }