import {csrfFetch} from "./csrf";
// Define Action Types as Constants

const SET_MYEVENTS = 'myEvents/SET_MYEVENTS';
const REMOVE_MYEVENTS = 'myEvents/REMOVE_MYEVENTS';
const ADD_MYEVENTS = 'myEvents/ADD_MYEVENTS';

// Define Action Creators
const setMyEvents = (events) => ({
    type: SET_MYEVENTS,
    events,
});

const removeMyEvents = (events) => ({
    type: REMOVE_MYEVENTS,
    events,
})

const addMyEvents = (events) =>({
    type: ADD_MYEVENTS,
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

export const creatMyEvents = (payload,userId) => async (dispatch) =>{

    const response = await csrfFetch(`/api/events/myEventUpload/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if(response.ok){
      const events = await response.json();
      console.log("creatMyEvents: " + events)
      console.log(events)
      dispatch(addMyEvents(events))
      return events;
    } else {
        console.log("creatMyEvents no respond")
    }

  }

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
      case ADD_MYEVENTS:{
          return {
              ...state,
              [action.events.id]: action.events,
          }

        // console.log("action.events++++++++++", action.events.event);
        // const newState = {
        //     ...state,
        //     ...action.events,
        //     ...action.events.event,
        // }
        // console.log("newState++++++++++", newState);
        // return newState;


      }
      default:
        return state;
    }
};

export default myEventsReducer;
