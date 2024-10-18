// store/spots.js
export const fetchSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");
    const data = await response.json();
    dispatch(setSpots(data.Spots));
  };
// action type
  const SET_SPOTS = "spots/setSpots";

// action creator
  export const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots,
  });

  // Reducer
  const initialState = { list: [] };

  export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_SPOTS:
        return { ...state, list: action.spots };
      default:
        return state;
    }
  }
  export const postReview = ({ spotId, review }) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to post review");
    }

    const newReview = await response.json();
    return newReview; // Return the new review to be added to the state
  };
