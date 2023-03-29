import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { con } from "./mysql";

const loginAlumno = (req:Request, res:Response) => {

    try {
        const nro_cuenta = req.body.nro_cuenta;
        const query = 'SELECT * FROM alumnos WHERE nro_cuenta = '+ nro_cuenta +';';
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

    } catch ( error ) {

    }

}

const getAlumnos = (req:Request, res:Response) =>{
    try {
        //AQUI SE ESTAN BUSCANDO A LOS ALUMNOS/
            const query = 'SELECT * FROM alumnos;';
            //const query = 'SELECT * FROM alumnos WHERE nro_cuenta = '+nro_cuenta+';';
            con.query(query,(error,result)=>{
                    if(error)throw error;
                    if(result.length>0){
                        res.json(result);
                    }else{
                        res.send('Not found');
                    }
                }
            );
    } catch (error) {
        handleHttp(res, 'Error al obtener un alumno');
    }
};

const getEncuestasAsignadas = (req:Request, res:Response) => {

    try {
        //AQUI SE ESTAN BUSCANDO LAS ENCUESTAS ASIGNADAS AL GRUPO DE ESTUDIANTES/
            const id_grupo = req.params.id_grupo;
            const query = 'SELECT * FROM `cuestionarios` INNER JOIN grupos_asignados WHERE cuestionarios.id_profesor = grupos_asignados.id_profesor and grupos_asignados.id_grupo = '+ id_grupo +';';
            con.query(query,(error,result)=>{
                    if(error)throw error;
                    if(result.length>0){
                        res.json(result);
                    }else{
                        res.send('Not found');
                    }
                }
            );
    } catch (error) {
        handleHttp(res, 'Error al obtener un encuestas del grupo');
    }

}

const postEstadoEncuesta = (req:Request, res:Response) => {

    try {
        //AQUI SE ESTAN BUSCANDO SI EL ALUMNO YA CONTESTO ESTA ENCUESTA O NO/
            const query = 'SELECT * FROM '+ req.body.nombre_cuestionario +' WHERE nro_cuenta = '+ req.body.nro_cuenta +';';
            con.query(query,(error,result)=>{
                    if(error)throw error;
                    if(result.length>0){
                        res.json(result);
                    }else{
                        res.send('Not found');
                    }
                }
            );
    } catch (error) {
        handleHttp(res, 'Error al obtener un encuestas del grupo');
    }

}

const getObtenerPerfil = (req:Request, res:Response) => {
    try {
        const nro_cuenta = req.params.nro_cuenta;
        const query = 'SELECT * FROM perfil_final_inventario_de_felder WHERE nro_cuenta = '+nro_cuenta+' ORDER BY id DESC LIMIT 1;';
        con.query(query,(error,result)=>{
                if(error)throw error;
                if(result.length>0){
                    res.json(result);
                }else{
                    res.send('Not found');
                }
            }
        );
    } catch (error) {
        handleHttp(res, 'Error al obtener todos los alumnos');
    }
}

const getObtenerPreguntas = (req:Request, res:Response) => {
    try {
        const id_cuestionario = req.params.id_cuestionario;
        const query = 'SELECT * FROM `preguntas` WHERE id_cuestionario = ' + id_cuestionario + ' ORDER BY num_pregunta;';
        con.query(query,(error,result)=>{
                if(error)throw error;
                if(result.length>0){
                    res.json(result);
                }else{
                    res.send('Not found');
                }
            }
        );
    } catch (error) {
        handleHttp(res, 'Error al obtener todos los alumnos');
    }
}

const getAlumno = (req:Request, res:Response) =>{
    try {
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
    } catch (error) {
        handleHttp(res, 'Error al obtener todos los alumnos');
    }
};


const getAlumnosxGrupo = (req:Request, res:Response) =>{
    try {
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
    } catch (error) {
        handleHttp(res, 'Error al obtener todos los alumnos');
    }
};

const updateAlumno = (req:Request, res:Response) =>{
    try {
        const nro_cuenta = req.params.nro_cuenta;
        const {nombre,apellido_1,apellido_2,fecha_nacimiento} = req.body;
        const query = 'UPDATE alumnos SET nombre = "'+nombre+'", apellido_1 = "'+apellido_1+'", apellido_2 = "'
                        +apellido_2+'", fecha_nacimiento = "'+fecha_nacimiento+'" WHERE nro_cuenta ='+nro_cuenta+';';
        con.query(query, error => {
            if(error) throw (error);
            res.send('alumno modificado')
        });
    } catch (error) {
        handleHttp(res, 'Error al modificar un alumno');
    }
};

const postAlumno = (req :Request, res:Response) =>{
    try {
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
    } catch (error) {
        handleHttp(res, 'Error al postear un alumno');
    }
};

const deleteAlumno = (req:Request, res:Response) =>{
    try {
        const nro_cuenta = req.params.nro_cuenta;
        const query = 'DELETE FROM alumnos WHERE nro_cuenta = '+nro_cuenta+';';
        con.query(query,(error,result)=>{
            if(error)throw error;
                res.send('alumno eliminado');
        }
        );
    } catch (error) {
        handleHttp(res, 'Error al eliminar un alumno');
    }
}

export { loginAlumno, getObtenerPreguntas, getAlumno, getAlumnos, getObtenerPerfil, getEncuestasAsignadas, postEstadoEncuesta, updateAlumno, postAlumno, deleteAlumno, getAlumnosxGrupo };