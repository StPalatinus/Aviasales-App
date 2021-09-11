import { filtersReducerOptions as options } from "../../assets/reducers-options/reducers-options";

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
    case options.selectCheapest:
      uncheckAll(nextState);
      nextState.choseCheapest = !state.choseCheapest;
      return nextState;

    case options.selectFastest:
      uncheckAll(nextState);
      nextState.choseFastest = !state.choseFastest;
      return nextState;

    case options.selectOptimal:
      uncheckAll(nextState);
      nextState.choseOptimal = !state.choseOptimal;
      return nextState;

    default:
      return state;
  }
};

export default filtersReducer;
