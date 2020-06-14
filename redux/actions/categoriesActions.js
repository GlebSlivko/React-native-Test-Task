export function fetchCategories() {
    return function (dispatch) {
        dispatch(requestCategory())
        return fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                dispatch(receiveCategory(json.drinks))
                // console.log("json",json)
            )
    }
}

export function fetchCurrentFilter(filter) {
    return function (dispatch) {
        dispatch(sendFilter(filter))
    }
}

export const SEND_FILTER = 'SEND_FILTER';

function sendFilter(filter) {
    return {
        type: SEND_FILTER,
        payload: filter,
    }
}


export const REQUEST_CATEGORY = 'REQUEST_CATEGORY';

function requestCategory() {
    return {
        type: REQUEST_CATEGORY,
    }
}

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';

function receiveCategory(json) {
    return {
        type: RECEIVE_CATEGORY,
        payload: json,
    }
}


