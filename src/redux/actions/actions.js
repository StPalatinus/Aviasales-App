import aviApiService from "../../services";
// import actionsTypes from "../actions-types";
import actionsTypes from "../actions-types";

const getFirstTicketsPack = async (ID) => {
  const getFirstPack = async (SID = ID) => {
    let ticketsPack = await aviApiService.getTickets(ID);

    if (ticketsPack === undefined) {
      ticketsPack = await getFirstPack(SID);
    }

    return ticketsPack;
  };

  const tickets = getFirstPack(ID);
  return tickets;
};

const getRemainingTickets = async (ID) => {
  const ticketsBundle = [];

  const getCurrentPack = async (SID = ID) => {
    const ticketsPack = await aviApiService.getTickets(ID);

    if (ticketsPack === undefined) {
      await getCurrentPack(SID);
      return [];
    }

    if (ticketsPack.stop === false) {
      ticketsBundle.push(...ticketsPack.tickets);
      await getCurrentPack(SID);
    }
    if (ticketsPack.stop === true && ticketsPack.tickets.length > 0) {
      ticketsBundle.push(...ticketsPack.tickets);
      return ticketsPack;
    }

    return ticketsPack;
  };

  await getCurrentPack(ID);
  return ticketsBundle;
};

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
export const getFirstTicketsPackSuccess = (payload) => ({
  type: actionsTypes.getFirstTicketsPackSuccess,
  payload,
});
export const getOtherTicketsSuccess = (payload) => ({
  type: actionsTypes.getOtherTicketsSuccess,
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
  try {
    dispatch(getTicketsStarted());

    const searchId = await aviApiService.getSearchID();
    const firstTicketsPack = await getFirstTicketsPack(searchId);
    dispatch(getFirstTicketsPackSuccess(firstTicketsPack.tickets));

    const remainingTickets = await getRemainingTickets(searchId);
    dispatch(getOtherTicketsSuccess(remainingTickets));
  } catch (err) {
    dispatch(getTicketsError(err));
  }
};
