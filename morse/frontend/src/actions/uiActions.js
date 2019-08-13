export const changeSpeed = value => dispatch => {
    dispatch({
      type: "CHANGE_SPEED",
      payload: value
    });
  };