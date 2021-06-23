// Define Action Types as Constants
const SET_BOOKMARKS = 'bookmarks/SET_BOOKMARKS';

// Define Action Creators
const setBookmarks = (bookmarks) => ({
    type: SET_BOOKMARKS,
    bookmarks,
});

// Define Thunk Creators
export const getBookmarks = () => async (dispatch) => {
    const res = await fetch('/api/bookmarks');
    const bookmarks = await res.json();
    dispatch(setBookmarks(bookmarks));
};

// Define an initial state
const initialState = {};

// Define a reducer
const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_BOOKMARKS:
        const allBookmarks = {};
        action.bookmarks.forEach((bookmark) => {
          allBookmarks[bookmark.id] = bookmark;
        });

        return {
          ...state,
          ...allBookmarks,
        };
      default:
        return state;
    }
};

// Export the reducer
export default bookmarksReducer;
