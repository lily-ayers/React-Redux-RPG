const initialState = {
    tiles: [],
}

const mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TILES':
            return {
                ...action.payload,
            }
            break
        default:
            return state
    }
}

export default mapReducer