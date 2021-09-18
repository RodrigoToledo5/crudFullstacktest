import API from '../.env'
export const LOG = 'LOG';
export const GET_POST = "GET_POST"
export const SEND_POST = "SEND_POST"
export const DES_LOG = "DES_LOG"
export const DELETE_POST = "DELETE_POST"


export const login = (email, password) => (dispatch) => {
    fetch(`http://localhost:3001/auth/?email=${email}&password=${password}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: 'LOG',
                payload: json
            });
        });
}
export const getPost = (token) => (dispatch) => {
    fetch(`http://localhost:3001/post/?token=${token}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: 'GET_POST',
                payload: json
            });

        });
}
export const desLog = () => (dispatch) => {
    dispatch({
        type: 'DES_LOG',
        payload: ''
    });
}
export const sendPost = (title, subtitle, description, token, id) => (dispatch) => {
    if (id) {
        let data = JSON.stringify({ title, subtitle, description, token, id })
        fetch(`http://localhost:3001/post`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: data
        }
        ).then(response => response.json()
        ).then(json => {
            dispatch({
                type: 'SEND_POST',
                payload: json
            });
        });
    }
    else {
        let data = JSON.stringify({ title, subtitle, description, token })
        fetch(`http://localhost:3001/post`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: data
        }
        ).then(response => response.json()
        ).then(json => {
            dispatch({
                type: 'SEND_POST',
                payload: json
            });
        });
    }
}
export const deletePost = (id,token) => (dispatch) => {
    let data = JSON.stringify({token,id })
        fetch(`http://localhost:3001/post`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: data
        }
        ).then(response => response.json()
        ).then(json => {
            dispatch({
                type: 'DELETE_POST',
                payload: json
            });
        });
}