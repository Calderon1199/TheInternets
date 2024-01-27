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

export const deleteCommunity = (communityId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities/${communityId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const deletedCommunity = await response.json();
            dispatch(deleteCommunityById(+communityId));
            return deletedCommunity;
        }
    } catch (error) {
        throw error;
    }
};

export const createCommunity = (communityData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/communities/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(communityData)
        });
        if (response.ok) {
            const newCommunity = await response.json();
            dispatch(createNewCommunity(newCommunity));
            return newCommunity;
        }
    } catch (error) {
        throw error;
    }
}

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
                    userCommunities : action.payload
                };
                return newState;
            } else {
                return state;
            }
        case GET_SINGLE_COMMUNITY:
            if (action.payload) {
                newState = {
                    ...state,
                    singleCommunity: action.payload
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
                    userCommunities: state.userCommunities.map((community) =>
                    community.id === action.payload.id ? action.payload : community
                    )
                }
                return newState;
            }
        case ADD_NEW_COMMUNITY:
            if (action.payload) {
                newState = {
                    ...state,
                    allCommunities: [ ...state.allCommunities, action.payload],
                    byId: {
                        ...state.byId,
                        [action.payload.id]: action.payload
                    },
                    singleCommunity: {
                        [action.payload.id]: action.payload
                    },
                    userCommunities: [...state.userCommunities, action.payload]
                }
                return newState;
            }
        case DELETE_COMMUNITY:
            if (action.payload) {
                newState = {
                    ...state,
                    allCommunities: state.allCommunities.filter(
                        (community) => community.id !== action.payload
                    ),
                    byId: { ...state.byId },
                    singleCommunity: {},
                    userCommunities: state.userCommunities.filter((community =>
                        community.id !== action.payload
                    ))
                };

                delete newState.byId[action.payload];
                delete newState.singleCommunity[action.payload];

                return newState;
            }
            return state;

        default:
            return state;
    }
}

export default communityReducer;
