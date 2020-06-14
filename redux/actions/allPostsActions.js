export function fetchPosts(filters) {

    return function (dispatch) {
        dispatch(requestPosts(filters));
        return fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + `${filters}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                dispatch(receivePosts(json.drinks)),
            )
    }
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts() {
    return {
        type: REQUEST_POSTS,
        checkData:false
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        payload: json,
        checkData:true
    }
}
