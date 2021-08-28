import { INC_VAL,DEC_VAL } from "./types";


export const inc = (val) => (dispatch) => {
  
    dispatch({
      type: INC_VAL,
      payload: val,
    });
  
  };

  export const dec = (val) => (dispatch) => {
  
    dispatch({
      type: DEC_VAL,
      payload: val,
    });
  
  };