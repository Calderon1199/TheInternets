import { csrfFetch } from './csrf';

//Constants
const ADD_NEW_COMMENT = 'session/ADD_NEW_COMMENT';
const GET_ALL_COMMENTS = 'session/GET_ALL_COMMENTS';
const GET_USER_COMMENTS = 'session/GET_USER_COMMENTS';
const EDIT_COMMENT_BY_ID = 'session/EDIT_COMMENT_BY_ID';
const DELETE_COMMENT_BY_ID = 'session/DELETE_COMMENT_BY_ID';

const loadAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
});

const LoadCommentByUser = (userComments) => ({
    type: GET_USER_COMMENTS,
    payload: userComments
});

const EditCommentById = (updatedComment) => ({
    type: EDIT_COMMENT_BY_ID,
    payload: updatedComment
});

const CreateNewComment = (newComment) => ({
    type: ADD_NEW_COMMENT,
    payload: newComment
});

const DeleteCommentById = (deletedComment) => ({
    type: DELETE_COMMENT_BY_ID,
    payload: deletedComment
});

const initialState = { allComments: [], byId: {} };


export const getComments = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments`);
        if (response.ok) {
            const comments = await response.json();
            dispatch(loadAllComments(comments.Comments));
            return comments;
        }
    } catch (error) {
        throw error;
    }
}

export const getUserComments = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/user`);
        if (response.ok) {
            const userComments = await response.json();
            dispatch(LoadCommentByUser(userComments.Comments));
            return userComments;
        }
    } catch (error) {
        throw error;
    }
}

export const editComment = (commentId, updatedCommentData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCommentData)
        });
        if (response.ok) {
            const updatedComment = await response.json();
            dispatch(EditCommentById(updatedComment));
            return updatedComment;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const deletedComment = await response.json();
            dispatch(DeleteCommentById(deletedComment));
            dispatch(getComments())
            return deleteComment;
        }
    } catch (error) {
        throw error;
    }
};

export const createComment = (postId, commentData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${postId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        });
        if (response.ok) {
            const newComment = await response.json();
            dispatch(CreateNewComment(newComment));
            return newComment;
        }
    } catch (error) {
        throw error;
    }
}

function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS:
            if (action.payload) {
                return {
                    ...state,
                    allComments: action.payload,
                    byId: action.payload.reduce((acc, comment) => {
                        acc[comment.id] = comment;
                        return acc;
                    }, {})
                };
            } else {
                return state;
            }
        case GET_USER_COMMENTS:
            if (action.payload) {
                return {
                    ...state,
                    allUserComments: action.payload,
                    userCommentsById: action.payload.reduce((acc, post) => {
                        acc[post.id] = post;
                        return acc;
                    }, {})
                };
            } else {
                return state;
            }
        case EDIT_COMMENT_BY_ID:
            newState = {
                ...state,
                allComments: state.allComments.map((comment) =>
                    comment.id === action.payload.id ? action.payload : comment
                ),
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            };
            return newState;
        case ADD_NEW_COMMENT:
            newState = {
                ...state,
                allComments: [...state.allComments, action.payload],
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            };
            return newState;
        case DELETE_COMMENT_BY_ID:
            newState = { ...state };
        default:
            return state;
    }
}

export default commentReducer;
