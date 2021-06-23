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
    console.log("thunk", events);
    // return events;
};

// Define an initial state
const initialState = {};

// Define a reducer
const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EVENTS:
        const allEvents = {};
        // for(let event of action.events){
        //     allEvents[event.id] = event;
        // }
        // for(let i = action.events.length-1; i > 0; i-- ){
        //     let event = action.events[i];
        //     allEvents[event.id] = event;
        // }
        action.events.forEach((event) => {
          allEvents[event.id] = event;
          console.log("event.id", event.id);
          console.log("event", event);
        });
        console.log("action.events", action.events);
        console.log("allEvents", allEvents);
        return {
          ...state,
          ...allEvents,
        //   list: action.events.map( e => e.id)
        };
      default:
        return state;
    }
};

// Export the reducer
export default eventsReducer;
