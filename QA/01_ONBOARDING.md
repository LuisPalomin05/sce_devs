# QA Onboarding

## Objetivo
Entrar al proyecto rápido y ejecutar pruebas sin bloquear al equipo.

## Precondiciones
- Frontend corriendo en `http://localhost:5173`
- Backend corriendo en `http://localhost:3000`
- API disponible en `http://localhost:3000/api`
- Acceso a MySQL Workbench o cliente SQL

## Base de datos oficial
- DB: `SCEDATABASE`
- Script: `QA/sql/QA_SEED_Y_PRUEBAS.sql`
- Usuario local app: `sce_user`
- Host: `127.0.0.1`
- Password: `123456`

## Arranque del sistema
1. Terminal 1 (Frontend): `bun run dev`
2. Terminal 2 (Backend): `bun run dev`
3. Verificar URLs:
   - Frontend: `http://localhost:5173`
   - Backend/API: `http://localhost:3000/api`

## Carga de datos QA
1. Abrir cliente SQL.
2. Ejecutar completo `QA/sql/QA_SEED_Y_PRUEBAS.sql`.
3. Confirmar que no hay errores.
4. Verificar rápido:
   - `CALL sp_get_productos(1);`
   - `CALL sp_get_ventas(1);`
   - `CALL sp_dashboard(1);`

## Orden recomendado (15-25 min)
1. Login válido e inválido.
2. Navegación principal (`Dashboard`, `Almacén`, `Ventas`, `Configuración`).
3. Crear/visualizar producto.
4. Validar dashboard con datos.
5. Buscar `Laptop`, `Paracetamol`, `Pedro`.

## Qué esperar
- Tenant A solo ve datos de A.
- Tenant B solo ve datos de B.
- Si A ve datos de B: bug de aislamiento (alta prioridad).
- Si acepta stock/precio negativos: bug de validación.
