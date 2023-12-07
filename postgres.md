# Postgres info


In the backend/package.json, you will see some scripts to help manage postgres


1. create a user

```sh
psql -c "CREATE USER <user> WITH PASSWORD 'password'"
```

2. create a database

```sh
psql -c "CREATE DATABASE <databasename>"
```

3. fill in the information in the .env based on the .env example using the same info you used in steps 1 and 2
