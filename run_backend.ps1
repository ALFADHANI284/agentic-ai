Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Menjalankan Backend FastAPI (Port 8000)..." -ForegroundColor Green
Write-Host "URL API: http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host "Dokumentasi Swagger: http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host "====================================================" -ForegroundColor Cyan

python -m uvicorn backend.main:app --reload --port 8000
