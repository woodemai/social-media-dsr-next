# DevSphere

## Описание проекта

DevSphere - социальная сеть для разработчиков.

## Технологии

- [React 19](https://react.dev/) - JS библиотека для создание интерфейсов
- [Next.js 15](https://nextjs.org/) - React фреймворк
- [Auth.js](https://authjs.dev/) - аутентификация
- [TailwindCSS](https://tailwindcss.com/) - стили
- [shadcn.ui](https://ui.shadcn.com/) - UI компоненты
- [Prisma ORM](https://www.prisma.io/) - ORM для взаимодействие с БД
- [Vercel](https://vercel.com/) - деплой и аналитика
- [ESLint](https://eslint.org/) - линтинг
- [Prettier](https://prettier.io/) - форматирование
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - State manager
- [bun](https://bun.sh/) - JavaScript Runtime, сборщик, пакетный менеджер
- Edge runtime 

## Структура проекта

Исходный код находится в `src`.
Архитектура приложения следует методологии Feature Sliced Design.
Основные директории:

- `app` - В Next.js используется для роутинга, название папок внутри этой указывают на путь в `url`. В FSD это папка `pages` [подробнее](https://nextjs.org/docs/app/building-your-application/routing)
- `config` - Конфигурационные файлы приложения
  - `store` - Конфигурация Zustand store
  - `globals.css` - Глобальные css стили
  - `prisma.ts` - Конфигурация клиента `prisma`
  - `routes.ts` - Паттерны путей, для аутентификации.
  - `utils.ts` - Основные утилиты
- `entities` - Бизнес сущности
- `features` - Части приложения,связанные с бизнес логикой.
- `shared` - Общие элементы на странице: UI-кит, утилиты и хелперы.
  - `actions` - Серверные экшены
  - `api` - Взаимодействия с БД
  - `hooks` - React хуки
  - `schemas` - zod схемы для форм
- `widgets` - Большие элементы из которых состоит страница
- `components` - Переиспользуемые React компоненты.
- `auth.ts` и `auth.config.ts` - Конфигурация аутентификации
- `middleware.ts` - Настройки middleware

## Установка и настройка

1. Клонируйте репозиторий

```bash
  git clone https://github.com/woodemai/social-media-dsr-next.git
  cd social-media-dsr-next
```

2. Установите зависимости

```bash
  bun install
```

## Запуск приложения

#### Для запуска в режиме разработки:

```bash
  bun run dev
```

#### Для запуска в режиме разработки с использованием `Turbopack` вместо `Webpack`:

```bash
  bun run dev:turbo
```

Будет доступно по адресу [http://localhost:3000](http://localhost:3000)

#### Для сборки приложения:

```bash
  bun run build
```

#### Для запуска собранного приложения:

```bash
  bun run start
```

Также будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Работа с Prisma

### Основные команды

#### Генерация клиента Prisma:

```bash
  bun run prisma:generate
```

#### Применение миграций:

```bash
  bun run prisma:migrate:dev
```

#### Выполнение всех миграций в среде производства:

```bash
  bun run prisma:migrate:deploy
```

#### Сброс базы данных и повторное выполнение всех миграций:

```bash
  bun run prisma:migrate:reset
```

#### Запуск Prisma Studio:

```bash
  bun run prisma:studio
```
### Форматирование и линтинг

#### Проверить код стайл всего проекта:

```bash
  bun run lint
```

#### Исправить автоисправляемые ошибки в код стайле:

```bash
  bun run lint:fix
```

#### Проверить форматирование:

```bash
  bun run prettier
```
#### Исправить форматирование с помощью Prettier:

```bash
  bun run prettier:fix
```
#### Исправить код стайл и форматирование:

```bash
  bun run format
```

## Дополнительная информация

Для более детальной информации по настройке и использованию обратитесь к официальной документации:

- [React Documentation](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router Preview](https://app-router.vercel.app)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/guides/nextjs)
- [Auth.js Documentation](https://authjs.dev/getting-started)
