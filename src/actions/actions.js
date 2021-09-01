import aviApiService from "../services";

export const toggleAllFlags = () => ({ type: "toggleAllFlags" });
export const toggleWithoutChange = () => ({ type: "toggleWithoutChange" });
export const toggleOneChange = () => ({ type: "toggleOneChange" });
export const toggleTwoChanges = () => ({ type: "toggleTwoChanges" });
export const toggleThreeChanges = () => ({ type: "toggleThreeChanges" });

export const selectCheapest = () => ({ type: "selectCheapest" });
export const selectFastest = () => ({ type: "selectFastest" });
export const selectOptimal = () => ({ type: "selectOptimal" });

export const getTicketsStarted = () => ({ type: "getTicketsStarted" });
export const getTicketsSuccess = (payload) => ({
  type: "getTicketsSuccess",
  payload,
});
export const getTicketsError = (payload) => ({
  type: "getTicketsError",
  payload,
});
export const showFiveMoreTickets = () => ({ type: "showFiveMoreTickets" });
export const getTicketsFromServer = () => async (dispatch) => {
  dispatch(getTicketsStarted());

  try {
    const newTickets = await aviApiService.getTickets();
    dispatch(getTicketsSuccess(newTickets));
  } catch (err) {
    dispatch(getTicketsError(err));
  }
  // finally {}
};
