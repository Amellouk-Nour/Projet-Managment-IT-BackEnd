@echo off
echo ========================================
echo    Projet Management - Lancer
echo ========================================
echo.
echo [1/3] Arret des anciens conteneurs...
docker compose down 2>nul
echo.
echo [2/3] Demarrage de PostgreSQL...
docker compose up -d postgres
echo.
echo Postgres : OK
echo.
echo [3/3] Demarrage du Backend Spring Boot...
start "Projet-Management-Backend" cmd /c ".\mvnw.cmd spring-boot:run"
echo.
echo Backend : OK (dans une nouvelle fenetre)
echo.
echo Backend : http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Pour arreter: fermer la fenetre backend ou appuyer sur une touche
pause
docker compose down
