import { Router } from "express";
import { loginAlumno, getObtenerPreguntas, deleteAlumno, getObtenerPerfil, getAlumno, getEncuestasAsignadas, postEstadoEncuesta, getAlumnos, postAlumno, updateAlumno, getAlumnosxGrupo } from "../controllers/alumno.controller";


const router = Router();

router.get('/', getAlumnos);
router.get('/encuesta/:id_grupo', getEncuestasAsignadas);
router.get('/preguntas/:id_cuestionario', getObtenerPreguntas);
router.get('/perfil/:nro_cuenta', getObtenerPerfil);
router.get('/:nro_cuenta', getAlumno);
router.get('/grupo/:grupo', getAlumnosxGrupo);
router.put('/:nro_cuenta', updateAlumno);

router.post('/', postAlumno);
router.post('/encuesta/status', postEstadoEncuesta);
router.post('/login', loginAlumno);

router.delete('/:nro_cuenta', deleteAlumno);

export {router};