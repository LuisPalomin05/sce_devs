# QA - Documentación central (PROintegrador)

Este directorio es el punto único de referencia de QA para el proyecto.

## Base de datos oficial QA
- Nombre: `SCEDATABASE`
- Script fuente único: `QA/sql/QA_SEED_Y_PRUEBAS.sql`
- Motor: MySQL

## Índice rápido
1. [01_ONBOARDING.md](01_ONBOARDING.md)
2. [02_CHECKLIST.md](02_CHECKLIST.md)
3. [03_REPORTE_BUGS.md](03_REPORTE_BUGS.md)
4. [04_SEGUIMIENTO_DIARIO.md](04_SEGUIMIENTO_DIARIO.md)
5. [sql/QA_SEED_Y_PRUEBAS.sql](sql/QA_SEED_Y_PRUEBAS.sql)
6. [sprints/sprint-01/README.md](sprints/sprint-01/README.md)

## Regla de mantenimiento
Si cambia la BD o procedures, primero se actualiza `QA/sql/QA_SEED_Y_PRUEBAS.sql` y luego esta documentación.

## Flujo recomendado del equipo
1. Levantar Frontend y Backend.
2. Ejecutar script SQL oficial.
3. Ejecutar Smoke Test.
4. Reportar bugs con la plantilla estándar.
5. Registrar resultados diarios en seguimiento.
