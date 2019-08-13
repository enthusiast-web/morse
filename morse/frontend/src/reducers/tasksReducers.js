const initialState = {
  tasks: []
};

export default function(state = initialState, action, dispatch) {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(ts => ts.id !== action.payload)
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(ts => {
          if (ts.id === action.id && ts.finished === false) {
            // ts.ongoing = ts.ongoing;
            ts = action.payload;
          }
          console.log(ts);
          return ts;
        })
      };
    case "TIMER":
      return {
        ...state,
        tasks: state.tasks.map(ts => {
          var now = new Date();
          now.setSeconds(0);
          var created_at = new Date(ts.created_at);
          created_at.setSeconds(0);

          if (
            ts.cur_time < ts.max_time &&
            !ts.finished &&
            Date.parse(created_at) <= Date.parse(now)
          ) {
            ts.cur_time = Number(ts.cur_time);
            ts.cur_time += 1;
            ts.cur_time = ts.cur_time.toFixed(3);
          } else if (ts.cur_time === ts.max_time) {
            ts.cur_time = ts.cur_time.toFixed(0);
            ts.finished = true;
          }
          if (!ts.ongoing) {
            ts.max_time += 1;
          }

          return ts;
        })
      };
    default:
      return state;
  }
}
