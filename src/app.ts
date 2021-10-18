import config from '../config/default';
import log from './logger/index';
import connect from './db/connect';
import { AppRouter } from './AppRouter';
import { deserializeUser } from './middleware';
import express, { Request, Response} from 'express';    
import('./controller/post.controller');
import('./controller/session.controller');
import('./controller/user.controller');

// process.env.UV_THREADPOOL_SIZE = '2';
const cluster = require('cluster');

// if (!cluster.isMaster) {

    const port = config.port as number;
    const host = config.host as string;

    const app = express();

    app.use(deserializeUser);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(AppRouter.getInstance());
    app.get('/healthcheck', (req: Request, res: Response) => { res.send('Radi app'); });
    
    app.listen(port, host, () => {
        log.info(`Server listening at http://${host}:${port}`);
        
        connect();
    });
// }
// else{
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
// }




