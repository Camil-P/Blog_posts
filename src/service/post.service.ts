import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import PostModel, { PostDocument } from '../model/post.model';

export async function createPost(input: DocumentDefinition<PostDocument>){
    return PostModel.create(input);
}

export async function findPost(query: FilterQuery<PostDocument>, options: QueryOptions = { lean: true }){
    return PostModel.findOne(query, {}, options);
}

export async function findAndUpdate(query: FilterQuery<PostDocument>, update: UpdateQuery<PostDocument>, options: QueryOptions){
    return PostModel.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<PostDocument>){
    return PostModel.deleteOne(query);
}