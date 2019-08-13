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
