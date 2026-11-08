import os
import json
import glob
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_AGENCY_DIR = os.path.join(BASE_DIR, "temp_agency")
DIVISIONS_FILE = os.path.join(TEMP_AGENCY_DIR, "divisions.json")

with open(DIVISIONS_FILE, "r", encoding="utf-8") as f:
    div_data = json.load(f)

divisions = div_data.get("divisions", {})

extracted = []

for div_key, div_info in divisions.items():
    div_dir = os.path.join(TEMP_AGENCY_DIR, div_key)
    if not os.path.isdir(div_dir):
        continue
    
    for file_path in glob.glob(os.path.join(div_dir, "*.md")):
        with open(file_path, "r", encoding="utf-8", errors="ignore") as mf:
            raw = mf.read()
            
        if not raw.startswith("---"):
            continue
            
        parts = raw.split("---", 2)
        if len(parts) < 3:
            continue
            
        frontmatter = parts[1]
        body = parts[2].strip()
        
        # parse yaml-like frontmatter
        meta = {}
        for line in frontmatter.strip().split("\n"):
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip().strip('"\'')
                
        agent_id = os.path.splitext(os.path.basename(file_path))[0]
        
        # extract first non-header paragraphs for prompt context
        lines = [l.strip() for l in body.split("\n") if l.strip() and not l.strip().startswith("#")]
        prompt_snippet = " ".join(lines[:4]) if lines else ""
        if len(prompt_snippet) > 350:
            prompt_snippet = prompt_snippet[:347] + "..."
            
        extracted.append({
            "id": agent_id,
            "name": meta.get("name", agent_id.replace("-", " ").title()),
            "division": div_key,
            "divisionLabel": div_info.get("label", div_key.title()),
            "color": meta.get("color", div_info.get("color", "#6366f1")),
            "emoji": meta.get("emoji", "🤖"),
            "vibe": meta.get("vibe", meta.get("description", "")[:100]),
            "description": meta.get("description", ""),
            "promptSnippet": prompt_snippet
        })

print(f"Extracted {len(extracted)} agents across {len(divisions)} divisions.")

# Save to backend/config/agency_agents.json
backend_config_dir = os.path.join(BASE_DIR, "backend", "config")
os.makedirs(backend_config_dir, exist_ok=True)
json_path = os.path.join(backend_config_dir, "agency_agents.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump({"total": len(extracted), "agents": extracted}, f, indent=2, ensure_ascii=False)
print(f"Saved JSON to {json_path}")

# Save to frontend/src/data/agencyAgents.js
frontend_data_dir = os.path.join(BASE_DIR, "frontend", "src", "data")
os.makedirs(frontend_data_dir, exist_ok=True)
js_path = os.path.join(frontend_data_dir, "agencyAgents.js")

js_content = f"""// Extracted from https://github.com/msitarzewski/agency-agents
// Contains {len(extracted)} specialized AI agent personas across {len(divisions)} divisions

export const AGENCY_AGENTS = {json.dumps(extracted, indent=2, ensure_ascii=False)};

export const DIVISIONS = {json.dumps(divisions, indent=2, ensure_ascii=False)};

// Curated Agency Agents presets for our Astra Motor Hub Cubi NUC team
export const CURATED_OFFICE_PRESETS = [
  {{
    id: "agency_sales_elite",
    label: "Agency Agents - Sales Elite (Recommended)",
    description: "Spesialis Deal Strategist, Outbound, Pipeline Analyst, dan Sales Engineer",
    boss: {{
      name: "Deal Strategist",
      role: "Deal Strategist & Closing Architect",
      color: "#1B4D3E",
      emoji: "♟️",
      vibe: "Qualifies deals like a surgeon and kills happy ears on contact.",
      personaId: "sales-deal-strategist"
    }},
    agents: {{
      "blue-agent": {{
        name: "Sales Engineer",
        role: "Compute & Stock Analyzer",
        color: "#2563EB",
        emoji: "⚙️",
        vibe: "Connects technical specs directly to customer ROI.",
        personaId: "sales-engineer"
      }},
      "purple-agent": {{
        name: "Outbound Strategist",
        role: "AI Pitch Drafter",
        color: "#E8590C",
        emoji: "🎯",
        vibe: "Turns buying signals into booked meetings before competition notices.",
        personaId: "sales-outbound-strategist"
      }},
      "green-agent": {{
        name: "Pipeline Analyst",
        role: "Approval & Dispatch",
        color: "#059669",
        emoji: "📊",
        vibe: "Tells you your forecast is wrong before you realize it yourself.",
        personaId: "sales-pipeline-analyst"
      }},
      "orange-agent": {{
        name: "Account Strategist",
        role: "Data & Deal Archivist",
        color: "#D97706",
        emoji: "🏢",
        vibe: "Expands customer lifetime value through proactive account mastery.",
        personaId: "sales-account-strategist"
      }}
    }}
  }},
  {{
    id: "agency_growth_strike",
    label: "Agency Agents - Growth & Marketing Strike",
    description: "Kombinasi Lead Gen Offer, Growth Hacker, dan Conversion Optimizer",
    boss: {{
      name: "Offer Strategist",
      role: "Chief Offer Architect",
      color: "#4F46E5",
      emoji: "💎",
      vibe: "Crafts high-converting, irresistible value propositions.",
      personaId: "sales-offer-lead-gen-strategist"
    }},
    agents: {{
      "blue-agent": {{
        name: "Audience Intel",
        role: "Compute & Market Radar",
        color: "#0284C7",
        emoji: "🔍",
        vibe: "Maps buying signals across digital channels.",
        personaId: "sales-account-strategist"
      }},
      "purple-agent": {{
        name: "Direct Copywriter",
        role: "AI Pitch Drafter",
        color: "#9333EA",
        emoji: "✍️",
        vibe: "Persuasive conversion-focused messaging.",
        personaId: "sales-outbound-strategist"
      }},
      "green-agent": {{
        name: "Conversion Gate",
        role: "Approval & Dispatch",
        color: "#16A34A",
        emoji: "⚡",
        vibe: "Validates high-intent lead qualification.",
        personaId: "sales-deal-strategist"
      }},
      "orange-agent": {{
        name: "CRM Analyst",
        role: "Data & Deal Archivist",
        color: "#EA580C",
        emoji: "📁",
        vibe: "Maintains spotless data hygiene and attribution.",
        personaId: "sales-pipeline-analyst"
      }}
    }}
  }},
  {{
    id: "default_cubi",
    label: "MSI Cubi NUC Classic",
    description: "Tim default MSI Cubi NUC 4 Unit + Pak Alfa",
    boss: {{
      name: "Pak Alfa",
      role: "Sales Director",
      color: "#F59E0B",
      emoji: "👑",
      vibe: "Memimpin strategi closing penjualan motor nasional.",
      personaId: "boss"
    }},
    agents: {{
      "blue-agent": {{
        name: "Cubi Scout",
        role: "Compute & Stock Analyzer",
        color: "#0284C7",
        emoji: "🤖",
        vibe: "Menganalisis kecocokan stok dan komputasi unit di gudang.",
        personaId: "cubi-scout"
      }},
      "purple-agent": {{
        name: "Cubi Scribe",
        role: "AI Pitch Drafter",
        color: "#9333EA",
        emoji: "✍️",
        vibe: "Menyusun draf WhatsApp personal via Qwen LLM.",
        personaId: "cubi-scribe"
      }},
      "green-agent": {{
        name: "Cubi Gate",
        role: "Approval & Dispatch",
        color: "#16A34A",
        emoji: "🛡️",
        vibe: "Turnstile verifikasi human-in-the-loop dan pengiriman pesan.",
        personaId: "cubi-gate"
      }},
      "orange-agent": {{
        name: "Cubi Vault",
        role: "Data & Deal Archivist",
        color: "#EA580C",
        emoji: "💾",
        vibe: "Menyimpan deal terverifikasi ke CSV database lokal.",
        personaId: "cubi-vault"
      }}
    }}
  }}
];
"""

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_content)
print(f"Saved JS to {js_path}")
