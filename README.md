# S.R. Rithish Barath - Portfolio

This repository contains the source code for my personal portfolio, engineered from scratch using native HTML, CSS, and vanilla JavaScript without external dependencies. 

## Technical Architecture

The UI avoids standard flat layouts in favor of computationally driven DOM rendering and hardware-accelerated Canvas operations.

### 1. Advanced 3D Particle Rendering Engine `<canvas>`
The background features a custom 3D space rendering engine built natively on the HTML5 `<canvas>` API via `script.js`.
- **Coordinate Projection:** Computes and maps 1,500 individual particles using X, Y, and Z positional arrays.
- **Perspective Scaling:** Executes real-time focal length formulas to dynamically apply scale factoring and opacity fading on particles proportional to their Z-distance from the viewport.
- **Z-Axis Oscillation:** Implements a continuous sine-wave transformation (`Math.sin(time)`) bound to the camera's depth delta to produce a slow, mathematically stable "breathing" phase shifting effect without heavy computational payload.
- **Vector Interpolation:** Real-time extraction of DOM mouse events computes parallax translation over the focal camera.

### 2. Physical DOM Lighting Matrix
The frontend uses reactive CSS properties bounded to JavaScript mouse events to mimic physical light diffusion along container borders.
- **Proximity Calculation:** Maps exact `mousemove` X/Y coordinates relative to the bounds (`getBoundingClientRect()`) of individual UI `.card` nodes.
- **CSS Variable Injection:** Injects hardware-accelerated `--mouse-x` and `--mouse-y` dynamically triggered layout shifts into the DOM.
- **Boundary Rendering:** Renders a high-contrast radial gradient constrained beneath a `backdrop-filter` clipping mask to simulate localized 1px physical rim reflection, bypassing expensive WebGL shaders on standard DOM elements.

### 3. Asynchronous Render Profiling
Uses the native `IntersectionObserver` API structure to decouple scroll rendering bindings from the main thread.
- Defers element state transformations until they cross a `0.1` threshold intersecting the Viewport Root.
- Drastically reduces DOM paint recalculations on fast vertical scrolls by executing sub-node CSS transitions lazily instead of binding directly to rapid `scroll` event listeners.

## Deployment Stack
- HTML5 (Semantic Structure)
- CSS3 (Variables, Backdrop Filters, Dynamic Gradient Binding)
- Vanilla JS (Canvas Geometry, Intersections, Coordinate Mapping)
