@echo off
title MSI Cubi NUC - Agentic AI Backend
echo ====================================================
echo Menjalankan Backend FastAPI (Port 8000)...
echo URL API: http://127.0.0.1:8000
echo Dokumentasi Swagger: http://127.0.0.1:8000/docs
echo ====================================================
python -m uvicorn backend.main:app --reload --port 8000
pause
