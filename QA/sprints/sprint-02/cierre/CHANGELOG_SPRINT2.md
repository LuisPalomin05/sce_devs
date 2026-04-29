# Changelog Formal - Sprint 02

Fecha: 2026-04-28
Ambito: Frontend, Backend, QA
Estado: En curso

## 1) Mejoras implementadas

### 1.1 Dashboard operativo por tenant
- Se consolido la carga de metricas, actividad reciente y stock bajo en backend.
- El endpoint de dashboard responde correctamente con estructura de datos util para UI.
- Impacto QA: habilita retest de DASH-03 y regresion funcional.

Componentes relacionados:
- Backend/src/models/dashboardRepository.js
- Backend/src/controllers/dashboard.controller.js

### 1.2 Integracion funcional de Ventas
- Se implemento flujo completo de ventas en API: listar, ver detalle, crear y eliminar.
- La UI de Ventas consume endpoints con header de tenant para carga de datos.
- Impacto QA: habilita retest de SALE-01 y SALE-02.

Componentes relacionados:
- Backend/src/routes/ventasRoutes.js
- Backend/src/controllers/ventaController.js
- Backend/src/models/ventaRepository.js
- Frontend/src/pages/Ventas.jsx

### 1.3 Integracion funcional de Usuarios
- Se dispone de endpoints para listar, obtener roles, crear, actualizar y eliminar usuario.
- La vista de Usuarios consume datos reales y mapea estado activo/inactivo.
- Impacto QA: habilita retest de USER-01 y casos de administracion de usuarios.

Componentes relacionados:
- Backend/src/routes/usuarioRoutes.js
- Backend/src/models/userRepository.js
- Frontend/src/pages/Usuario.jsx

### 1.4 Exportacion PDF en modulo Usuarios
- Se agrego utilidad reusable de exportacion a PDF con tabla de datos.
- La funcionalidad se integra en la pantalla de Usuarios.
- Impacto QA: nuevo caso P2 USER-04.

Componentes relacionados:
- Frontend/src/utils/exportPDF.js
- Frontend/src/pages/Usuario.jsx

### 1.5 Gestion de sesion y tenant en frontend
- Se centraliza estado de autenticacion y tenant en contexto.
- Se restaura tenant desde almacenamiento local cuando existe sesion valida.
- Impacto QA: mejora consistencia en rutas privadas y escenarios de tenant activo.

Componentes relacionados:
- Frontend/src/context/AuthContext.jsx
- Frontend/src/routes/PrivateRoute.jsx

## 2) Pendientes criticos

### 2.1 Header: campana y mensajes sin accion
- Los iconos estan visibles pero no ejecutan comportamiento funcional al click.
- Riesgo: funcionalidad incompleta percibida por usuario final.
- Tracking QA: BUG-006 y BUG-007.

Componente relacionado:
- Frontend/src/components/HeaderPage.jsx

### 2.2 Perfil: ruta sin vista funcional
- El menu de Administracion navega a `/dashboard/perfil`, pero la vista no tiene contenido renderizado.
- Riesgo: flujo de perfil incompleto.
- Tracking QA: BUG-008.

Componentes relacionados:
- Frontend/src/components/CardPerfil.jsx
- Frontend/src/pages/Dashboard.jsx

### 2.3 Busqueda global: inconsistencia de ruta para usuarios
- El resultado de busqueda de tipo usuario apunta a `/usuarios` mientras frontend utiliza `/users`.
- Riesgo: navegacion fallida desde resultados.
- Tracking QA: BUG-009.

Componentes relacionados:
- QA/sql/QA_SEED_Y_PRUEBAS.sql
- Frontend/src/pages/Dashboard.jsx
- Frontend/src/components/HeaderPage.jsx

### 2.4 Riesgo multi-tenant en busqueda de usuarios
- La parte de usuarios en la consulta global presenta riesgo de no filtrar tenant en todos los casos.
- Riesgo: posible exposicion de datos entre tenants.
- Tracking QA: BUG-010 (y continuidad de BUG-001).

Componentes relacionados:
- QA/sql/QA_SEED_Y_PRUEBAS.sql
- Backend/src/routes/busquedaRoutes.js
- Backend/src/models/busquedaRepository.js

## 3) Estado para salida
- Recomendacion actual: Go condicional.
- Condiciones minimas para Go:
  1. Cierre de bugs S2 abiertos (BUG-008, BUG-009, BUG-010).
  2. Evidencia completa de casos P1.
  3. Retest exitoso de bloqueados heredados (USER-01, SALE-01, SALE-02).

## 4) Proximo bloque de validacion QA
1. Ejecutar BUSQ-03 y BUSQ-04 con evidencia visual y tecnica.
2. Ejecutar TEN-02 con tenant 1 y tenant 2.
3. Actualizar estado Jira a Listo para Retest / Cerrado segun resultado.
