
var Players = require('../models/players.model')
const { Op } = require('sequelize');

//console.log("typeof:",typeof(players),Object.keys(players));
//http://localhost:3000/players?contry=Argentina&club=Vélez Sarsfield
//http://localhost:3000/players?name=Ana&gender=f
//http://localhost:3000/players?name=Isabella

const JsonToCsv= (items)=> {
    const header = Object.keys(items[0]);  
    const headerString = header.join(','); 
    //const replacer = (key, value) => value ?? ''; 
    const rowItems = items.map((row) => header.map((fieldName) => row[fieldName]).join(','));  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n'); 
     return csv;
  }


const list = async (req, res)=>{ 
    console.log(" list players:");
    //
    //if (format && format==='csv'){
    //res.type('text/csv').attachment('players.csv').send("uno,dos\n1,2,");    
    //res.type('text/plain').send("uno,dos\n1,2,"); 
    const { name, country, club, gender, format } = req.query;
    let options = { where: {}, raw: true, order: [['long_name', 'ASC']] };   
    name ? (options.where.long_name = { [Op.like]: `%${name}%` }) : null;
    country ? (options.where.nationality_name = { [Op.like]: `%${country}%` }) : null;
    club ?  (options.where.club_name = { [Op.like]: `%${club}%` }) : null;
    gender ?  (options.where.gender = { [Op.like]: `%${gender}%` }) : null;

    
  
    if (format && format==='csv'){
        result = await Players.findAll(options)
        res.type('text/csv').attachment('players.csv').send(JsonToCsv(result));    
    }
    else
    {    
        const {page,size} = req.query;
        
        if (page && size){
             // con paginacion y con busqueda 
            p= Number.parseInt(page);
            s= Number.parseInt(size); 
            if (Number.isNaN(p) || Number.isNaN(s)){
                //console.log("  players nothing");
                res.json({status:200,count:0,items:[]});    
            }
            else
            {
            //alls =  await Players.findAll(options)
            //const pages = Math.ceil(alls.length / s);
            options.offset=p*s;
            options.limit=s;
            //console.log(options);                          
            const { count, rows } = await Players.findAndCountAll(options)
            console.log(" players pagination count:",count);
            res.json({status:200,count,items:rows});
            }
        }
        else
        {   // sin paginar y con busqueda
            result = await Players.findAll(options)
            console.log(" players all:",result.length);
            res.json({status:200,count:result.length,items:result});

        }

        
    }
      
} 
 
 
const getset = async (req, res)=>{ 
    const ids = req.body.ids;
    console.log(" getset:",ids);
    let options = { where: { id : ids }, raw: true, order: [['long_name', 'ASC']] };   
    result = await Players.findAll(options)       
    res.json({status:200,items:result});                
    
}

const get = async (req, res)=>{ 
    console.log(" get id:",req.params.id);
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        res.status(400).json({status:400, message:'Malformed url'});
        return        
    }   

    const result = await Players.findByPk( id )
    
    if (result==null){
        //console.log("result: null");

         res.status(404).json({status:404, message: 'No content' });       
    }
    else
    { 
        
         res.json({status:200,player:result});            
    }
    
}



const create = async (req, res)=>{ 
    const data = req.body;
    console.log("   create");
    const player = await Players.create(data);   
    
    res.status(201).json({status:201, id:player.id ,message:"Object was created"});     
} 



//Post with id
const update = async (req, res)=>{ 
    const id = Number.parseInt(req.params.id);
    const data = req.body;
    console.log("   Player update, player id:",id);
    //console.log("        height_cm:", data.height_cm, typeof(data.height_cm));
    //console.log("        weight_kg:", data.weight_kg, typeof(data.weight_kg));
    if (Number.isNaN(id)) {
        res.status(400).json({status:400, message:'Malformed url'});
        return;
    }

    //console.log("update:",id,changes);
    result = await Players.findByPk( id )
    
    if (result==null){
        //console.log("result: null");
         res.status(404).json({status:404, message: 'No found' });       
    }
    else
    { 
         ack = await result.update(data);
         res.json({status:200,player:ack,  message:"Object was updated"});            
    }
    
} 


const remove = async (req, res)=>{ 
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        res.status(400).json({status:400, message:'Malformed url'});
        return
    } 

    result = await Players.findByPk( id )
    
    if (result==null){
        //console.log("result: null");
         res.status(404).json({status:404, message: 'No found' });       
    }
    else
    { 
         ack = await result.destroy();
         res.json({status:200,player:ack, message:"Object was removed"});            
    }  
  
    
} 


// Export of all methods as object 
module.exports = { 
    list,
    get, 
    getset,
    create,
    update,
    remove   
     
}