export default function (state = '', action) {

    switch(action.type) {
        case 'SET_A':
            return action.payload
    }
    return state;
}
