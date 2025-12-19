# Portfolio Website

A modern, dark-neutral themed personal portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This project uses a unified visual system, a reusable component architecture, and a carefully structured codebase designed for clarity, scalability, and maintainability.

---

## 1. Project Overview

This portfolio is designed to be:
- **Clean, minimal, and professional**
- **Consistent in styling** across all UI elements
- **Easy to scale** with reusable component patterns
- **Fully theme-ready** with a dark-neutral palette
- **Developer-friendly**, offering clear folder structures and configuration strategies

The project includes a full Tailwind-based component system and supports rapid UI extension.

---

## 2. Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme extensions
- **Icons:** Lucide React
- **Animation (optional):** Framer Motion
- **Fonts:** Variable fonts through Next.js font optimization

---

## 3. Folder Structure

```
root
 ├── app/
 │   ├── layout.tsx
 │   ├── page.tsx
 │   ├── components/
 │   │   ├── ui/        # Tailwind-based shared UI components
 │   │   ├── sections/  # Page sections (Hero, About, Skills, Projects, etc.)
 │   │   └── core/      # Layout wrappers, containers, theme helpers
 │   └── styles/        # Global CSS
 ├── public/
 ├── tailwind.config.js
 ├── tsconfig.json
 ├── package.json
 └── README.md
```

---

## 4. Tailwind Theme & Styling System

### **Color Palette (Dark-Neutral Theme)**
A consistent palette used across cards, borders, backgrounds, and typography:

- `background`: `#0d0f11`
- `surface`: `#131518`
- `surface-light`: `#1b1e22`
- `border`: `#2a2e33`
- `text-primary`: `#ffffff`
- `text-secondary`: `#c7c9cc`
- `accent`: `#4f90ff`

### **Tailwind Extensions**
- Custom colors for dark-neutral UI
- Consistent shadows and rounded radii
- Standard spacing scale for sections
- Reusable animations for hovering and transitions

### **Design Principles Applied**
- A single card style used across every component
- Balanced spacing for readability
- Low contrast but still readable typography
- Zero inline styles; all consistent through classes

---

## 5. Reusable Component Architecture

The UI is built around **atomic, composable, reusable components**.

### **Core component types**
- `Card` – universal card container
- `Section` – consistent top-level page blocks
- `Container` – layout wrapper for max width and padding
- `Heading` – section header typography system

### **Feature components**
- `Hero`
- `ToolsStack`
- `Projects`
- `About`
- `Contact`

---

## 6. Setup and Installation

### Clone the Project
```
 git clone <repository-url>
 cd portfolio
```

### Install Dependencies
```
 npm install
```

### Run Development Server
```
 npm run dev
```

### Build for Production
```
 npm run build
```

### Preview Production Build
```
 npm run start
```

---

## 7. Configuration

### Environment Variables
Most portfolio setups do not require environment variables. Optional fields:
```
 NEXT_PUBLIC_GA_ID=
```

### Tailwind Configuration
Found in `tailwind.config.js`:
- Theme extensions
- Typography defaults
- Custom animations

### Global Styles
Editable in `app/styles/globals.css`:
- Base resets
- Scroll behavior
- Custom utility classes

---

## 8. Component Theming Rules

To keep UI consistency, follow this pattern:

- Use the **same base card class**: `bg-surface border border-border rounded-xl p-4 shadow-sm`
- Text always uses `text-primary` or `text-secondary`
- Spacing follows Tailwind’s `py-20` for sections
- Icons use fixed sizing (`w-5 h-5`)
- All hover effects are subtle (low-opacity accent borders)

---

## 9. Deployment

This project deploys seamlessly to:
- **Vercel** (recommended)
- Netlify
- Cloudflare Pages

### Deploy to Vercel
```
 vercel deploy
```

---

## 10. Future Enhancements

- Add light mode toggle
- Add mini-blog section
- Include animations for section transitions
- Add CMS integration (e.g., Sanity or Contentlayer)

---

## 11. License

This project is licensed under the MIT License.

---

## 12. Author

Etornam Kordzo Ahiataku (Tornam)
Student ~ Software Engineer
KNUST

---