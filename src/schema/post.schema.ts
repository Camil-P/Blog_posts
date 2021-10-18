import { object, string, ref } from 'yup';

const payload = {
    body: object({
        title: string().required('Title is required'),
        body: string().required('Body is required').min(120, 'Body is too short.'),
    })
};

export const createPostSchema = object({
    ...payload,
});

export const updatePostSchema = object({
    params: object({
        postId: string().required('postId is required'),
    }),
    ...payload,
});

export const deletePostSchema = object({
    params: object({
        postId: string().required('postId is required'),
    }),
})