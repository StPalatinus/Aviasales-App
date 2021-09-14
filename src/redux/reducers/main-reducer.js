import { mainReducerOptions as options } from "../../assets/reducers-options/reducers-options";

const initialState = {
  isLoading: false,
  visibleTickets: 5,
  tickets: [],
  error: false,
};

const mainReducer = (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case options.getTicketsStarted:
      nextState.isLoading = true;
      return nextState;

    case options.getFirstTicketsPackSuccess: {
      nextState.tickets = action.payload;
      nextState.isLoading = false;
      nextState.error = false;
      return nextState;
    }

    case options.getOtherTicketsSuccess: {
      nextState.tickets.push(...action.payload);
      nextState.isLoading = false;
      nextState.error = false;
      return nextState;
    }

    case options.getTicketsError:
      nextState.isLoading = false;
      nextState.error = true;
      return nextState;

    case options.getTicketsFromServer:
      return nextState;

    case options.showFiveMoreTickets: {
      nextState.visibleTickets += 5;
      return nextState;
    }

    default:
      return state;
  }
};

export default mainReducer;
