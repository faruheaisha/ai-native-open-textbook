---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "dc460158d580473c64fb5c949e69a836b8b06258fa40e6cfcf6d2b3fd0d1e881"
contentMode: "local-full"
zh: ""
---

## Step 1. Create synthetic company data

The notebook creates fictional diligence materials for a company that might be reviewed during an acquisition. The data mixes structured exports with narrative markdown documents so the agent has to decide which sources deserve more weight.

### Narrative markdown files in the synthetic data

| File | Why it is included |
| --- | --- |
| `overview.md` | Management's top-level company summary |
| `product_strategy.md` | Roadmap context plus an unvalidated NRR estimate |
| `go_to_market.md` | Sales-motion context that should be checked against pipeline data |
| `board_deck.md` | A polished management narrative that can conflict with structured exports |
| `financials/revenue_recognition_notes.md` | Accounting context for launch-stage ARR treatment |
| `legal/contracts_summary.md` | Contract-level risk context |
| `legal/open_issues.md` | Open legal matters that should remain visible |
| `security/security_overview.md` | Security posture and certification wording |
| `sales/security_faq.md` | Sales-facing security language that may overstate the evidence |
| `hr/org_chart.md` | Operating context for leadership and staffing |
| `sales/pipeline_notes.md` | Qualitative pipeline commentary |
| `notes/qa_log.md` | Diligence questions and unresolved follow-ups |

The example generates the synthetic company data at runtime so it stays self-contained while still giving the agent a realistic mix of structured exports and narrative documents to analyze.

### Define the synthetic source files

The next collapsed cell contains the source documents used to build the fictional company data.

```python
from textwrap import dedent

WORKSPACE_FILES = {
    "overview.md": """
    # FictionalCorp XYZ

    FictionalCorp XYZ is a revenue intelligence software company with annual SaaS subscriptions, usage add-ons, and launch-stage commitments.

    Management reports FY2025 ARR of $43.0M and year-over-year growth of 71%.

    Management reports no legal-entity customer above 15% of booked ARR after excluding launch-stage usage add-ons.

    Legal summary: Management states legal matters are ordinary course and no contract terms should affect valuation.
    """,
    "product_strategy.md": """
    # Product Strategy

    Core product lines:

    - Forecast Assist
    - Pipeline Quality Monitor
    - Renewal Risk Workbench

    Product roadmap priority is enterprise workflow depth. Management expects usage add-ons to increase expansion revenue.

    Sales leadership references a 122% NRR estimate in planning materials, but finance has not published official NRR and the estimate excludes selected downsell and churn adjustments.
    """,
    "go_to_market.md": """
    # Go To Market

    FictionalCorp XYZ sells to CRO and RevOps buyers through a direct sales motion.

    The current plan assumes larger enterprise ACVs and partner-sourced pipeline. Pipeline conversion evidence should be checked against `sales/pipeline.csv`.
    """,
    "board_deck.md": """
    # Board Packet - December 2025

    - FY2025 ending ARR: $43.0M
    - ARR growth: 71%
    - Gross margin: 69%
    - Cash burn: $2.9M per month
    - Runway: 11 months

    Management narrative: the company is positioned for efficient enterprise expansion.

    ARR note: the headline ARR view includes signed launch-stage commitments and a usage true-up view used for board planning.

    Management narrative: customer concentration is manageable when measured by legal entity and booked ARR.
    """,
    "financials/revenue_recognition_notes.md": """
    # Revenue Recognition Notes

    Finance treats `financials/arr_bridge.csv` as the controlled FY2025 ARR bridge.

    The board deck ARR includes $2.8M of signed launch-stage commitments that were not live by 2025-12-31 and $1.1M of usage true-ups that finance does not classify as recurring ARR.

    RevOps also circulates a bookings-adjusted ARR view of $40.8M. That view is useful for pipeline planning but should not be silently reconciled with the controlled ARR bridge.
    """,
    "legal/contracts_summary.md": """
    # Contracts Summary

    Standard customer contracts are annual SaaS agreements with security and DPA exhibits. The largest five customers account for $25.1M of ARR.

    Management summary: legal matters are ordinary course and no contract terms should affect valuation.

    Clause inventory has not been fully reconciled with this summary. Two strategic customer agreements are flagged for non-standard terms in `legal/clause_inventory.csv`.
    """,
    "legal/open_issues.md": """
    # Open Legal Issues

    Former reseller DataHarbor filed a breach-of-contract claim seeking $3.2M plus accelerated commissions. Counsel estimates loss is possible but not probable. A clause review also identified two strategic customer MSAs with non-standard change-of-control notice rights and uncapped confidentiality indemnity language.
    """,
    "security/security_overview.md": """
    # Security Overview

    SOC 2 Type I is complete. SOC 2 Type II fieldwork is in progress, and the Type II report has not been issued.

    Customer security reviews should verify the exact certification status before relying on SOC 2 claims.
    """,
    "sales/security_faq.md": """
    # Sales Security FAQ

    Field guidance says Aurora is "SOC 2 complete" for late-stage enterprise deals.

    Security team note: this wording was intended to refer to Type I readiness, not an issued Type II report. Do not use this FAQ as certification evidence without checking `security/security_overview.md`.
    """,
    "hr/org_chart.md": """
    # Org Chart

    - CEO
    - CFO
    - VP Sales
    - VP Product
    - Head of Security

    Hiring plan assumes 14 net new GTM hires in 2026.
    """,
    "sales/pipeline_notes.md": """
    # Pipeline Notes

    Commit-stage pipeline includes $1.6M of DataHarbor-sourced opportunities that may be affected by the reseller dispute.

    Northstar expansion pipeline assumes completion of SOC 2 Type II before procurement review. Finance has not included this expansion in controlled FY2025 ARR.
    """,
    "notes/qa_log.md": """
    # Diligence Q&A Log

    - NRR was requested. RevOps provided a 122% management estimate, but finance has not validated official NRR and says the estimate excludes downsold Northstar entities and a churned reseller-sourced account.
    - CAC payback was requested but not provided.
    - Top-two customer ARR equals $12.4M, or 34% of FY2025 ARR based on `customers/top_customers.csv`.
    - Northstar Holdings parent-account ARR equals $12.4M, or 34% of FY2025 ARR based on `customers/account_hierarchy.csv`.
    - Board ARR should not be silently reconciled to finance ARR; use `financials/revenue_recognition_notes.md` for the difference.
    """,
    "financials/arr_bridge.csv": """
    metric,value_m
    opening_arr_2025_m,21.58
    new_arr_m,8.1
    expansion_arr_m,3.2
    contraction_arr_m,1.1
    churn_arr_m,2.7
    ending_arr_2025_m,36.9
    bookings_adjusted_arr_m,40.8
    """,
    "financials/monthly_kpis.csv": """
    month,ending_arr_m,new_arr_m,expansion_arr_m,churn_arr_m,gross_margin
    2025-01,21.58,0.55,0.35,0.18,0.69
    2025-02,23.28,0.59,0.37,0.20,0.69
    2025-03,24.98,0.63,0.39,0.21,0.69
    2025-04,26.69,0.67,0.41,0.22,0.69
    2025-05,28.39,0.71,0.43,0.24,0.69
    2025-06,30.09,0.75,0.45,0.26,0.69
    2025-07,31.79,0.79,0.47,0.27,0.69
    2025-09,33.50,0.83,0.49,0.28,0.69
    2025-10,35.20,0.87,0.51,0.30,0.69
    2025-12,36.90,0.91,0.53,0.32,0.69
    """,
    "financials/p_and_l.csv": """
    period,revenue_m,gross_margin,opex_m,cash_burn_m,runway_months
    FY2025,30.26,0.69,47.71,2.9,11
    """,
    "financials/retention_extract.csv": """
    metric,value,status,notes
    net_revenue_retention,122%,management_estimate_unvalidated,Sales deck estimate; excludes downsold Northstar entities and one churned reseller-sourced account.
    gross_revenue_retention,84%,finance_partial,Preliminary 2025 cohort; usage feeds incomplete for two enterprise customers.
    logo_retention,91%,finance_partial,"Includes legal entities, not parent-account rollups."
    cac_payback_months,,not_provided,Requested by diligence team; no source schedule in dataroom.
    """,
    "customers/top_customers.csv": """
    customer,parent_account,arr_m,arr_share,segment,renewal_date,inclusion_basis
    Northstar Bank,Northstar Holdings,7.8,0.2114,Enterprise,2026-02-15,controlled_arr_bridge
    Northstar Capital Markets,Northstar Holdings,4.6,0.1247,Enterprise,2026-04-01,controlled_arr_bridge
    Helio Retail,Helio Retail,6.9,0.1870,Enterprise,2026-05-15,controlled_arr_bridge
    BluePeak Logistics,BluePeak Logistics,3.6,0.0976,Mid-market,2026-06-30,controlled_arr_bridge
    Summit Foods,Summit Foods,2.2,0.0596,Mid-market,2026-02-28,controlled_arr_bridge
    """,
    "customers/account_hierarchy.csv": """
    legal_entity,parent_account,parent_arr_m,note
    Northstar Bank,Northstar Holdings,12.4,Same procurement parent as Northstar Capital Markets.
    Northstar Capital Markets,Northstar Holdings,12.4,Managed by separate RevOps owner but same parent renewal committee.
    Helio Retail,Helio Retail,6.9,Standalone parent account.
    BluePeak Logistics,BluePeak Logistics,3.6,Standalone parent account; renewal issue open.
    """,
    "customers/renewal_calendar.csv": """
    customer,renewal_date,renewal_risk,notes
    Northstar Bank,2026-02-15,medium,Expansion depends on completed SOC 2 Type II.
    Northstar Capital Markets,2026-04-01,medium,Same parent procurement committee as Northstar Bank.
    Helio Retail,2026-05-15,medium,Adoption below plan; forecast latency escalation remains in monitoring.
    BluePeak Logistics,2026-06-30,high,Open CRM sync errors and renewal risk.
    """,
    "customers/customer_health.csv": """
    customer,health,primary_risk,signal_date,caveat
    Northstar Bank,green,none flagged,2025-10-31,"Northstar health is recorded by legal entity, not parent account."
    Northstar Capital Markets,yellow,monitor adoption,2025-10-31,"Northstar health is recorded by legal entity, not parent account."
    Helio Retail,yellow,monitor adoption,2025-12-15,
    BluePeak Logistics,red,renewal risk,2025-12-15,
    Summit Foods,yellow,monitor adoption,2025-12-15,
    """,
    "legal/clause_inventory.csv": """
    customer,issue,exposure,confidence
    Northstar Bank,change_of_control_notice,customer may request transition plan within 10 days of a control transaction,medium
    Helio Retail,uncapped_confidentiality_indemnity,uncapped liability for confidentiality breach; not reflected in management summary,high
    BluePeak Logistics,service_credit_carveout,credits can exceed one month fees if CRM sync SLA missed for two consecutive months,medium
    """,
    "sales/pipeline.csv": """
    stage,pipeline_m,historical_close_rate,quality_note
    commit,6.1,0.39,Includes security-dependent Northstar expansion.
    best_case,9.7,0.28,Includes DataHarbor-sourced opportunities under dispute.
    early,18.2,0.08,High volume but low conversion quality.
    """,
    "support/escalations.csv": """
    customer,severity,issue,status
    Northstar Capital Markets,medium,Forecast latency,monitoring
    BluePeak Logistics,high,CRM sync errors,open
    Northstar Bank,medium,Security questionnaire blocked pending SOC 2 Type II report,open
    """,
}
```

### Materialize the synthetic data

Write the source files to disk, add a manifest, and inspect the generated dataset.

```python
def write_workspace_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dedent(content).strip() + "\n", encoding="utf-8")

def generate_acquisition_diligence_workspace() -> Path:
    """Create the synthetic acquisition-diligence workspace directly from notebook data."""
    dataroom = ARTIFACT_DIR / "synthetic_dataroom"
    shutil.rmtree(dataroom, ignore_errors=True)
    for relative_path, content in WORKSPACE_FILES.items():
        write_workspace_file(dataroom / relative_path, content)
    manifest = {
        "company_name": "FictionalCorp XYZ",
        "scenario": "adversarial_diligence",
        "files": sorted(str(path.relative_to(dataroom)) for path in dataroom.rglob("*") if path.is_file()),
    }
    write_workspace_file(dataroom / "manifest.json", json.dumps(manifest, indent=2))
    return dataroom

dataset = generate_acquisition_diligence_workspace()
files = sorted(str(path.relative_to(dataset)) for path in dataset.rglob("*") if path.is_file())
print(f"Dataset created: {len(files)} files")
```

```text
Dataset created: 24 files
```
