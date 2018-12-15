export default function (state = 0.000, action) {

    switch(action.type) {
        case 'SET_LOSS': {
            console.log('M',action.payload);
            return action.payload
        }
    }
    return state;
}
