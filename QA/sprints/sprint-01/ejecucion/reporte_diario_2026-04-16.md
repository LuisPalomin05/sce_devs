# Reporte Diario QA - 2026-04-16

- Sprint: 01
- QA responsable: (completar)
- Ambiente: Local (Frontend + Backend)
- Base: SCEDATABASE

## Resumen
- Casos ejecutados: 8
- Pass: 5
- Fail: 0
- Blocked: 3

## Tabla de ejecución
| Caso ID | Módulo | Resultado | Evidencia | Bug ID |
|---|---|---|---|---|
| AUTH-01 | Login válido | Pass | API `POST /api/auth/login` => 200 | - |
| AUTH-02 | Login inválido | Pass | API `POST /api/auth/login` => 401 | - |
| SEC-01 | Ruta privada sin token | Pass | API `GET /api/users/me` => 401 | - |
| PROD-01 | Almacén tenant 1 | Pass | API `GET /api/producto` + `x-tenant-id=1` => count 4 | - |
| DASH-01 | Dashboard tenant 1 | Pass | API `GET /api/dashboard` => 200 (retest) | BUG-003 (cerrado) |
| USER-01 | Vista Usuarios con datos | Blocked | Vista no muestra registros esperados en UI | BUG-004 |
| SALE-01 | Registro de venta | Blocked | Endpoint/flujo no validado en esta corrida | - |
| SALE-02 | Vista Ventas con datos | Blocked | Vista no muestra registros esperados en UI | BUG-005 |

## Bloqueos
- Flujo de prueba de venta pendiente de validación funcional (UI/API).
- Vista `Usuarios` sin datos en UI.
- Vista `Ventas` sin datos en UI.


## Próximo paso
- Implementar integración real de guardado en `Ventas.jsx` y endpoint asociado.
- Completar SALE-01 y adjuntar evidencia.
- Revisar integración de vista `Usuarios` contra endpoint de datos reales.
