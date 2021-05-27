# Диагностика (Клиентская часть)

## Оглавление

* [Страницы](./pages/README.md)
* [Шаблоны](./layouts/README.md)
* [Компоненты](./components/README.md)
* [Композиции](./features/README.md)
* [Хранилище](./store/README.md)
* [Справочники](./dictionary/README.md)
* [Промежуточные функции](./middleware/README.md)
* [Расширения](./plugins/README.md)
* [Активы](./assets/README.md)
* [Статические файлы](./static/README.md)

## Запуск приложения для разработки

* Установить зависимости
```bash
$ yarn install
```
* Запустить свой стенд
* Создать файл .env на основе .env.example
* В нем прописать NUXT_ENV_API_URL
где заменить username на свои имя пользователя
* В нем прописать NUXT_ENV_HOST и заменить username на свои имя пользователя
* Сделать дев сборку с горячей перезагрузкой на localhost:3000
```bash
$ yarn dev
```
* Сделать дев сборку с дебагом отправки gtm событий
```bash
$ yarn debug:gtm
```

## Запуск приложения для прода

Прод билд и запуск сервера
```bash
$ yarn build
$ yarn start
```

Генерация статичного проекта
```bash
$ yarn generate
```

## Как сделать коммит
* В терминале добавить изменения через git add 
* Запустить yarn commit
```bash
$ yarn commit
```
* Пройти все шаги
