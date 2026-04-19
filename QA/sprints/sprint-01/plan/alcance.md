# Alcance Sprint 01

## Incluido
1. Autenticación:
   - Login válido
   - Login inválido
   - Rutas protegidas sin token
2. Dashboard:
   - Carga general
   - Métricas por tenant
3. Almacén:
   - Listado
   - Crear/editar/eliminar producto
4. Ventas:
   - Crear venta
   - Ver detalle
   - Eliminar venta (devolver stock)
5. Búsqueda global:
   - Coincidencias por texto
   - Validación multi-tenant

## No incluido
- Pruebas de carga avanzadas
- Pentest
- Compatibilidad extensa de navegadores

## Riesgos prioritarios
- Fuga de datos entre tenants en búsqueda.
- Inconsistencia de stock al crear/eliminar ventas.
- Validaciones faltantes (precio/stock negativos).
