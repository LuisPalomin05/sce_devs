# Matriz de Evidencia - Sprint 02

## Regla general de evidencia
- Cada caso P1 debe tener al menos 1 evidencia visual y 1 evidencia tecnica cuando aplique.
- Evidencia visual: captura completa de pantalla con fecha/hora visible del sistema.
- Evidencia tecnica: status API, payload o response relevante desde Network.
- Si el caso falla o queda bloqueado, adjuntar captura del error + ID de bug asociado.

## Nomenclatura de archivos
Formato recomendado:
CASO_RESULTADO_FECHA_HORA

Ejemplos:
- AUTH-03_PASS_2026-04-28_1855.png
- BUSQ-03_FAIL_2026-04-28_1910.png
- SALE-01_PASS_2026-04-28_1932_network.json

## Que corresponde como evidencia por caso P1

### AUTH-03 Sesion valida mantiene rutas privadas
Guardar en carpeta: AUTH
- Captura 1: login exitoso y redireccion a dashboard.
- Captura 2: refresh de pagina sin perder sesion.
- Tecnica: request de login con status 200.

### SEC-02 Ruta privada sin token
Guardar en carpeta: AUTH
- Captura 1: intento de entrar a dashboard sin token.
- Captura 2: redireccion a login o respuesta 401.
- Tecnica: request protegido con status 401.

### DASH-03 Dashboard por tenant sin 500
Guardar en carpeta: DASH
- Captura 1: tarjetas y grafica cargadas.
- Captura 2: sin errores visibles en UI.
- Tecnica: response dashboard status 200.

### USER-01 Vista usuarios con datos
Guardar en carpeta: USUARIOS
- Captura 1: listado visible con registros.
- Captura 2: detalle de al menos un usuario.
- Tecnica: request de usuarios status 200 + x-tenant-id enviado.

### SALE-01 Crear venta y descuento de stock
Guardar en carpeta: VENTAS
- Captura 1: formulario de venta antes de guardar.
- Captura 2: confirmacion de venta creada.
- Captura 3: stock actualizado en almacen.
- Tecnica: POST venta status 201/200 y data de detalle.

### SALE-02 Vista ventas con datos
Guardar en carpeta: VENTAS
- Captura 1: listado de ventas visible.
- Captura 2: modal o vista de detalle de venta.
- Tecnica: GET ventas y GET venta por id en status 200.

### BUSQ-03 Busqueda global funcional
Guardar en carpeta: BUSQ
- Captura 1: texto buscado en header.
- Captura 2: dropdown con resultados.
- Captura 3: navegacion al hacer click en resultado.
- Tecnica: GET busqueda-global status 200.

### TEN-02 Aislamiento por tenant en busqueda
Guardar en carpeta: BUSQ
- Captura 1: resultado de tenant 1.
- Captura 2: resultado de tenant 2 con busqueda equivalente.
- Captura 3: prueba negativa donde no debe aparecer dato cruzado.
- Tecnica: evidencia de tenant_id enviado en request.

### PERF-01 Perfil funcional
Guardar en carpeta: PERFIL
- Captura 1: menu Administracion abierto.
- Captura 2: click en Perfil con accion visible (navegacion o vista).
- Tecnica: ruta final o evento que confirme accion.

## Evidencia para bugs del header

### BUG-006 Campana sin accion
Guardar en carpeta: HEADER
- Captura antes del click y despues del click sin cambios.
- Video corto opcional de 5-10s mostrando falta de accion.

### BUG-007 Mensajes sin accion
Guardar en carpeta: HEADER
- Captura antes del click y despues del click sin cambios.
- Video corto opcional de 5-10s mostrando falta de accion.

### BUG-008 Perfil sin accion
Guardar en carpeta: PERFIL
- Captura de menu + click en Perfil + pantalla final sin cambio funcional.

### BUG-009 Ruta inconsistente usuarios
Guardar en carpeta: BUSQ
- Captura del resultado de busqueda tipo Usuario.
- Captura de ruta final en navegador.
- Tecnica: response que devuelve ruta distinta de la implementada.

### BUG-010 Riesgo multi-tenant
Guardar en carpeta: BUSQ
- Captura de busqueda desde tenant 1 mostrando dato de tenant 2 o prueba negativa.
- Tecnica: request/response comparativa tenant 1 vs tenant 2.

## Checklist rapido por evidencia
- Se ve claramente el caso ejecutado.
- Se ve resultado actual.
- Tiene fecha y hora.
- Nombre de archivo correcto.
- Esta en carpeta del modulo correcto.
- Si FAIL o BLOCKED, incluye Bug ID.
