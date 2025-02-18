# supermigration

One Cli & Docs for multiple orm -> migrations!

migrate generate <name> # Create new migration
migrate apply # Run pending migrations
migrate rollback # Revert last migration
migrate status # Show migration state
migrate reset # Revert all migrations

# Generate migration by comparing DB state

migrate diff --dev --save

# Sync migrations between ORMs

migrate sync --from prisma --to typeorm

Usecase:

```
npm install -g migrator
```

migrate generate init
migrate apply

```
npx migrator init
```

research: https://github.com/lukaszbudnik/migrator
research: https://www.sea-ql.org/sea-orm-tutorial/ch01-02-migration-cli.html
research: migration basics, and migrations for multiple environment
