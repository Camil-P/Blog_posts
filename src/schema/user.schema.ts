import { object, string, ref } from 'yup';

export const createUserSchema = object({
    body: object({
        name: string().required('Name is required'),
        email: string().required('Email is required').email('Must be a valid email'),
        password: string().required('Password is required').min(6, 'Password must contain 6 chars minimum'),
        passwordConfirmation: string().oneOf([ref('password'), null], 'Must match password'),
    }),
}); 

export const createUserSessionSchema = object({
    body: object({
        email: string().required('Email is required').email('Must be valid email'),
        password: string().required('Password is required').min(6, 'Password must contain 6 chars minimum'),
    })
});