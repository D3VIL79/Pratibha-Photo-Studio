@echo off
title Pratibha Photo Studio - Dev Server
color 0A

echo.
echo  =======================================
echo   PRATIBHA PHOTO STUDIO - DEV SERVER
echo  =======================================
echo.
echo  Starting development server...
echo  Open: http://localhost:3000
echo.

cd /d "%~dp0"
npm run dev

pause
