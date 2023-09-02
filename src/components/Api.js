// Класс для работы с API

export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`STATUS: ${res.status} ${res.message}`);
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._handleResponse(res));
    }

    patchUser({name, info}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: info
            })
        })
            .then((res) => this._handleResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._handleResponse(res));
    }

    postNewCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => this._handleResponse(res));
    }

}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
        authorization: 'b407476d-bacf-462b-96a7-4f805139a2ff',
        'Content-Type': 'application/json'
    }
});