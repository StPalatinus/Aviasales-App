const initialState = {
  isLoading: false,
  visibleTickets: 5,
  tickets: [],
  error: false,
};

const mainReducer = (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    // case "checkisLoadingStatus"
    //   return state.isLoading;

    case "getTicketsStarted":
      nextState.isLoading = true;
      return nextState;

    case "getTicketsSuccess": {
      nextState.tickets = action.payload;
      nextState.isLoading = false;
      nextState.error = false;
      return nextState;
    }

    case "getTicketsError":
      nextState.isLoading = false;
      nextState.error = action.payload;
      return nextState;

    case "getTicketsFromServer":
      return nextState;

    case "showFiveMoreTickets": {
      nextState.visibleTickets += 5;
      return nextState;
    }

    default:
      return state;
  }
};

export default mainReducer;
