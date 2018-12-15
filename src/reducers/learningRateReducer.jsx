export default function (state = 0.1, action) {

    switch(action.type) {
        case 'SET_LEARNING_RATE':
            return action.payload
    }
    return state;
}
