# COMPONENTS

В этой директории хранятся vue-компоненты, который являются как простыми UI элементами, так и элементами со сложной структурой.

***Компоненты должны хранится плоским одноуровневым списком.***

## Правила в наименовании

- Название UI компонентов должны начинаться с префикса Ui. Например, UiDropdown, UiTextField, UiButton.
- Название компонентов, которые используются только один раз на страницы должны начинаться с префикса The. Например, `TheHeader, TheSidebar, TheFooter`.
- Компоненты, которые объединены применением в одной предметной области, должны начинаться в названии именем этой области. Например, `Review, ReviewTitle, ReviewText, ReviewRating`
- К остальным компонентам, правил в наименовании нет.