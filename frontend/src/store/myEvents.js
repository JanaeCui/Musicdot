import {csrfFetch} from "./csrf";
// Define Action Types as Constants

const SET_MYEVENTS = 'events/SET_MYEVENTS';

// Define Action Creators
const setMyEvents = (events) => ({
    type: SET_MYEVENTS,
    events,
});


export const getMyEvents = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${userId}`);
    const events = await res.json();
    dispatch(setMyEvents(events));
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
        return action.events
        return action.events;
      default:
        return state;
    }
};

export default myEventsReducer;
