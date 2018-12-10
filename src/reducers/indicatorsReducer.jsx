export default function (state = ['choose'], action) {

    switch(action.type) {
        case 'LOAD_INDICATORS':
            return action.payload
    }
    return state;
}
