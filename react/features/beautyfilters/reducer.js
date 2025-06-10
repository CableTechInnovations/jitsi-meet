export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_BEAUTY':
      return { ...state, enabled: !state.enabled };
    default:
      return state;
  }
};