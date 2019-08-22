// cria o contexto,a limitaçao de contexto é feita no componente Morse nos eventelisteners
export const createCTX = () => dispatch => {
  dispatch({
    type: "CREATE_CTX"
  });
};

export const defHigh = () => dispatch => {
  dispatch({
    type: "DEF_HIGH"
  });
};

export const defLow = () => dispatch => {
  dispatch({
    type: "DEF_LOW"
  });
};

export const changeSpeed = value => dispatch => {
  dispatch({
    type: "CHANGE_SPEED",
    payload: value
  });
};

export const changeGain = value => dispatch => {
  dispatch({
    type: "CHANGE_GAIN",
    payload: value
  });
};

export const playLang = () => dispatch => {
  dispatch({
    type: "PLAY_LANG"
  });
};
export const resetLista = () => dispatch => {
  dispatch({
    type: "RESET"
  });
};

export const setContext = () => dispatch => {
  dispatch({
    type: "SET_CONTEXT"
  });
};

export const setPage = value => dispatch => {
  dispatch({
    type: "SET_PAGE",
    payload: value
  });
};
