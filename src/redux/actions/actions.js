import aviApiService from "../../services";
import actionsTypes from "../../assets/actions-types";

export const toggleAllFlags = () => ({ type: actionsTypes.toggleAllFlags });
export const toggleWithoutChange = () => ({
  type: actionsTypes.toggleWithoutChange,
});
export const toggleOneChange = () => ({ type: actionsTypes.toggleOneChange });
export const toggleTwoChanges = () => ({ type: actionsTypes.toggleTwoChanges });
export const toggleThreeChanges = () => ({
  type: actionsTypes.toggleThreeChanges,
});

export const selectCheapest = () => ({ type: actionsTypes.selectCheapest });
export const selectFastest = () => ({ type: actionsTypes.selectFastest });
export const selectOptimal = () => ({ type: actionsTypes.selectOptimal });

export const getTicketsStarted = () => ({
  type: actionsTypes.getTicketsStarted,
});
export const getTicketsSuccess = (payload) => ({
  type: actionsTypes.getTicketsSuccess,
  payload,
});
export const getTicketsError = (payload) => ({
  type: actionsTypes.getTicketsError,
  payload,
});
export const showFiveMoreTickets = () => ({
  type: actionsTypes.showFiveMoreTickets,
});
export const getTicketsFromServer = () => async (dispatch) => {
  dispatch(getTicketsStarted());

  try {
    const newTickets = await aviApiService.getTickets();
    dispatch(getTicketsSuccess(newTickets));
  } catch (err) {
    dispatch(getTicketsError(err));
  }
};
