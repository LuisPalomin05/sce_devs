# Reporte de Bugs QA

## Severidad
- **S1 Bloqueante:** no permite usar una función crítica.
- **S2 Alta:** funcionalidad importante falla, workaround limitado.
- **S3 Media:** falla parcial, con workaround.
- **S4 Baja:** detalle visual/texto.

## Plantilla (copiar y pegar)
**Título:** [Módulo] acción + resultado incorrecto

**Pasos para reproducir:**
1. 
2. 
3. 

**Esperado:**

**Actual:**

**Evidencia:**
- Captura/video
- Query o endpoint usado

**Severidad:** S1 / S2 / S3 / S4

## Ejemplo 1 (Seguridad - Multi-tenant)
**Título:** [Búsqueda global] Tenant A visualiza usuario de Tenant B

**Pasos para reproducir:**
1. Iniciar sesión como usuario del Tenant A.
2. Ir al buscador global.
3. Buscar `Pedro`.

**Esperado:**
Solo mostrar resultados del Tenant A.

**Actual:**
Se muestra un usuario del Tenant B.

**Evidencia:**
- Captura del resultado.
- Query: `CALL sp_busqueda_global('Pedro', 1);`

**Severidad:** S2

## Ejemplo 2 (Validación)
**Título:** [Almacén] Permite guardar producto con stock negativo

**Pasos para reproducir:**
1. Ir a Almacén > Crear producto.
2. Completar nombre y precio válidos.
3. Ingresar stock `-5` y guardar (ejemplo con producto `Laptop`).

**Esperado:**
Bloquear guardado y mostrar validación.

**Actual:**
Se guarda producto con stock negativo.

**Evidencia:**
- Captura del formulario.
- Registro en listado.

**Severidad:** S3

## Ejemplo 3 (UI/UX)
**Título:** [Login] No muestra mensaje con credenciales inválidas

**Pasos para reproducir:**
1. Abrir login.
2. Ingresar credenciales inválidas.
3. Presionar ingresar.

**Esperado:**
Mostrar “Credenciales inválidas”.

**Actual:**
No aparece mensaje.

**Evidencia:**
- Video corto.
- Consola/network (si aplica).

**Severidad:** S3
