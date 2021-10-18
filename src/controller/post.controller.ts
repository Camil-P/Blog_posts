import { Request, Response } from 'express';
import { createPost, findPost, findAndUpdate, deletePost } from '../service/post.service';
import { get as getParams} from 'lodash';
import { controller } from './decorators/controller';
import { post, get, del, put } from './decorators/routes';
import { use } from './decorators/middleware';
import { validateSchema } from './decorators/validateSchema';
import { createPostSchema, deletePostSchema, updatePostSchema } from '../schema/post.schema';
import requiresUser from '../middleware/requiresUser';

@controller('/posts')
export class PostsController{
    
    @del('/:postId')
    async deletePostHandler(req: Request, res: Response){
        const postId = getParams(req, 'params.postId');
        const post = await findPost({ postId });
    
        if(!post) return res.sendStatus(404);
    }
    
    @use(requiresUser)
    @validateSchema(createPostSchema)
    @post('/')
    async createPostHandler(req: Request, res: Response){
        const userId = getParams(req, 'user._id');
        const body = req.body;
    
        const post = await createPost({ ...body, user: userId });
    
        return res.send(post);
    }
    
    @use(requiresUser)
    @validateSchema(updatePostSchema)
    @put('/:postId')
    async updatePostHandler(req: Request, res: Response){
        const userId = getParams(req, 'user._id');
        const postId = getParams(req, 'params.postId');
        const update = req.body;
    
        const post = await findPost({ postId });
        if(!post) return res.sendStatus(404);
    
        if(String(post.user !== userId)) return res.sendStatus(401);
    
        const updatedPost = await findAndUpdate({ postId }, update, { new: true });
    
        return res.send(updatedPost);
    } 
    
    @use(requiresUser)
    @validateSchema(deletePostSchema)
    @get('/:postId')
    async getPostHandler(req: Request, res: Response){
        const userId = getParams(req, 'user._id');
        const postId = getParams(req, 'params.postId');
    
        const post = await findPost({ postId });
        if(!post) return res.sendStatus(404);
    
        if(String(userId) !== post.user._id) return res.sendStatus(401);
    
        await deletePost({ postId });
    
        res.sendStatus(200);
    }
}