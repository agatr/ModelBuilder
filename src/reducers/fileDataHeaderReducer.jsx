export default function (state = ['upload file'], action) {

    switch(action.type) {
        case 'SET_HEADER':
            return action.payload
    }
    return state;
}
