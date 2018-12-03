export default function (state = "Choose country", action) {

    switch(action.type) {
        case 'ADD_COUNTRY':
            return action.payload
        case 'REMOVE_COUNTRY':
            return [...state, action.payload]
    }

    return state;
}
