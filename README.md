# DevSphere

## Описание проекта

DevSphere - социальная сеть для разработчиков.

## Технологии

- React 19
- Next.js 15
- Auth.js - аутентификация
- Tailwind CSS - стили
- shadcn.ui - UI компоненты
- prisma - взаимодействие с БД
- vercel - деплой и аналитика
- eslint - линтинг
- prettier - форматирование

## Структура проекта

Исходный код находится в `src`:

- `actions` - Серверные экшены
- `app` - В Next.js используется для роутинга, название папок внутри этой указывают на путь в `url`. [подробнее](https://nextjs.org/docs/app/building-your-application/routing)
- `components` - Переиспользуемые React компоненты.
- `config` - Конфигурационные файлы приложения
  - `store` - Конфигурация Redux store
  - `globals.css` - Глобальные css стили
  - `prisma.ts` - Конфигурация клиента `prisma`
  - `routes.ts` - Паттерны путей, для аутентификации.
  - `utils.ts` - Основные утилиты
- `data` - Взаимодействия с БД
- `hooks` - React хуки
- `schemas` - zod схемы для форм
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
  npm install
```

3. Инициализируйте Prisma

```bash
  npm run prisma:generate
  npm run prisma:migrate:dev
```

## Запуск приложения

#### Для запуска в режиме разработки:

```bash
  npm run dev
```

Будет доступно по адресу [http://localhost:3000](http://localhost:3000)

#### Для сборки приложения:

```bash
  npm run build
```

#### Для запуска собранного приложения:

```bash
  npm run start
```

Также будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Работа с Prisma

### Основные команды

#### Генерация клиента Prisma:

```bash
  npm run prisma:generate
```

#### Применение миграций:

```bash
  npm run prisma:migrate:dev
```

#### Выполнение всех миграций в среде производства:

```bash
  npm run prisma:migrate:deploy
```

#### Сброс базы данных и повторное выполнение всех миграций:

```bash
  npm run prisma:migrate:reset
```

#### Запуск Prisma Studio:

```bash
  npm run prisma:studio
```

## Дополнительная информация

Для более детальной информации по настройке и использованию обратитесь к официальной документации:

- [React Documentation](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
