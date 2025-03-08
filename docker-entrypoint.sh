#!/bin/sh
set -e

echo "Waiting for SQL Server to be ready..."
while ! nc -z db 1433; do
  sleep 2
  echo "Waiting for SQL Server..."
done

echo "SQL Server is ready. Initializing database..."
npm run init-db

#echo "Generating migration..."
#npm run migration:generate -- src/infrastructure/migrations/Migration$(date +%s)

echo "Running migrations..."
npm run migration:run

echo "Starting API..."
npm run dev