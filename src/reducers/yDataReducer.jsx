export default function (state = [], action) {

    switch(action.type) {
        case 'SET_DATA_Y':
            return action.payload
    }
    return state;
}
