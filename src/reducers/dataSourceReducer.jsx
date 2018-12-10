export default function (state = "World Bank", action) {

    switch(action.type) {
        case 'CHOOSE_SOURCE':
            return action.payload
    }

    return state;
}
