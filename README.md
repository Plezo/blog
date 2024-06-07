## Getting Started

Copy the .env.example file, name it .env.local, and fill it out

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Version Control

Main branch is prod branch so we will only merge features there for releases
Dev branch is going to have all the features that will be merged into main soon
Feature branches are for implementing individual features to be merged into dev
Hotfix branches are for quick fixes that are needed for bugs in main

## Database Migrations

The package for migrations should be in the package.json but in case it isn't:

```sh
npm install db-migrate db-migrate-pg pg
```

Make sure to fill out the database.json file, follow the structure from the database.json.example file, the credentials should be the same as the .env.local

To make a new migration file, run the command:

```sh
npx db-migrate create <name-of-migration> --sql-file
```

Once generated, implement the up and down migration files

To apply migrations, run:

```sh
npx db-migrate up
```

To rollback a migration, run:

```sh
npx db-migrate down
```
