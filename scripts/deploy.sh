#!/bin/bash
echo 'build frontend \n'

cd ./frontend/ && npm install && npm run build

echo 'build backend \n'

cd ./frontend/ && npm install && npm run start:dev

