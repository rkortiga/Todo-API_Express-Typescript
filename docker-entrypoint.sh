#!/bin/sh
set -e

echo "Initializing database..."
npm run init-db

echo "Starting API..."
npm run dev