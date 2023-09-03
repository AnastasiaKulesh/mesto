// Класс управления отображением информации о пользователе на странице

export default class UserInfo {
    constructor( {nameSelector, infoSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._userId = 0;
    }

    // Метод получения данных пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent,
        };
    }

    getUserAvatar() {
        return this._avatar.src;
    }

    setUserInfo({ name, info }) {
        this._name.textContent = name;
        this._info.textContent = info;
    }

    setUserAvatar(link) {
        this._avatar.src = link;
    }

    setUserId(id) { 
        this._userId = id; 
    }

    getUserId() {
        return this._userId;
    }
}