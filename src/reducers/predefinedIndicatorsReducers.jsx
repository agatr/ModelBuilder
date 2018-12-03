export default function (state = ["Choose indicator"], action) {

    switch(action.type) {
        case 'ADD_INDICATOR':
            return [...state, action.payload]
        case 'REMOVE_INDICATOR':
            return [...state, action.payload]
    }

    return state;
}