# Frontend

## CSS

### Миксины-генераторы
Используя миксины-генераторы классов, нужно помнить о том, что стили, расширяющие этот сгенерированный класс должны следовать после самой генерации класса.

<code>
// Плохо

.my_class_name {
    width: 35px;
}

@mixin class_generator_mixin my_class_name
</code>

<code>
// Хорошо

@mixin class_generator_mixin my_class_name

.my_class_name {
    width: 35px;
}
</code>

Иначе можно столкнуться с проблемой как в задаче https://jira.csssr.io/browse/SBER-196
