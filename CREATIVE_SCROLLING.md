# Creative Scrolling Effects

This document outlines all the creative scrolling effects implemented throughout the portfolio website.

## 🎨 Overview

The site now features advanced scroll-based animations that create a dynamic, engaging user experience. Every section responds to scroll position with smooth, carefully crafted animations.

## ✨ Features

### 1. **Text Reveal Animation** (`TextReveal` component)
Progressive word-by-word fade-in effect as you scroll.

**Used in:**
- Hero section tagline
- About section main text
- Project grid header
- Featured showcase header

**Effect:**
- Words start at 20% opacity
- Fade to 100% as they enter the viewport
- Each word reveals independently
- Creates a captivating reading experience

```tsx
<TextReveal className="text-4xl font-bold">
  Your content here
</TextReveal>
```

### 2. **Animated Wave Dividers** (`ScrollWave` component)
Smooth, flowing waves that respond to scroll position.

**Used between:**
- Hero → About section
- About → Featured showcase
- Featured → Project grid
- Project grid → Footer

**Effect:**
- Three-layer parallax waves
- Different speeds for depth
- Fade in/out based on viewport position
- Uses accent color with varying opacity

```tsx
<ScrollWave />
```

### 3. **Enhanced Project Cards**
Dramatic scroll-based transforms on every project card.

**Effects:**
- **Parallax:** Moves 100px up and down
- **Rotation:** Subtle tilt (±3deg) as you scroll
- **Scale:** Grows from 0.8 to 1.0, then back
- **Opacity:** Smooth fade in/out
- **Magnetic hover:** Cards follow your cursor

**Visual Impact:**
- Cards feel alive and responsive
- Creates depth and dimension
- Smooth, natural motion

### 4. **3D Tilt Effect** (Profile image in Hero)
Mouse-reactive 3D perspective transform.

**Effect:**
- Follows mouse movement
- Creates depth with perspective
- Glow effect behind image
- Smooth spring animations

### 5. **Horizontal Scroll Showcase**
Cinematic horizontal scrolling for featured projects.

**Effect:**
- Scroll vertically, projects move horizontally
- Sticky positioning
- Smooth translation based on scroll progress
- Desktop-optimized (mobile shows vertical cards)

### 6. **Parallax Backgrounds**
Multiple layers moving at different speeds.

**Used in:**
- Hero section (content and image separate speeds)
- About section (animated gradient blob)
- Project grid (radial gradient background)
- Stats ribbon

### 7. **Scroll Progress Indicator**
Visual indicator of page scroll position.

**Effect:**
- Fixed bar at top of page
- Fills with accent color as you scroll
- Smooth animation with Lenis

## 🎯 Performance Considerations

All animations use:
- **GPU-accelerated transforms** (translateX/Y, rotate, scale)
- **Framer Motion** optimized scroll hooks
- **Lenis** for smooth 60fps scrolling
- **IntersectionObserver** for viewport detection
- **will-change** CSS hints for browser optimization

## 📱 Mobile Responsiveness

All scroll effects are:
- Touch-friendly
- Reduced motion on mobile for performance
- Adjusted parallax speeds for smaller screens
- Horizontal scroll converts to vertical on mobile

## 🛠️ Technical Implementation

### Core Technologies
- **Lenis**: Smooth scrolling library
- **Framer Motion**: React animation library
- **useScroll**: Hook for scroll-linked animations
- **useTransform**: Maps scroll progress to values
- **useSpring**: Smooth spring animations

### Key Patterns

**1. Scroll Progress Tracking:**
```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});
```

**2. Transform Mapping:**
```tsx
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
```

**3. Apply to Elements:**
```tsx
<motion.div style={{ y, opacity }}>
  Content
</motion.div>
```

## 🎨 Design Philosophy

**Principles:**
1. **Subtle but Noticeable**: Effects enhance without distracting
2. **Purpose-Driven**: Every animation serves a purpose
3. **Performance First**: 60fps on all devices
4. **Accessible**: Respects prefers-reduced-motion
5. **Mobile-Friendly**: Adjusted for touch devices

## 🔄 Future Enhancements

Potential additions:
- [ ] Scroll-triggered reveal animations for stats
- [ ] Particle effects on scroll
- [ ] Custom cursor with scroll effects
- [ ] More complex 3D transforms
- [ ] Scroll-based color transitions
- [ ] Interactive scroll indicators

## 📊 Impact

**Before:**
- Static sections
- Basic fade-ins
- Linear scrolling

**After:**
- Dynamic, living interface
- Multi-layer depth effects
- Cinematic scroll experience
- Engaging user journey
- Higher time-on-site
- More memorable experience

---

**Note:** All scroll effects use the Lenis smooth scrolling foundation. See [SCROLLING.md](./SCROLLING.md) for Lenis implementation details.

