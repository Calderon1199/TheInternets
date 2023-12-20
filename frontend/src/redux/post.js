import { csrfFetch } from './csrf';

//Constants
const ADD_NEW_POST = 'session/ADD_NEW_POST';
const GET_ALL_POSTS = 'session/GET_ALL_POSTS';
const GET_POST_BY_ID = 'session/GET_POST_BY_ID';
const EDIT_POST_BY_ID = 'session/EDIT_POST_BY_ID';
const DELETE_POST_BY_ID = 'session/DELETE_POST_BY_ID';

const loadAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

const LoadPostById = (singlePost) => ({
    type: GET_POST_BY_ID,
    payload: singlePost
});

const EditPostById = (updatedPost) => ({
    type: EDIT_POST_BY_ID,
    payload: updatedPost
});

const CreateNewPost = (newPost) => ({
    type: ADD_NEW_POST,
    payload: newPost
});

const DeletePostById = (deletedPost) => ({
    type: DELETE_POST_BY_ID,
    payload: deletePost
});

const initialState = { allPosts: [], byId: {}, singlePost: {} };


export const getPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts`);
        if (response.ok) {
            const posts = await response.json();
            dispatch(loadAllPosts(posts.posts));
            return posts;
        }
    } catch (error) {
        throw error;
    }
}

export const getSinglePost = (postId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`);
        if (response.ok) {
            const singlePost = await response.json();
            dispatch(LoadPostById(singlePost));
            return singlePost;
        }
    } catch (error) {
        throw error;
    }
}

export const editPost = (postId, newPostData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPostData)
        });
        if (response.ok) {
            const updatedPost = await response.json();
            dispatch(EditPostById(updatedPost));
            dispatch(getPosts())
            return updatedPost;
        }
    } catch (error) {
        throw error;
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const deletedPost = await response.json();
            dispatch(DeletePostById(deletedPost));
            dispatch(getPosts())
            return deletedPost;
        }
    } catch (error) {
        throw error;
    }
};

export const createPost = (postData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        });
        if (response.ok) {
            const newPost = await response.json();
            dispatch(CreateNewPost(newPost));
            dispatch(getPosts());
            return newPost;
        }
    } catch (error) {
        throw error;
    }
}

function postReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_POSTS:
            if (action.payload) {
                return {
                    ...state,
                    allPosts: action.payload,
                    byId: action.payload.reduce((acc, post) => {
                        acc[post.id] = post;
                        return acc;
                    }, {})
                };
            } else {
                return state;
            }
        case GET_POST_BY_ID:
            return { ...state, singlePost: action.payload };
        case EDIT_POST_BY_ID:
            newState = {
                ...state,
                allPosts: state.allPosts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            };
            return newState;
        case ADD_NEW_POST:
            newState = { ...state };
            return newState;
        case DELETE_POST_BY_ID:
            newState = { ...state };
        default:
            return state;
    }
}

export default postReducer;
