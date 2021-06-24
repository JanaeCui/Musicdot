import {csrfFetch} from "./csrf";
// Define Action Types as Constants
const SET_BOOKMARKS = 'bookmarks/SET_BOOKMARKS';
const ADD_BOOKMARKS = 'bookmarks/ADD_BOOKMARKS';


// Define Action Creators
const setBookmarks = (bookmarks) => ({
    type: SET_BOOKMARKS,
    bookmarks,
});

const createBookmarks = (bookmarks) => ({
    type: ADD_BOOKMARKS,
    bookmarks,
})

// Define Thunk Creators
export const getBookmarks = () => async (dispatch) => {
    const res = await csrfFetch('/api/bookmarks');
    const bookmarks = await res.json();
    dispatch(setBookmarks(bookmarks));
};

export const addBookmarks = (payload, eventId) => async dispatch =>{
    const response = await csrfFetch(`/api/events/${eventId}/bookmarks`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const bookmarks = await response.json();
        dispatch(createBookmarks(bookmarks))
        return bookmarks;
    }
}




// Define an initial state
const initialState = {
    list: [],
    types: []
};

const sortList = (list) => {
    return list.sort((bookmarkA, bookmarkB) => {
      return bookmarkA.no - bookmarkB.no;
    }).map((bookmark) => bookmark.id);
  };

// Define a reducer
const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_BOOKMARKS:
        // const allBookmarks = {};
        // action.bookmarks.forEach((bookmark) => {
        //   allBookmarks[bookmark.id] = bookmark;
        // });

        // return {
        //   ...state,
        //   ...allBookmarks,
        // };
        return action.bookmarks;
      case ADD_BOOKMARKS:{
        // if(!state[action.bookmark.id]){
            // const newState ={
            //     ...state,
            //     [action.bookmarks.id]: action.bookmarks
            // };
            // const bookmarkList = newState.list.map(id => newState[id]);
            // bookmarkList.push(action.bookmarks);
            // newState.list = sortList(bookmarkList);
            // return bookmarkList;
            return {
                ...state,
                [action.bookmarks.id]: action.bookmarks
            }
        // }
        // return action.bookmarks;
      }
      default:
        return state;
    }
};

// Export the reducer
export default bookmarksReducer;
