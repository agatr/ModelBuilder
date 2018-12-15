export default function (state = 1, action) {

    switch(action.type) {
        case 'SET_A':
            return action.payload
    }
    return state;
}
