export default function (state = '', action) {

    switch(action.type) {
        case 'SET_C':
            return action.payload
    }
    return state;
}
