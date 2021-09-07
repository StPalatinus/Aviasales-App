const initialState = {
  choseCheapest: false,
  choseFastest: false,
  choseOptimal: false,
};

const uncheckAll = (changedState) => {
  changedState.choseCheapest = false;
  changedState.choseFastest = false;
  changedState.choseOptimal = false;
};

const filtersReducer = (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case "selectCheapest":
      uncheckAll(nextState);
      nextState.choseCheapest = !state.choseCheapest;
      return nextState;

    case "selectFastest":
      uncheckAll(nextState);
      nextState.choseFastest = !state.choseFastest;
      return nextState;

    case "selectOptimal":
      uncheckAll(nextState);
      nextState.choseOptimal = !state.choseOptimal;
      return nextState;

    default:
      return state;
  }
};

export default filtersReducer;
