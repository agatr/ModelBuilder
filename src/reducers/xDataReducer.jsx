export default function (state = [], action) {

    switch(action.type) {
        case 'SET_DATA_X':
            return action.payload
    }
    return state;
}
