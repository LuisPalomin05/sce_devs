# Reporte de Bugs - Sprint 02

## BUG-006 - Header campana sin accion
- Severidad: S3
- Modulo: Frontend / Header global
- Entorno: Local
- Precondicion: Sesion iniciada

### Pasos
1. Ingresar al sistema.
2. Ir a Dashboard (o Ventas/Usuarios/Almacen).
3. Hacer click en icono campana.

### Resultado actual
No ocurre ninguna accion visual ni funcional.

### Resultado esperado
Debe abrir panel/notificaciones o feedback controlado de funcionalidad no disponible.

### Evidencia
- Captura header en vista Dashboard.

---

## BUG-007 - Header mensajes sin accion
- Severidad: S3
- Modulo: Frontend / Header global
- Entorno: Local
- Precondicion: Sesion iniciada

### Pasos
1. Ingresar al sistema.
2. Ir a Dashboard (o Ventas/Usuarios/Almacen).
3. Hacer click en icono mensajes.

### Resultado actual
No ocurre ninguna accion visual ni funcional.

### Resultado esperado
Debe abrir panel de mensajes/chat o feedback controlado de funcionalidad no disponible.

### Evidencia
- Captura header en vista Dashboard.

---

## BUG-008 - Opcion Perfil sin accion funcional
- Severidad: S2
- Modulo: Frontend / Card Perfil
- Entorno: Local
- Precondicion: Sesion iniciada

### Pasos
1. Hacer click en Administracion.
2. Hacer click en opcion Perfil.

### Resultado actual
No se abre una vista funcional de perfil.

### Resultado esperado
Debe navegar a una vista de perfil implementada o mostrar estado controlado.

### Evidencia
- Captura menu Administracion con opcion Perfil.

---

## BUG-009 - Ruta inconsistente en busqueda de usuarios
- Severidad: S2
- Modulo: Frontend/Backend / Busqueda global
- Entorno: Local
- Precondicion: Sesion iniciada, tenant activo

### Pasos
1. Escribir nombre de usuario en buscador global.
2. Seleccionar resultado tipo Usuario.

### Resultado actual
Navegacion falla o no llega a pantalla esperada.

### Resultado esperado
Debe navegar a la ruta valida de usuarios del frontend.

### Nota tecnica
- Frontend usa `/users`.
- SP de busqueda retorna `/usuarios`.

### Evidencia
- Captura del resultado seleccionado y ruta final.

---

## BUG-010 - Riesgo multi-tenant en busqueda de usuarios
- Severidad: S2
- Modulo: Backend / Busqueda global
- Entorno: Local con tenant 1 y tenant 2
- Precondicion: Datos de usuarios en ambos tenants

### Pasos
1. Iniciar sesion en tenant 1.
2. Buscar usuario conocido de tenant 2.

### Resultado actual
Existe riesgo de retorno de usuarios fuera del tenant activo.

### Resultado esperado
Solo deben retornarse usuarios del tenant activo.

### Evidencia
- Log/API response por tenant.
