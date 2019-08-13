const initialState = {
    displaySize: 550
};
export default function (state = initialState, action, dispatch) {
    switch (action.type) {
        case "CHANGE_DISPLAY_SIZE":
            return {
                ...state,
                displaySize: action.payload
            };
        default:
            return state;
    }
}
