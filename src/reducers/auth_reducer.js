export default (state = false, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return action.payload;
        default:
            return state;
    }
}
