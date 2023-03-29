import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { con } from "./mysql";

export const getResultadoxAlumno = (req:Request, res:Response) =>{
    try {
        const nro_cuenta = req.params.nro_cuenta;
        const cuestionario_nombre = req.params.cuestionario_nombre;
        const query = 'SELECT * FROM perfil_final_'+ cuestionario_nombre +' WHERE nro_cuenta = '+nro_cuenta+';';
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
        handleHttp(res, 'Error al obtener la respuesta');
    }
};


export const postResultadoCuestionario = (req :Request, res:Response) =>{
    try {

        let activo = 0;
        let reflexivo = 0; 
        let sensorial = 0;
        let intuitivo = 0; 
        let visual = 0;
        let verbal = 0; 
        let secuencial = 0;
        let global = 0; 
        let aux_1;
        let aux_2; 
        let aux_3; 
        let aux_4;
        let a = "";


        const cuestionario_nombre = req.params.cuestionario_nombre;
        const query = 'INSERT INTO '+ cuestionario_nombre +' SET ?';
        const resultadoObj = {
            id: null,
            nro_cuenta:  req.body.nro_cuenta,
            respuestas_compactadas:  req.body.respuestas_compactadas,
            grupo:  req.body.grupo
        }
        
        con.query(query,resultadoObj, error => {
            if(error) throw (error);
            //res.send('respuesta agregada');
        });

        for(let i = 0; i<44; i++){
            a = a + resultadoObj.respuestas_compactadas[i];
            if((i === 0)|| (i === 4)||(i === 8)||(i === 12)||(i === 16)||(i === 20)||(i === 24)||(i === 28)||(i === 32)||(i === 36)||(i === 40)){
                if(resultadoObj.respuestas_compactadas[i] === "A"){
                    activo ++;
                }else if(resultadoObj.respuestas_compactadas[i] === "B"){
                    reflexivo ++;
                }
            }
            else if((i === 1)|| (i === 5)||(i === 9)||(i === 13)||(i === 17)||(i === 21)||(i === 25)||(i === 29)||(i === 33)||(i === 37)||(i === 41)){ 
                if(resultadoObj.respuestas_compactadas[i] === "A"){
                    sensorial ++;
                }else if(resultadoObj.respuestas_compactadas[i] === "B"){
                    intuitivo ++;
                }
            }else if((i === 2)|| (i === 6)||(i === 10)||(i === 14)||(i === 18)||(i === 22)||(i === 26)||(i === 30)||(i === 34)||(i === 38)||(i === 42)){
                if(resultadoObj.respuestas_compactadas[i] === "A"){
                    visual ++;
                }else if(resultadoObj.respuestas_compactadas[i] === "B"){
                    verbal ++;
                }
            } else if((i === 3)|| (i === 7)||(i === 11)||(i === 15)||(i === 19)||(i === 23)||(i === 27)||(i === 31)||(i === 35)||(i === 39)||(i === 43)){
                if(resultadoObj.respuestas_compactadas[i] === "A"){
                    secuencial ++;
                }else if(resultadoObj.respuestas_compactadas[i] === "B"){
                    global ++;
                }
            }
        }

        if(activo>reflexivo){
            aux_1 = activo-reflexivo + 'A';
        }else{
            aux_1 = reflexivo-activo + 'B';
        }
        if(sensorial>intuitivo){
            aux_2 = sensorial-intuitivo + 'A';
        }else{
            aux_2 = intuitivo-sensorial + 'B';
        }
        if(visual>verbal){
            aux_3 = visual-verbal + 'A';
        }else{
            aux_3 = verbal-visual + 'B';
        }
        if(secuencial>global){
            aux_4 = secuencial-global + 'A';
        }else{
            aux_4 = global-secuencial + 'B';
        }

        const query2 = 'INSERT INTO perfil_final_'+ cuestionario_nombre +' SET ?';
        const perfilObj = {
            id: 0,
            nro_cuenta: resultadoObj.nro_cuenta,
            grupo: resultadoObj.grupo,
            activo_reflexivo: aux_1,
            sensorial_intuitivo: aux_2,
            visual_verbal: aux_3,
            secuencial_global: aux_4
        }
        con.query(query2,perfilObj, error => {
            if(error) throw (error);
            res.send('respuesta agregada');
        });
    } catch (error) {
        handleHttp(res, 'Error al postear una respuesta');
    }
};