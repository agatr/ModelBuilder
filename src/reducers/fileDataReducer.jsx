export default function (state = ['initial1','initial2'], action) {

    switch(action.type) {
        case 'STORE_DATA':
            return action.payload
    }
    return state;
}
