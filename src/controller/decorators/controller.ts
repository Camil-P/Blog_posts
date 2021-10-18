import 'reflect-metadata';
import { RouteMethodes } from './RouteMethodes.Enumes';
import { MetadataKeys } from './MetadataKeys.Enumes';
import { validateRequest, requiresUser } from '../.././middleware';
import { AppRouter } from '../../../src/AppRouter';
import express from 'express';

export function controller(controllerRoute: string): Function{
    return function(target: Function, key: string, desc: PropertyDescriptor){
        
        const route: express.Router = AppRouter.getInstance();
        
        for(let key in target.prototype){

            const routeHandler = target.prototype[key];
            const method: RouteMethodes = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const validationSchema = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key);

            if (validationSchema){
                route[method](`/api${controllerRoute}${path}`, [...middlewares, validateRequest(validationSchema)], routeHandler);
            }
            else{
                route[method](`/api${controllerRoute}${path}`, [...middlewares], routeHandler);
            }
        }
    }
}