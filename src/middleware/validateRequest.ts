import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger/index';

const validate = (schema: AnySchema) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            schema.validate({ body: req.body, query: req.query, params: req.params });
            return next();
        }
        catch(err){
            log.error("Error")
            return res.status(400).send("Error");
        }
    }

export default validate;
