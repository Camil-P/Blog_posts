import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createAccesToken, createSession, updateSession, findSessions } from '../service/session.service';
import { sign } from '../utils/jwt.utils';
import config from '../../config/default';
import { get as getParams } from 'lodash';
import { controller } from './decorators/controller';
import { post, get, del } from './decorators/routes';
import { use } from './decorators/middleware';
import { validateSchema } from './decorators/validateSchema';
import { createUserSessionSchema } from '../schema/user.schema';
import requiresUser from '../middleware/requiresUser';

@controller('/sessions')
export class SessionsController {

    @validateSchema(createUserSessionSchema)
    @post('/')
    async createUserSessionHandler(req: Request, res: Response) {
        const user = await validatePassword(req.body);
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const session = await createSession(user._id, getParams(req, 'user-agent') || ''); //user-agent je mesto sa kojeg poziv stize (ime browsera npr)  

        const accesToken = createAccesToken({ user, session });

        const refreshToken = sign(session, { expiresIn: config.refreshTokenTtl, }) // 1 year

        return res.send({ accesToken, refreshToken });
    }

    @use(requiresUser)
    @del('/')
    async invalidateUserSessionHandler(req: Request, res: Response) {
        const sessionId = getParams(req, 'user.session');

        await updateSession({ _id: sessionId }, { valid: false });

        return res.sendStatus(200);
    }

    @use(requiresUser)
    @get('/')
    async getUserSessionsHandler(req: Request, res: Response) {
        const userId = getParams(req, 'user._id');

        const sessions = await findSessions({ user: userId, valid: true });

        return res.send(sessions);
    }
}