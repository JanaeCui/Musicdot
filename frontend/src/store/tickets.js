import {csrfFetch} from "./csrf";
// Define Action Types as Constants
const SET_TICKETS = 'tickets/SET_TICKETS';
const ADD_TICKETS = 'tickets/ADD_TICKETS';
const REMOVE_TICKETS = 'tickets/REMOVE_TICKETS';


// Define Action Creators
const setTickets = (tickets) => ({
    type: SET_TICKETS,
    tickets: tickets,
});

const createTickets = (tickets) => ({
    type: ADD_TICKETS,
    tickets: tickets,
})

const removeTickets = (tickets) => ({
    type: REMOVE_TICKETS,
    tickets,
})

// Define Thunk Creators
export const getTickets = (userId) => async (dispatch) => {

    const res = await csrfFetch(`/api/tickets/${userId}`);
    const tickets = await res.json();
    dispatch(setTickets(tickets));
};

export const addTickets = (payload, eventId) => async dispatch =>{
    const response = await csrfFetch(`/api/events/${eventId}/tickets`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const tickets = await response.json();
        dispatch(createTickets(tickets))
        return tickets;
    } else {
        dispatch(createTickets([]))
    }

}

export const deleteTickets = (eventId, userId) => async (dispatch) => {
    console.log("deleteTickets")
    const res = await csrfFetch(`/api/events/${eventId}/tickets`, {
        method: 'DELETE',
        body: JSON.stringify({userId})
    });
    const tickets = await res.json();
    dispatch(removeTickets(tickets));
};


// Define an initial state
const initialState = {
    list: [],
    types: []
};

// Define a reducer
const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TICKETS:
        return action.tickets;
      case ADD_TICKETS:{
            return {
                ...state,
                [action.tickets.id]: action.tickets
            }

      }
      case REMOVE_TICKETS:{
            const newState = {...state};
            delete newState[action.tickets];
            return newState;

      }
      default:
        return state;
    }
};

// Export the reducer
export default ticketsReducer;
