@echo off
echo ========================================
echo    Projet Management - Arret
echo ========================================
echo.
echo [1/2] Arret des conteneurs Docker...
docker compose down
echo.
echo [2/2] Arret du processus backend...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    taskkill /F /PID %%a 2>nul
)
echo.
echo Environnement arrete.
pause
