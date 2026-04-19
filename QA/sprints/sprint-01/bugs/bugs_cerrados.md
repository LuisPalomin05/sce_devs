# Bugs Cerrados - Sprint 01

| Bug ID | Título | Severidad | Estado final | Responsable | Fecha cierre |
|---|---|---|---|---|---|
| BUG-003 | [Dashboard] Error 500 por procedure `sp_dashboard` inexistente en SCEDATABASE | S2 | Done (Retest OK) | Backend/DBA | 2026-04-16 |

Evidencia:
- `CALL sp_dashboard(1)` => OK.
- `GET /api/dashboard` con token + `x-tenant-id=1` => 200.
