**Casos de Prueba para el Modelo Usuario**

*Descripción:*  
Este documento detalla los casos de prueba realizados para validar las funcionalidades del modelo Usuario.  
Los atributos del modelo Usuario son: **username**, **contraseña** y **rol**.

---

**1. Prueba Unitaria**

- **ID:** UT-USER-001  
- **Título:** Crear Usuario con Datos Válidos  
- **Tipo de Prueba:** Unitaria  
- **Módulo:** Usuario  
- **Precondiciones:**  
  - La función `crearUsuario` existe y se puede invocar.

- **Pasos a Seguir:**  
  1. Llamar a la función `crearUsuario` pasando el objeto `{ username: 'juan123', contraseña: 'pass123', rol: 'admin' }`.  
  2. Observar el valor de retorno.

- **Resultado Esperado:**  
  - La función debe retornar `true` o un objeto que indique que el usuario fue creado correctamente.

- **Resultado Obtenido:**  
  - Se retornó un error en el código del testeo.

- **Estado:** Reprobado

---

**2. Prueba de Integración**

- **ID:** INT-USER-001  
- **Título:** Endpoint para Crear Usuario  
- **Tipo de Prueba:** Integración  
- **Módulo:** Usuario  
- **Precondiciones:**  
  - El servidor de pruebas debe estar levantado.  
  - La base de datos de pruebas debe estar conectada y configurada.

- **Pasos a Seguir:**  
  1. Enviar una petición HTTP `POST /api/usuario/add` con el siguiente cuerpo JSON:  
     `{ "username": "juan123", "contraseña": "pass123", "rol": "admin" }`.  
  2. Observar la respuesta del servidor.

- **Resultado Esperado:**  
  - El endpoint debe retornar un código HTTP **201** y un objeto JSON que indique el éxito de la operación, por ejemplo, `{ "rowsAffected": 1 }`.

- **Resultado Obtenido:**  
  - Se retornó un error relacionado con un campo undefined en el objeto JSON.

- **Estado:** Reprobado

---

**3. Prueba de Regresión**

- **ID:** REG-USER-001  
- **Título:** Revalidar Creación de Usuario  
- **Tipo de Prueba:** Regresión  
- **Módulo:** Usuario  
- **Precondiciones:**  
  - Las pruebas unitarias e integración anteriores han sido exitosas.

- **Pasos a Seguir:**  
  1. Reejecutar la prueba de integración (INT-USER-001) después de realizar cambios en el código.  
  2. Comparar los resultados obtenidos con los anteriores.

- **Resultado Esperado:**  
  - La funcionalidad de creación de usuario debe seguir operando correctamente, retornando el código **201** y el objeto esperado (por ejemplo, `{ "rowsAffected": 1 }`).

- **Resultado Obtenido:**  
  - Se confirmó que la operación continúa funcionando correctamente después de las actualizaciones.

- **Estado:** Aprobado

---

**4. Prueba de Humo (Smoke Test)**

- **ID:** SMK-USER-001  
- **Título:** Verificar Disponibilidad del Endpoint para Usuarios  
- **Tipo de Prueba:** Humo  
- **Módulo:** Usuario  
- **Precondiciones:**  
  - El servidor de pruebas debe estar activo y en funcionamiento.

- **Pasos a Seguir:**  
  1. Enviar una petición HTTP `GET /api/usuario` (o el endpoint designado para listar usuarios).  
  2. Verificar que el servidor responda correctamente.

- **Resultado Esperado:**  
  - El endpoint debe responder con un código HTTP **200** y la respuesta debe ser un array (aunque esté vacío).

- **Resultado Obtenido:**  
  - Se obtuvo una respuesta correcta con un array, confirmando que el endpoint básico está operativo.

- **Estado:** Aprobado