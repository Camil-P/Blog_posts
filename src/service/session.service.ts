import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import config from '../../config/default';
import { sign, decode } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string){
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export function createAccesToken({ user, session }: 
    { user: | Omit<UserDocument, 'password'> | LeanDocument<Omit<UserDocument, 'password'>>;
      session: | Omit<SessionDocument, 'password'> | LeanDocument<Omit<SessionDocument, 'password'>>;})
    
    {
        const accessToken = sign(
            {...user, session: session._id},
            {expiresIn: config.accesTokenTtl} // 15 min
        );
        
        return accessToken;
}

export async function reIssueAccessToken({ refreshToken }: {refreshToken: string}){
    const { decoded } = decode(refreshToken);
    if(!decoded || !get(decoded, '_id')) return false;

    const session = await SessionModel.findOne(get(decoded, '_id'));
    if(!session || !session?.valid) return false;

    const user = await findUser({ id: session.user });
    if(!user) return false;

    const accesToken = createAccesToken({ user, session });

    return accesToken;
} 

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>){
    return SessionModel.find(query).lean();
}