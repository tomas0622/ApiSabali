# Casos de Prueba de Navegación - Sabali

## NAV-LOGIN-001: Navegación correcta después de iniciar sesión

- **Tipo:** Prueba de Navegación
- **Ruta:** /login
- **Pasos:**
  1. Ir a `/login`.
  2. Ingresar credenciales válidas (usuario y contraseña).
  3. Click en el botón "Iniciar sesión".
  4. Verificar que la URL redirige a `/menu`.
- **Resultado Esperado:** El usuario debe ser redirigido correctamente a `/menu`.

---

## NAV-INSUMOS-001: Navegación hacia la página de Insumos

- **Tipo:** Prueba de Navegación
- **Ruta:** /home
- **Pasos:**
  1. Estar en la página principal `/menu`.
  2. Hacer click en el enlace o botón que diga "Insumos".
  3. Verificar que la URL cambia a `/insumo`.
- **Resultado Esperado:** El usuario debe ser redirigido correctamente a `/insumo`.