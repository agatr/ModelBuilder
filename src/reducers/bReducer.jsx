export default function (state = 0, action) {

    switch(action.type) {
        case 'SET_B':
            return action.payload
    }
    return state;
}
