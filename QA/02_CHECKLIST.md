# QA Checklist (SCEDATABASE)

## Control de ejecución
- Proyecto/Módulo: PROintegrador (Auth, Dashboard, Almacén, Ventas, Usuarios)
- Sprint/Release: Sprint 01
- Entorno: `Local` / `QA` / `Staging`
- Fecha de ejecución: 16/04/2026
- Ejecutado por: QA manual
- Build/Commit validado: N/D (sin hash registrado en evidencia)

## Criterio de salida sugerido
- Smoke: 100% de casos críticos en `Pass`.
- Regression: sin defectos abiertos `Sev 1` o `Sev 2`.
- Evidencia: 1 captura o 1 registro API por caso crítico.
- Trazabilidad: cada `Fail`/`Blocked` con Bug ID.

### Estado de salida Sprint 01
- Resultado: `Go condicional`
- Resumen: 8 ejecutados / 5 Pass / 0 Fail / 3 Blocked
- Riesgo activo: integración de datos en UI de `Usuarios` y `Ventas`

## Smoke Test (cada despliegue)

### Acceso y sesión
- [ ] Carga login sin errores visuales
- [x] Login válido funciona
- [x] Login inválido muestra mensaje claro
- [ ] Logout redirige correctamente
- [x] Rutas privadas bloqueadas sin sesión

### Navegación principal
- [ ] Sidebar funciona
- [x] Dashboard carga
- [ ] HomeDashboard carga
- [ ] Configuración carga
- [x] Almacén carga
- [ ] Ventas carga

### Módulos base
- [x] Listado principal responde
- [ ] Crear registro básico funciona
- [ ] Datos persisten tras recargar
- [ ] Búsqueda devuelve resultados esperados

### Datos por tenant
- [x] Tenant 1 muestra `Laptop`, `Mouse`, `Cemento`, `Cable eléctrico`
- [ ] Tenant 2 muestra `Paracetamol`, `Ibuprofeno`, `Termómetro digital`
- [ ] Búsqueda global de Tenant 1 no debe ver productos de Tenant 2
- [ ] Búsqueda global de Tenant 2 no debe ver productos de Tenant 1

### Salud técnica
- [ ] Sin errores críticos en consola
- [ ] Sin errores 500 repetitivos en network
- [ ] Mensajes de error entendibles

## Regression Test (diaria/pre-entrega)

### Casos negativos
- [ ] Campos obligatorios vacíos validan
- [ ] Texto largo no rompe UI
- [ ] Caracteres especiales no rompen flujo
- [ ] API en error muestra manejo correcto

### Seguridad funcional
- [x] Sin token no entra a rutas privadas
- [ ] Token inválido/expirado redirige a login
- [ ] Sin exposición de información sensible

### Consistencia de datos
- [ ] No duplica registros sin motivo
- [ ] Refresco mantiene estado esperado
- [ ] Filtros/búsquedas no alteran datos
- [ ] Total de venta coincide con suma de detalles
- [ ] Crear venta descuenta stock
- [ ] Eliminar venta devuelve stock

### UI/UX
- [ ] Responsive básico usable
- [ ] Botones clave visibles y clickeables
- [ ] Textos claros y consistentes

## Checklist rápida para PR (5 min)
- [x] Flujo principal afectado funciona
- [ ] Login/Logout intactos
- [x] Rutas privadas intactas
- [ ] Sin errores nuevos visibles
- [x] Evidencia adjunta en ticket/PR


## Validación SQL rápida (opcional)
- [x] `CALL sp_get_productos(1);`
- [x] `CALL sp_get_ventas(1);`
- [x] `CALL sp_dashboard(1);`
- [ ] `CALL sp_busqueda_global('Laptop', 1);`

