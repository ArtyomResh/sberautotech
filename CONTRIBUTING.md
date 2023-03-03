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


##JS

### Регидрация верстки на клиенте

У Gastby специфичный алгоритм регидрации react-компонентов на клиенте. В связи с чем могут возникать проблемы, когда контент серверного и клиентского рендеринга не совпадают.
Например:

<code>
// .../Component.js

const isMobile = checkIsMobileByScreenSize();

const TheComponent = () => (
    <div class="a">
        {isMobile ? 'mobile text' : 'desktop text'}
    </div>
)

</code>

После загрузки и отображени страницы в браузере мобильного устройства мы увидим текст "desktop text".
Так происходит потому, что во время серверного рендеринга флаг `isMobile` был false (сервер не знает размеры экрана). А дальше вступают в бой особенности алгоритма регидрации Gatsby, которые считают, что нода корневого div-элемента никак не изменилась и её не нужно ререндерить.

Причем эта проблема проявляется только при production-сборке, т.к. в develop-режиме механизм регидрации отличается.

Подробнее можно почитать о проблеме в этой статье.
https://www.joshwcomeau.com/react/the-perils-of-rehydration/

В качестве "быстрого" решения можно использовать такой хак c аттрибутом 'key' :

<code>
// .../Component.js

const isMobile = checkIsMobileByScreenSize();

const TheComponent = () => (
    <div class="a" key={`${isMobile}`}>
        {isMobile ? 'mobile text' : 'desktop text'}
    </div>
)

</code>
