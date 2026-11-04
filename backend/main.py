from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Agentic Sales Hub API", version="1.0.0")

class CustomerInquiry(BaseModel):
    nama: str
    domisili: str
    budget_dp: int
    minat_unit: str

@app.get("/health")
def health_check():
    return {"status": "online", "mode": "local-first", "engine": "running"}

@app.post("/api/v1/sales/process-lead")
def process_lead(inquiry: CustomerInquiry):
    # Endpoint ini nantinya memanggil logika matching CSV & penerbitan SPK
    return {
        "status": "success",
        "customer": inquiry.nama,
        "action": "Unit matching & SPK generation triggered",
        "doc_ready": True
    }
