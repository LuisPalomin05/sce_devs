# Sprint 02 - QA

## Objetivo
Validar correcciones del Sprint 01 y cambios recientes en frontend/backend, priorizando estabilidad funcional, aislamiento por tenant y cierre de riesgos S2 antes de salida.

## Fechas sugeridas
- Inicio: 2026-04-28
- Fin: 2026-05-03

## Alcance del sprint
- Retest de casos bloqueados del Sprint 01
- Login/sesion y rutas privadas
- Dashboard
- Usuarios
- Ventas
- Almacen
- Busqueda global
- Aislamiento por tenant
- Exportacion PDF (Usuarios)

## Criterios de entrada
- Backend y frontend levantan correctamente.
- Script `QA/sql/QA_SEED_Y_PRUEBAS.sql` ejecutado sin errores.
- Usuario admin y tenants de prueba disponibles.
- Bugs de Sprint 01 en estado Listo para Retest o con fix desplegado.

## Criterios de salida
- 100% de casos P1 ejecutados.
- 0 bugs S1 y S2 abiertos.
- Evidencia adjunta para cada caso P1.
- Informe final de sprint con recomendacion Go/No Go.

## Estructura
- `plan/`: alcance y seleccion de casos.
- `ejecucion/`: reporte diario y resumen.
- `bugs/`: control de abiertos/cerrados.
- `cierre/`: checklist e informe final.
- `jira/`: importacion rapida (CSV + guia).

## Cierre rapido
- Usar `cierre/checklist_cierre_30min.md` para cierre operativo.
