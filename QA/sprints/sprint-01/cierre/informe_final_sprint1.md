# Informe Final Sprint 01 (Borrador)

## Resumen ejecutivo
Sprint enfocado en estabilidad funcional y control multi-tenant con base `SCEDATABASE`.

## Métricas (cierre actual)
- Casos planificados: 8
- Casos ejecutados: 8
- Pass: 5
- Fail: 0
- Blocked: 3
- % éxito: 62.5%

## Evidencias de ejecución (formato visual)

### Matriz de evidencias
| Caso | Acción | Evidencia visual | Resultado |
|---|---|---|---|
| AUTH-01 | Login válido | `../evidencia/AUTH/AUTH-01_PASS_2026-04-16.png` | Pass (200) |
| AUTH-02 | Login inválido | `../evidencia/AUTH/AUTH-02_PASS_2026-04-16.png` | Pass (401 esperado) |
| SEC-01 | Ruta protegida sin token | `../evidencia/AUTH/SEC-01_PASS_2026-04-16.png` | Pass (401 esperado) |
| DASH-01 | Dashboard tenant 1 (retest) | `../evidencia/DASH/DASH-01_RETEST_PASS_2026-04-16.png` | Pass (200) |
| PROD-01 | Listado productos tenant 1 | `../evidencia/ALMACEN/PROD-01_PASS_2026-04-16.png` | Pass |
| SALE-01 | Registro de venta | `../evidencia/VENTAS/SALE-01_BLOCKED_2026-04-16.png` | Blocked |
| USER-01 | Vista Usuarios con datos | `../evidencia/USUARIOS/USER-01_BLOCKED_2026-04-16.png` | Blocked |
| SALE-02 | Vista Ventas con datos | `../evidencia/VENTAS/SALE-02_BLOCKED_2026-04-16.png` | Blocked |

### Detalle de evidencia bloqueada (SALE-02)
- Archivo: [SALE-02_BLOCKED_2026-04-16.png](../evidencia/VENTAS/SALE-02_BLOCKED_2026-04-16.png)
- Qué muestra: la vista **Ventas** abre, pero no presenta los registros esperados para el tenant en prueba.
- Interpretación QA: caso **SALE-02** en estado **Blocked** por falta de integración/flujo de datos en UI.
- Impacto: no se puede validar criterios funcionales de consulta/listado de ventas en Sprint 01.
- Criterio de cierre: cuando la vista consuma datos reales y la evidencia de retest muestre listado correcto (resultado PASS).

### Evidencia clave: Antes vs Después (Dashboard)
**Antes (falla):**
- API dashboard devolvía `500` por ausencia de procedure `sp_dashboard`.
- Evidencia sugerida: `../evidencia/DASH/DASH-01_BEFORE_500_2026-04-16.png`

**Después (retest exitoso):**
- API dashboard devuelve `200` y la vista carga métricas correctamente.
- Evidencia sugerida: `../evidencia/DASH/DASH-01_AFTER_200_2026-04-16.png`

### Guía rápida para adjuntar evidencia
1. Guardar captura con formato: `CASO-XX_RESULTADO_FECHA.png`.
2. Colocar cada archivo en la carpeta de módulo dentro de `../evidencia/`.
3. Registrar el nombre del archivo en la matriz de evidencias.
4. Si el caso falla o queda bloqueado, vincular Bug ID en Jira/registro interno.

## Hallazgos clave
1. Dashboard fallaba por procedure inexistente (`sp_dashboard`) y quedó corregido con retest exitoso.
2. Riesgo multi-tenant pendiente en búsqueda global de usuarios (BUG-001).
3. Vistas `Usuarios` y `Ventas` sin datos en UI, afectando validación funcional completa (BUG-004, BUG-005).

## Riesgo residual
- Funcional: Medio/Alto (módulos `Usuarios` y `Ventas` incompletos en UI funcional).
- Seguridad de datos: Medio (riesgo multi-tenant en búsqueda global pendiente).
- Recomendación de salida: Go condicional

## Acciones siguientes
- Cerrar BUG-001 (aislamiento por tenant en búsqueda de usuarios).
- Cerrar BUG-002 (validaciones de precio/stock negativo).
- Corregir integración de datos en vistas `Usuarios` y `Ventas` (BUG-004/BUG-005).
- Implementar y validar flujo real de registro de venta para desbloquear SALE-01.
- Ejecutar regresión smoke final tras correcciones.
