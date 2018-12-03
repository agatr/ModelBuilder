export default function (state = 30, action) {

    switch(action.type) {
        case 'SET_ITERATIONS':
            return action.payload
    }
    return state;
}
