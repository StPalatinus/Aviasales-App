import { transferFlagsReducerOptions as options } from "../../assets/reducers-options/reducers-options";

const initialState = {
  allFiltersFlag: true,
  withoutChange: true,
  oneChange: true,
  twoChanges: true,
  threeChanges: true,
};

const transferFlagsReducer = (state = initialState, action) => {
  const nextState = { ...state };

  const optionalUncheckAllFiltersFlag = (changedState) => {
    if (state.allFiltersFlag === true) {
      changedState.allFiltersFlag = false;
    }
  };

  const checkAllInclude = (changedState) => {
    if (
      changedState.withoutChange &&
      changedState.oneChange &&
      changedState.twoChanges &&
      changedState.threeChanges
    ) {
      changedState.allFiltersFlag = true;
    }
    return changedState;
  };

  switch (action.type) {
    case options.toggleAllFlags:
      nextState.allFiltersFlag = !nextState.allFiltersFlag;
      nextState.withoutChange = nextState.allFiltersFlag;
      nextState.oneChange = nextState.allFiltersFlag;
      nextState.twoChanges = nextState.allFiltersFlag;
      nextState.threeChanges = nextState.allFiltersFlag;
      return nextState;

    case options.toggleWithoutChange:
      optionalUncheckAllFiltersFlag(nextState);
      nextState.withoutChange = !nextState.withoutChange;
      checkAllInclude(nextState);
      return nextState;

    case options.toggleOneChange:
      optionalUncheckAllFiltersFlag(nextState);
      nextState.oneChange = !nextState.oneChange;
      checkAllInclude(nextState);
      return nextState;

    case options.toggleTwoChanges:
      optionalUncheckAllFiltersFlag(nextState);
      nextState.twoChanges = !nextState.twoChanges;
      checkAllInclude(nextState);
      return nextState;

    case options.toggleThreeChanges:
      optionalUncheckAllFiltersFlag(nextState);
      nextState.threeChanges = !nextState.threeChanges;
      checkAllInclude(nextState);
      return nextState;

    case options.getTicketsStarted:
      return nextState;

    default:
      return state;
  }
};

export default transferFlagsReducer;
