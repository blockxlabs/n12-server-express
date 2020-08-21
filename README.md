# N12 Server Express

## Description

### Auto migration

#### Run auto migration

```bash
./node_modules/.bin/runmigration --migrations-path ./src/db/migrations --models-path ./src/db/models/
```

#### Run migrations
```bash
./node_modules/.bin/sequelize-cli db:migrate --migrations-path ./src/db/migrations --config ./src/db/config/config.js 
```

#### Run undo migrations
```bash
./node_modules/.bin/sequelize-cli db:migrate:undo:all --migrations-path ./src/db/migrations --config ./src/db/config/config.js 
```

#### Run dev
```
yarn run start-dev
```

### Deployment for Google App Engine
DB_HOST /cloudsql/INSTANCE_CONNECTION_NAME
