# Reporte Diario QA - 2026-04-28

## Resumen del dia
- Casos ejecutados: 4
- Pass: 4
- Fail: 0
- Blocked: 1
- Bugs nuevos: 5 (BUG-006 a BUG-010)

## Estado de entorno
- Backend: OK en `http://localhost:3000` (npm run dev)
- Frontend: OK en `http://localhost:5173` (npm run dev)

## Corte 1 (ejecucion real)
1. AUTH-02 Login invalido con `admin@sceadmin.com / 123456`: PASS (401 esperado, mensaje "Credenciales incorrectas").
2. AUTH-03 Login valido: BLOCKED (no se dispone de credenciales QA validas para continuar con pruebas autenticadas).
3. BUG-006 Campana en header: PASS QA (se confirma ausencia de accion en click).
4. BUG-007 Mensajes en header: PASS QA (se confirma ausencia de accion en click).
5. BUG-008 Perfil desde menu Administracion: PASS QA (navega a `/dashboard/perfil` pero la vista queda vacia).

## Avance por modulo
- Auth/Sesion: En progreso (AUTH-02 pass, AUTH-03 bloqueado por credenciales)
- Dashboard: En progreso (header validado)
- Usuarios: Pendiente (retest)
- Ventas: Pendiente (retest)
- Almacen: Pendiente
- Busqueda global: Pendiente

## Evidencia levantada (pendiente de adjuntar archivos)
1. Header en `/dashboard/settings` antes/despues de click en campana.
2. Header en `/dashboard/settings` antes/despues de click en mensajes.
3. Menu Administracion con opcion Perfil y navegacion a `/dashboard/perfil` con contenido vacio.
4. Login invalido con toast `Credenciales incorrectas`.

## Bugs reportados hoy
- BUG-006 Header campana sin accion
- BUG-007 Header mensajes sin accion
- BUG-008 Perfil sin accion funcional
- BUG-009 Ruta inconsistente en resultado usuario (`/usuarios` vs `/users`)
- BUG-010 Riesgo multi-tenant en busqueda de usuarios

## Riesgos activos
1. Seguridad de datos por tenant en busqueda.
2. Flujo de navegacion incompleto en header.
3. Retest pendiente de casos bloqueados Sprint 01.
4. Bloqueo operativo por falta de credenciales QA vigentes para login valido.

## Plan siguiente bloque (proxima hora)
1. Confirmar credencial valida de usuario QA (admin/tenant).
2. Ejecutar smoke Auth + Dashboard autenticado.
3. Retest USER-01, SALE-01 y SALE-02.
4. Validar busqueda por tenant 1 y tenant 2.
5. Adjuntar evidencia por caso P1.
