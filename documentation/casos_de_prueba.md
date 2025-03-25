# Casos de Prueba para el Modelo Usuario

## 1. Prueba Unitaria

**ID:** UT-USER-001  
**Título:** Crear Usuario con Datos Válidos  
**Tipo:** Prueba Unitaria  
**Módulo:** Usuario  
**Precondiciones:**  
- La función `crearUsuario` existe y se puede invocar.  
**Pasos a Seguir:**  
1. Llamar a `crearUsuario({ username: 'juan123', contraseña: 'pass123', rol: 'admin' })`  
2. Observar el valor de retorno.  
**Resultado Esperado:**  
- La función retorna `true` o un objeto que indica que el usuario fue creado correctamente.  
**Resultado Obtenido:**  
- Se completará al ejecutar la prueba.  
**Estado:** Pendiente / Aprobado / Fallido

---

## 2. Prueba de Integración

**ID:** INT-USER-001  
**Título:** Endpoint para Crear Usuario  
**Tipo:** Prueba de Integración  
**Módulo:** Usuario  
**Precondiciones:**  
- El servidor de pruebas está levantado.  
- La base de datos de pruebas está conectada.  
**Pasos a Seguir:**  
1. Enviar una petición HTTP `POST /usuarios` con el body:
   ```json
   {
     "username": "juan123",
     "contraseña": "pass123",
     "rol": "admin"
   }
