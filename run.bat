@echo off
title Pratibha Photo Studio - Dev Server
color 0A

echo.
echo  =======================================
echo   PRATIBHA PHOTO STUDIO - DEV SERVER
echo  =======================================
echo.

echo  Clearing ports 3000-3003...
for %%p in (3000 3001 3002 3003) do (
  for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%%p ^| findstr LISTENING') do (
    taskkill /PID %%a /F >nul 2>&1
  )
)
echo  Ports cleared.
echo.
echo  Starting development server...
echo  Open: http://localhost:3000
echo.

cd /d "%~dp0"
npm run dev

pause
