export default function (state = '', action) {

    switch(action.type) {
        case 'SET_B':
            return action.payload
    }
    return state;
}
