# Проект React: "Stellar Burger"

## Описание
Stellar Burgers — приложением космической бургерной.

## Технологии

* Проект создан на основе React
* Используются stateful функциональные компоненты
* Используются Хуки
* Данные об ингридиентах получены с сервера
* Присутствуют modal окна: данные об ингридиенте и инентификатор(пока с тестовыми данными)
* Проводится проверка типов PropTypes
* Создано и настроено Redux хранилище, ключевые состояния хранятся в нём
* Запросы к серверу проходят через усилители на основе redux-thunk
* При помощи react-dnd реализованы:
    * возможность добавления ингридиентов из списка в состав бургера
    * возможность сортировки ингридиентов внутри состава бургера
* Реализован роутинг посредством библиотеки React Router
* Присутствуют регистрация и авторизация
* Реализован личный кабинет
* Защищенные марсшруты
* Создана лента заказов
* Настроено WebSocket соединение на страницах ленты заказов и заказов пользователя
* Произведен рефакторинг с приминением TypeScript

## Ссылка
[Проект](https://grezare.github.io/react-burger/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
