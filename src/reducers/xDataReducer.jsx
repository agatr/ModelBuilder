export default function (state = [1,2,3], action) {

    switch(action.type) {
        case 'SET_DATA_X':
            return action.payload
    }
    return state;
}
