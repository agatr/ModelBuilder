export default function (state = "", action) {

    switch(action.type) {
        case 'CHOOSE_SOURCE':
            return action.payload
    }

    return state;
}
