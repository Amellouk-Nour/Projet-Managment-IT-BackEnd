@echo off
echo Lancement de PostgreSQL...
docker compose up -d postgres
echo.
echo Postgres : OK
echo.
pause
