export default function (state = "", action) {

    switch(action.type) {
        case 'CHOOSE_X':
            return action.payload
    }

    return state;
}
