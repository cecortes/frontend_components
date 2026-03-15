# Guía de Estilos y Diseño UI - WARESmart

Este documento establece las reglas, recursos y parámetros del Sistema de Diseño que todo componente de WARESmart debe respetar, basado en la fuente de verdad principal (`src/style.css`).

## 1. Filosofía de Diseño
El proyecto utiliza un tema **Refined Dark Theme** (Tema oscuro refinado y suavizado).
- **Enfoque principal:** Crear una aplicación de control de inventarios profesional.
- Evitar contrastes ultra altos (negros puros o blancos puros) a favor de tonos grisáceos oscuros (Steel Gray) para los fondos y acentos suavizados.
- **Mobile-First:** Las clases base asumen vistas móviles, extendiendo el diseño a resoluciones mayores usando Media Queries progresivas (`@media (min-width: 640px)`).

## 2. Tipografía
Todo el proyecto se basa en la fuente principal de Google Fonts: **Work Sans**.

- **Pesos soportados:** 300, 400, 500, 600, 700.
- **Fallbacks:** `system-ui, -apple-system, sans-serif`.
- **Jerarquía:**
  - `h1`: 2.5rem, Font Weight 700
  - `h2`: 2.0rem, Font Weight 600
  - `h3` a `h6`: Pesos a 600, y de 1.5rem hacia abajo.
  - `p` y textos base: `color-text-secondary`, Font Weight 400.
- **Renderizado:** Anti-aliased y con un `line-height` ideal de 1.6.

## 3. Paleta de Colores (Design Tokens)
Se establecen variables CSS nativas que DEBEN usarse para cualquier color nuevo. Nunca quemar códigos `#Hex` directamente en el código de los componentes.

### Fondos y Superficies (Steel Gray Tones)
- **Fondo Principal:** `--color-background-primary` (`#1a1f2e`) - Usado para el `body`.
- **Fondo Secundario:** `--color-background-secondary` (`#252b3b`) - Inputs, áreas secundarias.
- **Superficies (Cards, Modales):** `--color-surface` (`#2d3548`), elevaciones y hovers en `--color-surface-elevated` y `--color-surface-hover`.

### Colores de Texto
- **Primario:** `--color-text-primary` (`#e2e8f0`) - Textos grandes y títulos.
- **Secundario:** `--color-text-secondary` (`#cbd5e1`) - Párrafos regulares.
- **Muted & Disabled:** `--color-text-muted` (`#94a3b8`) y `--color-text-disabled`.

### Colores de Acento
- **Primario (Soft Cyan):** Base `--color-primary-500` (`#3b8ec2`). Color corporativo del app para botones, enlaces resaltados focus states de validación.
- **Secundario (Soft Amber):** Base `--color-secondary-500` (`#f0b454`).

### Colores Semánticos (Inventario y Estados)
- **Crítico / Error (Soft Red):** `--color-critical-500` (`#e53935`).
- **Stock Bajo / Warning (Soft Orange):** `--color-low-500` (`#f97316`).
- **Stock Normal / Info (Soft Blue):** `--color-normal-500` (`#3b8ec2`).
- **Stock Alto / Success (Soft Green):** `--color-high-500` (`#2fb865`).

## 4. Componentes y Elementos UI

### Botones (`.btn`)
Todo botón principal debe pertenecer a la clase `.btn`.
- `border-radius: 8px`
- **Variante `.btn-primary`:** Fondo en Soft Cyan (`--color-primary-500`), color de texto blanco. 
- **Efectos Hover:** Transición de 0.25s moviendo elementos hacia arriba en Y (`transform: translateY(-1px)`) más elevación mediante `box-shadow`.

### Tarjetas (`.card`)
Usado principalmente como envoltura de módulos o dashboards.
- `border-radius: 12px`
- Borde sutil de un pixel (`--color-border-subtle`).
- **Efectos Hover:** Movimiento vertical y caída sombra para resaltar interactividad.

### Inputs de Formulario (y grupos)
- Diseño basado en el patrón `.input-group` > `.input-wrapper` > `.input-field` e `.input-icon`.
- `height: 48px`, `border-radius: 8px`.
- Interacciones claras de `:focus` que incluyen sombras tenues (cyan) para enmarcar validación.
- Mensajes de error como `.validation-tooltip` que se ubican bajo el campo.

### Etiquetas de Nivel de Stock (`.badge`)
Etiquetas estilo "píldora" con texto en miniatura con mayúsculas.
- `padding: 0.35rem 0.85rem`
- `border-radius: 6px`
- Texto `uppercase` de `0.875rem` para diferenciar rápidamente la condición de un objeto del almacén (Variedades: `.badge-critical`, `.badge-low`, `.badge-normal`, `.badge-high`).

## 5. Efectos, Transiciones y Utilidades
- **Animaciones CSS:** Todo micro-movimiento o popup suele apoyarse en la animación `@keyframes fadeInDown` o en la clase utilitaria `@utility smooth-transition`.
- **Efectos Glossy / Neón:** Si un texto u borde requiere destacar (estado crítico, notificaciones), se permite usar `@utility text-glow` o `@utility border-glow` las cuales aplican una sombra colorizada.

## 6. Manejo de Tailwind
En el proyecto co-existen las herramientas de `@tailwindcss / @theme` integradas en el archivo, lo que permite aprovechar configuraciones de diseño híbridas, sin embargo, el grueso del sistema de componentes se centraliza en clases `.card`, `.btn`, etc. dentro de este mismo stylesheet para lograr encapsulamiento.
