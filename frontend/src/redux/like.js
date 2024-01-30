import { csrfFetch } from './csrf';

//Constants
const ADD_LIKE = 'session/ADD_LIKE';
const GET_ALL_USER_LIKES = 'session/GET_ALL_USER_LIKES';
const GET_USER_LIKES = 'session/GET_USER_LIKES';
const GET_USER_DISLIKES = 'session/GET_USER_DISLIKES';
const EDIT_LIKE = 'session/EDIT_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';



const loadUserLikes = (userLikes) => ({
    type: GET_USER_LIKES,
    payload: userLikes
});

const loadAllUserLikes = (userLikes) => ({
    type: GET_ALL_USER_LIKES,
    payload: userLikes
});

const loadUserDislikes = (userDislikes) => ({
    type: GET_USER_DISLIKES,
    payload: userDislikes
});

const editLike = (updatedLike) => ({
    type: EDIT_LIKE,
    payload: updatedLike
});

const createNewLike = (newLike) => ({
    type: ADD_LIKE,
    payload: newLike
});

const deleteLike = (deletedLike) => ({
    type: DELETE_LIKE,
    payload: deletedLike
});

const initialState = { allUserLikes: {}, userLikes: [], userDislikes: [], postLike: {} };


export const getUserLikes = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes/user/likes`);
        if (response.ok) {
            const likes = await response.json();
            dispatch(loadUserLikes(likes.Likes));
            return likes;
        }
    } catch (error) {
        throw error;
    }
}

export const getAllUserLikes = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes/user/all-likes`);
        if (response.ok) {
            const likes = await response.json();
            dispatch(loadAllUserLikes(likes.Likes));
            return likes;
        }
    } catch (error) {
        throw error;
    }
}


export const getUserDislikes = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes/user/dislikes`);
        if (response.ok) {
            const dislikes = await response.json();
            dispatch(loadUserDislikes(dislikes.Dislikes));
            return dislikes
        }
    } catch (error) {
        throw error;
    }
}


export const editUserLike = (likeId, isLiked) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes/${likeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(isLiked)
        });
        if (response.ok) {
            const updatedLike = await response.json();
            dispatch(editLike(updatedLike));
            return updatedLike;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteUserLike = (likeId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes/${likeId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const deletedLike = await response.json();
            dispatch(deleteLike(+likeId));
            return deletedLike;
        }
    } catch (error) {
        throw error;
    }
};

export const createLike = (newLikeData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/likes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLikeData)
        });
        if (response.ok) {
            const newLike = await response.json();
            dispatch(createNewLike(newLike));
            return newLike;
        }
    } catch (error) {
        throw error;
    }
}

function likeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_LIKES:
            if (action.payload) {
                newState = {
                    ...state,
                    userLikes: action.payload,
                };
                return newState;
            } else {
                return state;
            }
        case GET_USER_DISLIKES:
            if (action.payload) {
                newState = {
                    ...state,
                    userDislikes: action.payload,
                };
                return newState;
            } else {
                return state;
            }
        case GET_ALL_USER_LIKES:
            if (action.payload) {
                newState = {
                    ...state,
                    allUserLikes: action.payload.reduce((acc, like) => {
                        acc[like.id] = like;
                        return acc;
                    }, {})
                }
                return newState;
            }
        case EDIT_LIKE:
            if (action.payload) {
                newState = {
                    ...state,
                    userLikes: state.userLikes.map((like) =>
                    like.id === action.payload.id ? action.payload : like
                    ),
                    userDislikes: state.userDislikes.map((dislike) =>
                       dislike.id === action.payload.id ? action.payload : dislike
                    )
                }
                return newState;
            } else {
                return state
            }
        case ADD_LIKE:
            if (action.payload) {
                newState = {
                    ...state,
                    userLikes: action.payload.isLiked ? [...state.userLikes, action.payload] : state.userLikes,
                    userDislikes: !action.payload.isLiked ? [...state.userDislikes, action.payload] : state.userDislikes,
                };
                return newState;
            } else {
                return state;
        }
        case DELETE_LIKE:
            if (action.payload) {
                newState = {
                    ...state,
                    userLikes: state.userLikes.filter(
                        (like) => like.id !== action.payload
                    ),
                    userDislikes: state.userDislikes.filter(
                        (dislike) => dislike.id !== action.payload
                    ),
                    allUserLikes: {
                        ...state.allUserLikes,
                    },
                }
                delete newState.allUserLikes[action.payload]
                return newState;
            } else {
                return state;
            }
        default:
            return state;
    }
}

export default likeReducer;
