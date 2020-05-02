export function setDataReducer (state, action, type, clearType) {
    switch (action.type) {
        case type:
            return action.payload;
        case (clearType ? clearType : "NO_CLEAR_TYPE"):
            return null;
        default:
            return state;
    }
}