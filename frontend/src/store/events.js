import {csrfFetch} from "./csrf";
// Define Action Types as Constants
const SET_EVENTS = 'events/SET_EVENTS';

// Define Action Creators
const setEvents = (events) => ({
    type: SET_EVENTS,
    events,
});

// Define Thunk Creators
export const getEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');
    const events = await res.json();
    dispatch(setEvents(events));
    // return events;
};



// Define an initial state
const initialState = {
    // list: [],
    // types: []
};

// const sortList = (list) => {
//     return list.sort((bookmarkA, bookmarkB) => {
//       return bookmarkA.no - bookmarkB.no;
//     }).map((bookmark) => bookmark.id);
//   };

// Define a reducer
const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EVENTS:
        // const allEvents = {};
        // action.events.forEach((event) => {
        //   allEvents[event.id] = event;
        //   console.log("event.id", event.id);
        //   console.log("event", event);
        // });
        // console.log("action.events", action.events);
        // console.log("allEvents", allEvents);
        // return {
        //   ...state,
        //   ...allEvents,
        //   list: sortList(action.list),
        // };
        return action.events;
      default:
        return state;
    }
};

// Export the reducer
export default eventsReducer;
