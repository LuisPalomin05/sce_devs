# Sprint 01 - QA

## Objetivo
Validar flujos críticos del sistema con la base actual `SCEDATABASE` y detectar riesgos funcionales/multi-tenant antes del cierre.

## Fechas sugeridas
- Inicio: 2026-04-16
- Fin: 2026-04-22

## Alcance del sprint
- Login / sesión
- Dashboard
- Almacén (productos/categorías)
- Ventas
- Búsqueda global
- Aislamiento por tenant

## Criterios de entrada
- Backend y frontend levantan correctamente.
- Script `QA/sql/QA_SEED_Y_PRUEBAS.sql` ejecutado sin errores.
- Usuarios de prueba disponibles (`admin@sceadmin.com`, etc.).

## Criterios de salida
- 100% de casos P1 ejecutados.
- 0 bugs S1 abiertos.
- Bugs S2 con plan y fecha de corrección.
- Evidencia adjunta en cada caso ejecutado.

## Estructura
- `plan/`: alcance y selección de casos.
- `ejecucion/`: reporte diario y resumen.
- `bugs/`: control rápido de abiertos/cerrados.
- `cierre/`: informe final de sprint.
- `jira/`: importación rápida a Jira (CSV + guía).

## Cierre rápido
- Usar `cierre/checklist_cierre_30min.md` para cierre operativo del sprint.
