# Akram Naeemuddin - Portfolio Website

A modern, visually stunning portfolio website featuring animated scroll-stacking cards, glassmorphism effects, and smooth interactions. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 🎨 Design & Visual Effects
- **Dark Theme** with glassmorphism and frosted background effects
- **Animated Scroll-Stacking Cards** - sections behave like interactive stacked cards
- **3D Layering** with subtle parallax and scale effects
- **Gradient Typography** using Space Grotesk and Inter fonts
- **Soft Glows** and elegant spacing throughout

### 🔄 Animations & Interactions
- **Smooth Scroll Animations** triggered by intersection observer
- **Card Stacking Effect** - sections overlay smoothly as user scrolls
- **Floating Elements** with CSS animations in hero section
- **Skill Level Bars** with animated progress indicators
- **Timeline Animations** for experience section
- **Typewriter Effect** for hero title (optional)

### 📱 Responsive Design
- **Mobile-First Approach** with breakpoints at 768px and 480px
- **Hamburger Menu** for mobile navigation
- **Flexible Grid Layouts** adapting to different screen sizes
- **Touch-Friendly** buttons and interactive elements

### 🚀 Performance & Accessibility
- **Optimized Animations** using CSS transforms and opacity
- **Throttled Scroll Events** for 60fps performance
- **Intersection Observer** for efficient scroll detection
- **Keyboard Navigation** support
- **Screen Reader Friendly** with proper ARIA labels

## 📁 Project Structure

```
akram-portfolio/
├── index.html              # Main HTML structure
├── css/
│   └── style.css           # Complete styling with animations
├── js/
│   └── script.js           # Interactive functionality
├── images/                 # Portfolio images and assets
│   ├── profile.jpg         # Profile photo (400x400px)
│   ├── project1.jpg        # E-commerce project screenshot
│   ├── project2.jpg        # Task management app screenshot
│   ├── project3.jpg        # Data visualization dashboard
│   ├── coursera-logo.png   # Certification logos
│   ├── udemy-logo.png
│   ├── aws-logo.png
│   └── google-logo.png
├── CNAME                   # Custom domain configuration
└── README.md              # Project documentation
```

## 🎯 Sections Overview

### 1. **Hero Section**
- Bold typography with "Crafting Impactful Code"
- Animated floating tech icons (Python, React, JavaScript, Database)
- Call-to-action buttons with hover effects
- Scroll indicator with bounce animation

### 2. **About Me**
- Circular profile image with rotating border
- Personal introduction and biography
- Personality traits with icons and hover effects

### 3. **Skills & Technologies**
- Organized by categories (Languages, Frameworks, Tools)
- Animated progress bars showing skill levels
- Technology icons with glassmorphism cards

### 4. **Featured Projects**
- Horizontal scrollable project cards
- Image overlays with GitHub and live demo links
- Technology tags for each project
- Hover effects with image scaling

### 5. **Experience**
- Vertical timeline with animated entry
- Company logos and job descriptions
- Date ranges and role progression
- Responsive timeline design

### 6. **Certifications**
- Badge-style layout with platform logos
- Institution names and completion dates
- Grid layout adapting to screen size

### 7. **Contact**
- Interactive contact form with floating labels
- Form validation and success/error notifications
- Social media links with hover animations
- Location and email information

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with custom properties
  - CSS Grid and Flexbox for layouts
  - CSS Transforms and Transitions
  - Custom animations and keyframes
  - Backdrop-filter for glassmorphism
- **JavaScript (ES6+)** - Interactive functionality
  - Intersection Observer API
  - Form validation and submission
  - Scroll event handling with throttling
  - Dynamic animations and effects

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/akramnaeemuddin/akramnaeemuddin.github.io.git
   cd akram-portfolio
   ```

2. **Add your images**
   - Replace placeholder images in the `images/` folder
   - Update image paths in HTML if needed
   - Optimize images for web (WebP format recommended)

3. **Customize content**
   - Update personal information in `index.html`
   - Modify project details and links
   - Adjust color scheme in CSS custom properties
   - Update social media links

4. **Deploy**
   - Push to GitHub Pages
   - Or deploy to your preferred hosting platform
   - Ensure CNAME file points to your custom domain

## 🎨 Customization

### Color Scheme
Update CSS custom properties in `:root` to change the color palette:
```css
:root {
    --primary-color: #6366f1;      /* Primary blue */
    --secondary-color: #8b5cf6;    /* Purple accent */
    --accent-color: #06b6d4;       /* Cyan highlight */
    --background-dark: #0f0f23;    /* Dark background */
    /* ... other colors */
}
```

### Typography
Fonts are loaded from Google Fonts:
- **Primary**: Inter (body text)
- **Display**: Space Grotesk (headings)

### Animations
Adjust animation timings and easing functions:
```css
:root {
    --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
    --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
}
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Note: Some advanced CSS features like `backdrop-filter` may have limited support in older browsers.

## 🔧 Development

### Local Development
Simply open `index.html` in a modern browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

### Performance Tips
- Optimize images (use WebP format)
- Minify CSS and JavaScript for production
- Enable gzip compression on server
- Use CDN for external resources

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you create improvements or fixes, pull requests are welcome!

## 📧 Contact

- **Email**: akram@naeemuddin.me
- **GitHub**: [@akramnaeemuddin](https://github.com/akramnaeemuddin)
- **LinkedIn**: [Akram Naeemuddin](https://linkedin.com/in/akramnaeemuddin)

---

**Crafted with ❤️ and lots of coffee** ☕