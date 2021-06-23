// Define Action Types as Constants
const SET_EVENTS = 'events/SET_EVENTS';

// Define Action Creators
const setEvents = (events) => ({
    type: SET_EVENTS,
    events,
});

// Define Thunk Creators
export const getEvents = () => async (dispatch) => {
    const res = await fetch('/api/events');
    const events = await res.json();
    dispatch(setEvents(events));
    // return events;
};

// Define an initial state
const initialState = {list: []};

// Define a reducer
const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EVENTS:
        const allEvents = {};
        action.events.forEach((event) => {
          allEvents[event.id] = event;
        });
        return {
          ...state,
          ...allEvents,
          list: action.events.map( e => e.id)
        };
      default:
        return state;
    }
};

// Export the reducer
export default eventsReducer;
