export default function (state = "Choose X", action) {

    switch(action.type) {
        case 'CHOOSE_X':
            return action.payload
    }
    return state;
}
