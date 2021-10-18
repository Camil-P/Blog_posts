import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import { omit } from 'lodash';
import log from '../logger/index';
import { controller } from './decorators/controller';
import { post } from './decorators/routes';
import { createUserSchema } from '../schema/user.schema';
import { validateSchema } from './decorators/validateSchema';

@controller('/users')
export class UsersController {

    @validateSchema(createUserSchema)
    @post('/')
    async createUserHandler(req: Request, res: Response) {
        try {
            const user = await createUser(req.body);
            return res.send(omit(user.toJSON(), 'password'));
        }
        catch (err) {
            log.error(err);
            return res.status(409).send(err.message);
        }
    }
}