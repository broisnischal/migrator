## Migration Concepts

Squashing Migrations

- Combine multiple migrations into one after code stabilization.

Baseline Migrations

- Initialize an existing database to match the ORM schema.

Shadow Databases

- Test migrations against a clone of production DB.

Zero-Downtime Migrations

- Techniques for altering tables without downtime (e.g., expand-contract pattern).
