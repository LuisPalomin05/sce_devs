# Alcance Sprint 02

## Incluido
1. Retest de bloqueados Sprint 01:
   - USER-01 Vista Usuarios con datos
   - SALE-01 Registro de venta
   - SALE-02 Vista Ventas con datos
2. Header global:
   - Busqueda funcional en todas las vistas
   - Campana y mensajes con accion definida o estado controlado
   - Menu de Administracion con opcion Perfil funcional
3. Seguridad multi-tenant:
   - Busqueda global no expone datos de otro tenant
   - Navegacion por resultados consistente con rutas reales
4. Integridad funcional:
   - Crear venta descuenta stock
   - Eliminar venta devuelve stock
   - Dashboard carga sin errores 500
5. Regression smoke:
   - Login invalido/valido
   - Rutas privadas sin token
   - Navegacion Dashboard/Ventas/Usuarios/Almacen

## No incluido
- Pruebas de carga avanzadas
- Pentest completo
- Compatibilidad extensiva de navegadores

## Riesgos prioritarios
- Fuga de datos en busqueda global (tenant).
- Rutas inconsistentes en resultados de busqueda (`/usuarios` vs `/users`).
- Header con acciones no implementadas (campana/mensaje/perfil).
