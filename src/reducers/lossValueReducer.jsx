export default function (state = '', action) {

    switch(action.type) {
        case 'SET_LOSS': {
            console.log('M',action.payload);
            return action.payload
        }
    }
    return state;
}
