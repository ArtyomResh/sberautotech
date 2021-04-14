# Сайт компании SberAutoTech

## Для установки необходимо

* `git clone ssh://git@atlas.swec.sbercloud.ru:7999/fe/sberautotech.ru.git`
* `git clone https://atlas.swec.sbercloud.ru/bitbucket/scm/fe/sberautotech.ru.git`

Установить корневые зависимости
`yarn`

Установить зависимости backend
`cd backend && yarn`

Установить зависимости frontend
`cd frontend && yarn`

## Запуск без использования локального сервера
Необходимо в директории frontend создать файл `.env`, по аналогии с файлом `.env.example` и изменить переменную окружения API_URL на адрес удаленного сервера.
Далее необходимо запустить локальный dev-сервер
`cd frontend && yarn develop`

## Запуск c использованием локального сервера
Для использования локального сервера необходимо запустить базу данных PostreSQL. Для этого рекомендуется использовать Docker.
`docker run -d -e POSTGRES_USER=user -e POSTGRES_PASSWORD=admin --name sberautotech -p 5432:5432  --restart=always postgres`

Далее необходимо убедиться, что в директории frontend не создан файл `.env`, или что в данном файле константа API_URL содержит адрес локального сервера.

Непосредственно запуск осуществляется с помощью вызова из корневой директории проекта команды
`yarn develop`

Если по какой-то причине необходимо использовать бэкенд с удаленной базой данных, то cконфигурировать подключение можно в файле `backend/config/database.js`
