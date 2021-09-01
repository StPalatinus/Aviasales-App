const initialState = {
  allFiltersFlag: false,
  withoutChange: false,
  oneChange: false,
  twoChanges: false,
  threeChanges: false,
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
    case "toggleAllFlags":
      nextState.allFiltersFlag = !nextState.allFiltersFlag;
      nextState.withoutChange = nextState.allFiltersFlag;
      nextState.oneChange = nextState.allFiltersFlag;
      nextState.twoChanges = nextState.allFiltersFlag;
      nextState.threeChanges = nextState.allFiltersFlag;
      return nextState;

    case "toggleWithoutChange":
      optionalUncheckAllFiltersFlag(nextState);
      nextState.withoutChange = !nextState.withoutChange;
      checkAllInclude(nextState);
      return nextState;

    case "toggleOneChange":
      optionalUncheckAllFiltersFlag(nextState);
      nextState.oneChange = !nextState.oneChange;
      checkAllInclude(nextState);
      return nextState;

    case "toggleTwoChanges":
      optionalUncheckAllFiltersFlag(nextState);
      nextState.twoChanges = !nextState.twoChanges;
      checkAllInclude(nextState);
      return nextState;

    case "toggleThreeChanges":
      optionalUncheckAllFiltersFlag(nextState);
      nextState.threeChanges = !nextState.threeChanges;
      checkAllInclude(nextState);
      return nextState;

    case "getTicketsStarted":
      // nextState.isLoading = true;
      return nextState;

    default:
      return state;
  }
};

export default transferFlagsReducer;
