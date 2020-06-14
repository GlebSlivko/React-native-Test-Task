export const initialState = {
    categories: null,
    filters:null,
};

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_CATEGORY': {
            return {...state,
                categories: action.payload};
        }
        case 'FETCH_CATEGORY_FAIL': {
            return {...state};
        }
        case 'SEND_FILTER': {
            return {...state,
                filters: action.payload};
        }

        default: {
            return state
        }
    }
}
