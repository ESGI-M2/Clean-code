#!/bin/sh

# Check if the framework is provided and set it to nest by default
FRAMEWORK=${FRAMEWORK:-nest}

# Check if the framework is valid
if [ "$FRAMEWORK" != "express" ] && [ "$FRAMEWORK" != "nest" ]; then
    echo -e "\033[0;31mInvalid framework provided: $FRAMEWORK\033[0m"
    exit 1
fi

echo -e "\033[0;34mStarting the application with $FRAMEWORK framework\033[0m"

npm run sequelize:migrate

if [ "$FRAMEWORK" = "express" ]; then
    npm run start:dev:express
else
    npm run start:dev:nest
fi