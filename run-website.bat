@echo off
start cmd /k "cd /d api && npx nodemon index.js"
start cmd /k "cd /d front && npm run dev"