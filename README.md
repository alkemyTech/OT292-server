# Server Base - Proyecto ONG - TEAM 292

## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run

``` bash
npm install
```

3) Migrations:

``` bash
npx sequelize-cli db:migrate
```

4) Seeders:

``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Test users

| Email             | Password  |
|-------------------|-----------|
| admin@admin.admin | admin     |
| admin2@admin.admin | testAdmin |
| user@user.user | user      |
|user2@user.user| user2     |
