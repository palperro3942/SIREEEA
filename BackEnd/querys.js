const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemon = require('nodemon');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.listen(PORT, ()=>{

});

const con = mysql.createConnection({
    host: 'localhost',
    database: 'bd_sireeea',
    user: 'root',
    password: ''
});
con.connect(error =>{
    if(error) throw (error);
    console.log('database ok' + PORT);
});
///////////////////////////////////////////////////////////////////////////////////////////////////
//AQUI ESTARAN DEFINIDAS LAS DISTINTAS PETICIONES QUE PUEDEN LLEGAR A SER GENERADAS////////////////
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV////

///////////////////////////////////////////////////////////////////////////////////////////////////
//PETICIONES QUE PUEDEN LLEGAR EN EL INICIO DE SECION//////////////////////////////////////////////
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV////

app.get('/login',(req,res)=>{
    const query = 'SELECT * FROM alumnos WHERE nro_cuenta = '+ req.body.nro_cuenta +';';
    con.query(query,(error,result)=>{
            if(error)throw error;
            if(result.length>0){
                
                const query = 'SELECT * FROM alumnos WHERE nro_cuenta = '+ req.body.nro_cuenta +' and contraseña = "'+ req.body.contraseña +'";';
                con.query( query,  (error, result) => {
                    if(error) throw error;
                    if(result.length>0){
                        res.json(result);
                    }else{
                        res.send('La contraseña ingreada es incorrecta');
                    }
                } );

            }else{
                res.send('Usuario no encontrado');
            }
        }
    );
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//PETICIONES QUE PUEDEN LLEGAR A SOLICITARSE A LA TABLA DE LOS ALUMNOS/////////////////////////////
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV////
app.get('/alumnos/:nro_cuenta',(req,res)=>{//AQUI SE ESTA BUSCANDO A UN ALUMNO POR SU N° DE CUENTA/
    const nro_cuenta = req.params.nro_cuenta;
    const query = 'SELECT * FROM alumnos WHERE nro_cuenta = '+nro_cuenta+';';
    con.query(query,(error,result)=>{
            if(error)throw error;
            if(result.length>0){
                res.json(result);
            }else{
                res.send('Not found');
            }
        }
    );
});

app.get('/alumnos/grupo/:grupo',(req,res)=>{//AQUI SE ESTA BUSCANDO A UN ALUMNO POR SU GRUPO////////
    const grupo = req.params.grupo;
    const query = 'SELECT * FROM alumnos WHERE grupo = "'+grupo+'";';
    con.query(query,(error,result)=>{
            if(error)throw error;
            if(result.length>0){
                res.json(result);
            }else{
                res.send('Not found');
            }
        }
    );
});

app.post('/alumnos/nuevo',(req,res)=>{//AQUI SE ESTA AGREGANDO UN ALUMNO NUEVO A LA BASE DE DATOS//
    const query = 'INSERT INTO alumnos SET ?';
    const alumnoObj = {
        nro_cuenta: req.body.nro_cuenta,
        nombre: req.body.nombre,
        apellido_1: req.body.apellido_1,
        apellido_2: req.body.apellido_2,
        fecha_nacimiento: req.body.fecha_nacimiento,
        id_carrera: req.body.id_carrera,
        grupo: req.body.grupo
    }
    con.query(query,alumnoObj, error => {
        if(error) throw (error);
        res.send('alumno agregado')
    });
});

app.put('/alumnos/modificando/:nro_cuenta',(req,res)=>{//AQUI SE MODIFICAN DATOS DEL ALUMNO///////
    const nro_cuenta = req.params.nro_cuenta;
    const {nombre,apellido_1,apellido_2,fecha_nacimiento} = req.body;
    const query = 'UPDATE alumnos SET nombre = "'+nombre+'", apellido_1 = "'+apellido_1+'", apellido_2 = "'
                    +apellido_2+'", fecha_nacimiento = "'+fecha_nacimiento+'" WHERE nro_cuenta ='+nro_cuenta+';';
    con.query(query, error => {
        if(error) throw (error);
        res.send('alumno modificado')
    });
});

app.delete('/alumnos/:nro_cuenta',(req,res)=>{//AQUI SE ESTA BORRA A UN ALUMNO POR SU N° DE CUENTA/
    const nro_cuenta = req.params.nro_cuenta;
    const query = 'DELETE FROM alumnos WHERE nro_cuenta = '+nro_cuenta+';';
    con.query(query,(error,result)=>{
            if(error)throw error;
                res.send('alumno eliminado');
        }
    );
});
///////////////////////////////////////////////////////////////////////////////////////////////////