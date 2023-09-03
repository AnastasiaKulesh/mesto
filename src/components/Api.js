// Класс для работы с API

export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    // Метод разбора json запроса
    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`STATUS: ${res.status} ${res.message}`);
    }

    // Метод получения с сервера данных пользователя 
    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._handleResponse(res));
    }

    // Метод записи данных пользователя на сервер
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
    
    // Метод записи аватара пользователя на сервер
    patchEditAvatar({avatar}) {
        console.log(avatar);
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then((res) => this._handleResponse(res));
    }

    // Метод получения с сервера данных карточек 
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._handleResponse(res));
    }

    // Метод добавления на сервер данных новой карточки 
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

    // Метод удаления карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
    })
        .then((res) => this._handleResponse(res));
    }

    // Метод записи на сервер изменения лайка
    switchLikeCard(cardId, likes, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
            body: JSON.stringify({
                likes
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