# Playing Card Theme

A clean, minimalist design system themed around playing cards and the four suits.

## Design Philosophy

The entire portfolio is themed around a deck of playing cards with clean, minimal aesthetics. Every element ties back to the card metaphor while maintaining a professional, modern look.

## Color Palette

### Suit Colors

```css
Hearts:   #DC143C (Crimson Red)
Diamonds: #DC143C (Crimson Red)
Spades:   #1a1a1a (Deep Black)
Clubs:    #1a1a1a (Deep Black)
```

### Card Colors

```css
Card Face:   #F8F6F0 (Cream)
Card Back:   #0F52BA (Classic Blue)
Card Border: #1a1a1a (Black)
Accent:      #DC143C (Card Red)
```

### Background Colors

```css
Dark Mode:
  Background: #0a0a0a
  Surface:    #161616
  Border:     #2a2a2a

Light Mode:
  Background: #fafaf9
  Surface:    #ffffff
  Border:     #e5e5e5
```

## Suit Symbolism

Each project category is assigned a suit based on its characteristics:

### SPADES (Black - Technical)

- **Category**: AI Projects
- **Meaning**: Cutting-edge, technical sophistication
- **Examples**: ChainedChat, AI applications

### HEARTS (Red - User-Focused)

- **Category**: Product Projects
- **Meaning**: Human-centered, user experience
- **Examples**: NYU Purity Test, RSS Scraping Engine

### DIAMONDS (Red - Value)

- **Category**: Quant Projects
- **Meaning**: Precision, value creation, analytics
- **Examples**: Quantercise, 300-Member Platform

### CLUBS (Black - Creative)

- **Category**: Music Projects
- **Meaning**: Creative industries, entertainment
- **Examples**: HabitTracks, IG Account Tracker

## Components

### SuitIcon

Displays one of the four suit icons using Lucide icons.

```tsx
import SuitIcon from "@/components/shared/SuitIcon";

<SuitIcon suit="spades" size={24} />
<SuitIcon suit="hearts" size={20} className="text-suit-hearts" />
```

### PlayingCard

A card-styled container with rank and suit in corners.

```tsx
import PlayingCard from "@/components/shared/PlayingCard";

<PlayingCard suit="hearts" rank="A" showCorners={true} hover3D={true}>
  Card content here
</PlayingCard>;
```

### SuitPattern

Decorative background pattern with all four suits.

```tsx
import { SuitPattern } from "@/components/shared/SuitIcon";

<SuitPattern opacity={0.05} />;
```

## Usage Throughout Site

### Hero Section

- Four decorative suit icons in corners
- Spade icon accent next to name
- Maintains clean, open feel

### Navbar

- Spade icon in logo
- Minimal, professional appearance

### Footer

- All four suits as decorative divider
- Centered above footer content

### Project Cards

- Suit badge displayed with each project
- Automatically assigned by category
- Clean integration with card design

### Stats Section

- Stats displayed as playing cards
- Each card has rank and suit
- 3D hover effects for interaction

## Typography

### Headings

- Font: Playfair Display (serif)
- Weight: Bold (700)
- Purpose: Classic, sophisticated

### Body

- Font: Inter (sans-serif)
- Weight: Regular (400), Medium (500)
- Purpose: Clean, modern readability

## Visual Elements

### Borders

- 2px solid borders on cards
- Rounded corners (8px-16px)
- Clean, defined edges

### Shadows

- Subtle elevation shadows
- Increased on hover
- Natural depth perception

### Spacing

- Generous whitespace
- Clear visual hierarchy
- Room to breathe

## Icons

### Lucide Icons Only

No emojis are used anywhere in the design. All icons come from Lucide:

- Suit icons (Heart, Diamond, Club, Spade)
- UI icons (ArrowRight, ExternalLink, Github, etc.)
- Navigation icons (Menu, X, Sun, Moon)

## Animations

### Card Interactions

- 3D tilt on mouse move
- Rotation on hover
- Scale transformations
- All GPU-accelerated

### Scroll Effects

- Parallax card movements
- Fade in/out based on viewport
- Smooth, card-shuffling feel

## Accessibility

### Color Contrast

- All text meets WCAG AA standards
- Red suits: 4.5:1 minimum contrast
- Black suits: 7:1 minimum contrast

### Motion

- Respects `prefers-reduced-motion`
- Graceful degradation
- No motion sickness triggers

## Implementation Notes

### Tailwind Classes

```tsx
// Suit colors
className = "text-suit-hearts"; // Red text
className = "text-suit-spades"; // Black text
className = "fill-suit-diamonds"; // Red fill

// Card colors
className = "bg-cardTheme-face"; // Cream background
className = "border-cardTheme-border"; // Black border

// Accent
className = "text-accent"; // Card red
className = "bg-accent hover:bg-accent/90";
```

### Component Pattern

```tsx
// Every project has a suit
interface Project {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  // ...
}

// Display suit with project
<SuitIcon suit={project.suit} size={20} />;
```

## Best Practices

1. **Consistency**: Use suit colors consistently for their assigned categories
2. **Minimalism**: Don't overuse suit icons - strategic placement only
3. **Hierarchy**: Let content lead, theme supports
4. **Performance**: All icons are SVG, all animations GPU-accelerated
5. **Accessibility**: Never rely on color alone to convey meaning

## Future Enhancements

- [ ] Card flip animations for project reveals
- [ ] Shuffle effect on page transitions
- [ ] Deal animation for stats cards
- [ ] Card back pattern for loading states
- [ ] Full deck visualization for portfolio overview

---

**Theme**: Playing Cards  
**Style**: Clean Minimalism  
**Icons**: Lucide only, no emojis  
**Accent**: Crimson Red #DC143C
