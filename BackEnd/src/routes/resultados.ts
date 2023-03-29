import { Router } from "express";
import {getResultadoxAlumno, postResultadoCuestionario } from "../controllers/resultados.controller";

const  router = Router();

router.post('/:nro_cuenta/:cuestionario_nombre', postResultadoCuestionario);
router.get('/:nro_cuenta/:cuestionario_nombre', getResultadoxAlumno); //FATAL: :cuestionario_nombre parametro de mas! desde el front enviando mas

export {router};