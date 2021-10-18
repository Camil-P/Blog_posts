// import { Express, Request, Response } from 'express';
// import { createUserHandler } from './controller/user.controller';
// import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
// import { createPostHandler, updatePostHandler, deletePostHandler, getPostHandler } from './controller/post.controller';
// import { validateRequest, requiresUser } from './middleware';
// import { createUserSchema, createUserSessionSchema } from './schema/user.schema';
// import { createPostSchema, updatePostSchema, deletePostSchema } from './schema/post.schema';

// export default function(app: Express){
//     app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

//     app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

//     app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);

//     app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);
    
//     app.get('/api/sessions', requiresUser, getUserSessionsHandler);

//     // POST Routes

//     app.post('/api/posts', [requiresUser, validateRequest(createPostSchema)], createPostHandler);

//     app.put('/api/posts/:postId', [requiresUser, validateRequest(updatePostSchema)], updatePostHandler)

//     app.get('/api/posts/:postId', getPostHandler);

//     app.delete('api/posts/:postId', [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);
// }