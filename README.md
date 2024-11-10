

# FiFa Player Skills Comparator

# Entorno

El challenge se compone de tres partes Api, Database y Front
y se utiliza docker-compose para los tres servicios.
Las claves se leen de un archivo de environment: *.env*

## Api

La api corre en **Node Express** y utiliza **Sequelize** como orm, los jason web tokens son generados con
la libreria **jsonwebtoken** y son verificados por **passport-jwt**.
Las contraseñas se almacenan "hasheadas" y para ello se utiliza **argon2**.
Para la validacion de los datos que llegan se utiliza **Celebrate**.

## Front

El front esta desarrollado en **Angular** y se utilizo la libreria **Material Angular** para los componentes.
El front permite buscar jugadores por nombre, nacionalidad, club y genero. Luego se pueden seleccionar
jugadores y comparar las habilidades en graficos del tipo radar provistos por la librerira **Chart.js**.

El front tiene implementado un servicio que cumple la funcion de data store para almacenar el estado 
de las busquedas y de los jugadores seleccionados.

Para la implementacion del download de jugadores se utilizo **Axios**.

Para la creacion y edicion de los jugadores se utiliza los formularios **Reactive forms** y la libreria **Chart.js**.

Cuando el front interactua con la API obtiene mensages de respuesta a las acciones, ya sea mostrar errores de validacion o
de que el objeto fue creado o fue actualizado correctamente. Todos los mensajes son devueltos por la API.

## Database

El motor de base de datos elegido es **MySql**, cuando se genera el containner este lee los archivos de inicializacion
los cuales crean las tablas, crean el usuario y le otorgan los permisos sobre las tablas, tambien importa los CSV de jugadores, paises y clubes. El docker utiliza un volumen externo al containner para que de esta manera los datos esten persistentes si se baja el servicio y se lo levanta nuevamente.  

## Archivos de datos

Se utilizaron los archivos csv provistos, utilizando **PySpark** se eliminaron los filas duplicadas,
y se tomo una muestra aproximada de 1000 items de cada uno y luego se unieron los 
dataset en un csv que es importado cuando se levanta la base. 
 
 Para facilitar la interface de las busquedas y de la edicion, se crearon dos tablas una de paises y otra de equipos .

# Instrucciones para levantar los servicios 

1. Generar solo la base de datos 

```docker-compose up db```

2. Pararla

```docker-compose down```

3. Levantar todo

```docker-compose up```

4. Acceder al front en el navegador con :

```http://localhost:4200/```

*Nota:* Por ser una demo, el usuario:"Alice" y el password:"secret" ya estan preseteados en login.



# Probar la Api

## Obtener Token

```curl -X POST http://localhost:3000/sessions -H 'Content-Type: application/json' -d '{"username":"Alice","password":"secret"}'```

*Almacenarlo*

```API_JWT_TOKEN= token sin comillas```

*Ejemplo*

```API_JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsaWNlIiwiaWF0IjoxNzMxMTg3MDE5LCJleHAiOjE3MzEyMjMwMTl9.Wwvx5Ag_rS9uuVzNTKwiiWQEzGlgSabv4XQIkqx3hqM```

*Verificarlo*

```echo $API_JWT_TOKEN```

# Probar endpoints

## Search

*Warning: En el Authorization usar comillas dobles*

```curl -I 'http://localhost:3000/players?country=Argentina'  -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```

```curl 'http://localhost:3000/players?country=Argentina&team=Boca'  -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```


## Get One

```curl http://localhost:3000/players/450 -H 'Content-Type: application/json'  -H "Authorization:Bearer $API_JWT_TOKEN"```


## Get set de players

```curl -X POST http://localhost:3000/players/set -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN" -d '{"ids":[4,5]}'```


## Update Players

El archivo "test_player.json" se utiliza como fuente de datos.

1. Obtener un jugador

```curl http://localhost:3000/players/4 -H 'Content-Type: application/json'  -H "Authorization:Bearer $API_JWT_TOKEN"```

2.  Update 
```curl -X POST http://localhost:3000/players/4 -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN" -d @test_player.json```

La api devuelve el objeto modificado

3. Verificar los cambios

```curl http://localhost:3000/players/4 -H 'Content-Type: application/json'  -H "Authorization:Bearer $API_JWT_TOKEN"```


## Create Player

El archivo "test_player.json" se utiliza como fuente de datos.

```curl -X POST http://localhost:3000/players -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN" -d @test_player.json```

La api devuelve la ID del objeto creado

```{"status":201,"id":2017,"message":"Object was created"}```


## Get Countries

```curl http://localhost:3000/utils/countries -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```

## Get Teams

```curl http://localhost:3000/utils/teams -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```
