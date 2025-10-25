# Lenis Smooth Scrolling Implementation

This portfolio uses the [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling library to create a modern, aesthetic, and buttery-smooth scrolling experience.

## Features

### 🎨 **Smooth Scrolling**

- Buttery smooth scroll interpolation using Lenis
- Customized easing function for natural deceleration
- Optimized for both desktop and mobile devices

### 📊 **Scroll Progress Indicator**

- Animated progress bar at the top of the page
- Shows reading progress as you scroll
- Synced with Lenis scroll position

### 🎭 **Parallax Effects**

#### Hero Section

- Content parallax: Moves slower than scroll (50% speed)
- Opacity fade: Gradually fades as you scroll down
- Scale effect: Subtle zoom out for depth
- Animated scroll indicator with smooth bounce

#### Stats Ribbon

- Subtle vertical parallax movement
- Counters animate when scrolling into view

#### Project Grid

- Animated background gradient that moves with scroll
- Each project card has individual parallax
- Scroll-triggered fade and slide animations
- Hover effects with smooth transitions

### 🎯 **Scroll-Triggered Animations**

- Elements animate into view as you scroll
- Viewport margin detection for early/late triggers
- Staggered animations for grid items
- Once-only animations for performance

### 🔗 **Smooth Navigation**

- Anchor links scroll smoothly to sections
- Customizable offset for fixed navbar
- Duration-based easing for precise control

## Technical Implementation

### Provider Setup

```tsx
// src/components/providers/LenisProvider.tsx
<LenisProvider>
  <YourApp />
</LenisProvider>
```

The provider:

- Initializes Lenis with custom configuration
- Adds the `lenis` class to HTML element
- Exposes global `window.lenis` for programmatic control
- Manages requestAnimationFrame loop
- Cleans up on unmount

### Configuration

```tsx
const lenis = new Lenis({
  duration: 1.2, // Scroll duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  orientation: "vertical", // Vertical scrolling
  gestureOrientation: "vertical",
  smoothWheel: true, // Enable smooth wheel
  wheelMultiplier: 1, // Wheel sensitivity
  touchMultiplier: 2, // Touch sensitivity (mobile)
  infinite: false, // No infinite scroll
});
```

### Custom Hooks

#### `useScrollProgress()`

Returns scroll progress from 0 to 1

```tsx
const progress = useScrollProgress();
// Use for progress bars, animations, etc.
```

#### `useInViewScroll()`

Provides both intersection observer and scroll progress

```tsx
const { ref, isInView, scrollProgress } = useInViewScroll();
// ref: Attach to element
// isInView: Boolean for visibility
// scrollProgress: 0-1 as element moves through viewport
```

### Parallax Implementation

```tsx
// Hero section parallax
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

<motion.div style={{ y, opacity, scale }}>{/* Content */}</motion.div>;
```

### Programmatic Scrolling

```tsx
// Smooth scroll to element
if (window.lenis) {
  window.lenis.scrollTo(element, {
    offset: -80, // Offset for fixed navbar
    duration: 1.5, // Animation duration
  });
}
```

## Performance Optimizations

### 1. **RAF Loop**

Uses requestAnimationFrame for smooth 60fps animations

### 2. **Viewport Margins**

```tsx
viewport={{ once: true, margin: "-100px" }}
```

Triggers animations before element is fully visible

### 3. **Once-only Animations**

Most animations trigger once to avoid repeated reflows

### 4. **Passive Event Listeners**

```tsx
{
  passive: true;
}
```

Improves scroll performance

### 5. **CSS Hardware Acceleration**

Transform properties use GPU acceleration

## Mobile Responsiveness

### Touch Scrolling

- Native touch feel with `touchMultiplier: 2`
- No smooth interpolation on touch for better performance
- Gestures work naturally on mobile devices

### Scroll Indicator

- Hidden on mobile devices (`hidden md:block`)
- Only shown on desktop where it's more useful

### Reduced Parallax

- Parallax effects are subtle to work well on all devices
- No jarring movements on smaller screens

## CSS Customization

```css
/* Lenis smooth scrolling */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
```

## Disable Scrolling

To temporarily disable smooth scrolling:

```tsx
window.lenis?.stop(); // Stop
window.lenis?.start(); // Resume
```

## Browser Support

Works in all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

## Tips for Custom Animations

### 1. Use `useScroll` for Parallax

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});
```

### 2. Combine with Framer Motion

```tsx
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
<motion.div style={{ y }}>
```

### 3. Add Viewport Detection

```tsx
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
```

### 4. Optimize Transforms

Use `transform` CSS properties (translate, scale, rotate) instead of positioning for better performance.

## Future Enhancements

Potential additions:

- Horizontal scrolling sections
- Scroll-jacking for specific sections
- Custom scroll snapping
- More complex parallax scenes
- Scroll-linked SVG animations

## Resources

- [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- [Framer Motion Scroll](https://www.framer.com/motion/scroll-animations/)
- [Web Animations Performance](https://web.dev/animations/)

---

**Note**: All scrolling animations are designed to be subtle and enhance the user experience without being distracting. The focus is on smooth, professional motion that guides the user through the content.
