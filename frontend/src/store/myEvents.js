import {csrfFetch} from "./csrf";
// Define Action Types as Constants

const SET_MYEVENTS = 'myEvents/SET_MYEVENTS';
const REMOVE_MYEVENTS = 'myEvents/REMOVE_MYEVENTS';

// Define Action Creators
const setMyEvents = (events) => ({
    type: SET_MYEVENTS,
    events,
});

const removeMyEvents = (events) => ({
    type: REMOVE_MYEVENTS,
    events,
})

export const getMyEvents = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${userId}`);
    const events = await res.json();
    console.log("getMyEvents: ", events.length)
    dispatch(setMyEvents(events));
    return events;
};

export const deleteMyEvents = (eventId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}/myevents/${userId}`, {
        method: 'DELETE',
    });
    const events = await res.json();

    dispatch(removeMyEvents(events));
    return events;
};


// Define an initial state
const initialState = {
    // list: [],
    // types: []
};

const myEventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MYEVENTS:
          console.log("reducer++++++++++++", action.events);
        return action.events;
      case REMOVE_MYEVENTS:{
            const newState = {...state};
            delete newState[action.events];
            return newState;
      }
      default:
        return state;
    }
};

export default myEventsReducer;
