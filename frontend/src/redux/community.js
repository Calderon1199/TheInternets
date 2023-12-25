import { csrfFetch } from './csrf';

//Constants
const ADD_NEW_COMMUNITY = 'session/ADD_NEW_COMMUNITY';
const GET_ALL_COMMUNITIES = 'session/GET_ALL_COMMUNITIES';
const GET_USER_COMMUNITIES = 'session/GET_USER_COMMUNITIES';
const GET_SINGLE_COMMUNITY = 'session/GET_SINGLE_COMMUNITY';
const EDIT_COMMUNITY = 'session/EDIT_COMMUNITY';
const DELETE_COMMUNITY = 'session/DELETE_COMMUNITY';

const loadAllCommunities = (communities) => ({
    type: GET_ALL_COMMUNITIES,
    payload: communities
});

const loadSingleCommunity = (community) => ({
    type: GET_SINGLE_COMMUNITY,
    payload: community
});

const loadUserCommunities = (userCommunities) => ({
    type: GET_USER_COMMUNITIES,
    payload: userCommunities
});

const editCommunityById = (updatedCommunity) => ({
    type: EDIT_COMMUNITY,
    payload: updatedCommunity
});

const createNewCommunity = (newCommunity) => ({
    type: ADD_NEW_COMMUNITY,
    payload: newCommunity
});

const deleteCommunityById = (deletedCommunityId) => ({
    type: DELETE_COMMUNITY,
    payload: deletedCommunityId
});

const initialState = { allCommunities: [], byId: {}, singleCommunity: {}, userCommunities: [] };


export const getCommunities = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities`);
        if (response.ok) {
            const communities = await response.json();
            dispatch(loadAllCommunities(communities.Communities));
            return communities;
        }
    } catch (error) {
        throw error;
    }
}

export const getUserCommunities = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities/user`);
        if (response.ok) {
            const communities = await response.json();
            dispatch(loadUserCommunities(communities.Communities));
            return communities
        }
    } catch (error) {
        throw error;
    }
}

export const getSingleCommunity = (communityId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities/${communityId}`);
        if (response.ok) {
            const singleCommunity = await response.json();
            dispatch(loadSingleCommunity(singleCommunity));
            return singleCommunity;
        }
    } catch (error) {
        throw error;
    }
}

export const editCommunity = (communityId, updatedCommunityData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities/${communityId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCommunityData)
        });
        if (response.ok) {
            const updatedCommunity = await response.json();
            dispatch(editCommunityById(updatedCommunity));
            return updatedCommunity;
        }
    } catch (error) {
        throw error;
    }
}

// export const deleteComment = (commentId) => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/comments/${commentId}`, {
//             method: "DELETE",
//         });
//         if (response.ok) {
//             const deletedComment = await response.json();
//             dispatch(DeleteCommentById(+commentId));
//             return deletedComment;
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// export const createComment = (postId, commentData) => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/comments/${postId}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(commentData)
//         });
//         if (response.ok) {
//             const newComment = await response.json();
//             dispatch(CreateNewComment(newComment));
//             return newComment;
//         }
//     } catch (error) {
//         throw error;
//     }
// }

function communityReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMUNITIES:
            if (action.payload) {
                newState =  {
                    ...state,
                    allCommunities: action.payload,
                    byId: action.payload.reduce((acc, community) => {
                        acc[community.id] = community;
                        return acc;
                    }, {})
                };
                return newState;
            } else {
                return state;
            }
        case GET_USER_COMMUNITIES:
            if (action.payload) {
                newState = {
                    ...state,
                    userCommunities : action.payload.reduce((acc, community) => {
                        acc[community.id] = community;
                        return acc;
                    }, {})
                };
                return newState;
            } else {
                return state;
            }
        case GET_SINGLE_COMMUNITY:
            if (action.payload) {
                newState = {
                    ...state,
                    singleCommunity: {
                        [action.payload.id] : action.payload
                    }
                }
                return newState;
            } else {
                return state
            }
        case EDIT_COMMUNITY:
            if (action.payload) {
                newState = {
                    ...state,
                    allCommunities: state.allCommunities.map((community) =>
                    community.id === action.payload.id ? action.payload : community
                    ),
                    byId: {
                        ...state.byId,
                        [action.payload.id]: action.payload
                    },
                    singleCommunity: {
                        [action.payload.id]: action.payload
                    },
                }
            }
        default:
            return state;
    }
}

export default communityReducer;
