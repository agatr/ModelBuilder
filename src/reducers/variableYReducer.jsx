export default function (state = "Choose Y", action) {

    switch(action.type) {
        case 'CHOOSE_Y':
            return action.payload
    }
    return state;
}
