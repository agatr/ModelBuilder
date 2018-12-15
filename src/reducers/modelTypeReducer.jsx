export default function (state = "Linear Regression", action) {

    switch(action.type) {
        case 'CHOOSE_TYPE':
            return action.payload
    }

    return state;
}
