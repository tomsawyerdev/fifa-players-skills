

# Video Demostrativo

# Presentacion en pdf



# Entorno

El challenge se compone de tres partes Api, Database y Front
y se utiliza docker-compose para los tres servicios.

# Levantar los servicios 

1. Generar solo la base de datos 

```docker-compose up db```

2. Pararla

```docker-compose down```

3. Levantar todo

```docker-compose up```

4. Acceder al front en el navegador con :

```http://localhost:4200/```

*Nota:* Por ser una demo, el usuario y el password ya estan preseteados en login

# Datos

Se utilizaron los archivos csv provistos, utilizando PySpark se eliminaron los filas duplicadas,
 y se tomo una muestra aproximada de 1000 items de cada uno y luego se unieron los 
 dataset en un csv que es importado cuando se levanta la base. 
 
 Tambien se creo una tabla de Paises y otra de Equipos para facilitar la interface de las busquedas.

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

1. Obtener un registro

```curl http://localhost:3000/players/4 -H 'Content-Type: application/json'  -H "Authorization:Bearer $API_JWT_TOKEN"```

2.  Update 
```curl -X POST http://localhost:3000/players/4 -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN" -d @test_player.json```

La api devuelve el objeto modificado

3. Verificar los cambios

```curl http://localhost:3000/players/4 -H 'Content-Type: application/json'  -H "Authorization:Bearer $API_JWT_TOKEN"```


## Create Player


```curl -X POST http://localhost:3000/players -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN" -d @test_player.json```

La api devuelve la ID del objeto creado

```{"status":201,"id":2017,"message":"Object was created"}```


## Get Countries

```curl http://localhost:3000/utils/countries -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```

## Get Teams

```curl http://localhost:3000/utils/teams -H 'Content-Type: application/json' -H "Authorization:Bearer $API_JWT_TOKEN"```
