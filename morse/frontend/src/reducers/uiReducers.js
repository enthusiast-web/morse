const initialState = {
    displaySize: 150
};
export default function(state = initialState, action, dispatch) {
    switch (action.type) {
      case "CHANGE_SPEED":
        console.log(action.payload);
        return {
          ...state,
          speed: action.payload
        };
      default:
        return state;
    }}