import 'reflect-metadata';
import { RequestHandler } from 'express';
import { RouteMethodes } from './RouteMethodes.Enumes';
import { MetadataKeys } from './MetadataKeys.Enumes';

interface RouteHandlerDescriptor extends PropertyDescriptor{
    value?: RequestHandler;
}

function bindRoutes(method: RouteMethodes){
    return function(path: string){
        return function(target: any, key: string, desc: RouteHandlerDescriptor){
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
        }
    }
}

export const get = bindRoutes(RouteMethodes.get);
export const post = bindRoutes(RouteMethodes.post);
export const del = bindRoutes(RouteMethodes.del);
export const put = bindRoutes(RouteMethodes.put);