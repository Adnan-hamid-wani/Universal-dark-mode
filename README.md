# Universal Darkmode


Zero-config dark mode for React applications with Tailwind CSS. Add dark mode to your entire application with just one line of code!

## Features

- 🌓 Smooth dark/light mode transitions
- 💾 Persists user preferences
- 🎨 Customizable styling
- 🎯 Selective dark mode exclusion
- 📱 Fully responsive
- ⚛️ React 18+ support
- 🎨 Tailwind CSS integration

## Installation

```bash
npm install @adnanwani/universal-darkmode
```

## Quick Start

1. Wrap your app with `DarkModeProvider`:

```jsx
import { DarkModeProvider } from '@adnanwani/universal-darkmode';

function App() {
  return (
    <DarkModeProvider>
      {/* Your app content */}
    </DarkModeProvider>
  );
}
```

2. Add the toggle button wherever you want:

```jsx
import { DarkModeToggle } from '@adnanwani/universal-darkmode';

function Navbar() {
  return (
    <nav>
      <DarkModeToggle />
    </nav>
  );
}
```

3. Configure Tailwind CSS:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Usage

### Basic Example

```jsx
import { DarkModeProvider, DarkModeToggle } from '@adnanwani/universal-darkmode';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen p-8">
        <DarkModeToggle className="mb-4" />
        <div className="p-6 rounded-lg border">
          <h1 className="text-2xl font-bold">Hello Dark Mode!</h1>
          <p>This content will automatically adapt to dark mode.</p>
        </div>
      </div>
    </DarkModeProvider>
  );
}
```

### Excluding Elements from Dark Mode

Use the `no-dark-mode` class to keep elements in their original styling:

```jsx
<div className="p-6 rounded-lg no-dark-mode bg-blue-100">
  <h2 className="text-blue-900">This stays blue in both modes!</h2>
</div>
```

### Using the Dark Mode Hook

```jsx
import { useDarkMode } from '@adnanwani/universal-darkmode';

function CustomComponent() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div>
      <p>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
}
```

### Provider Options

```jsx
<DarkModeProvider defaultDark={true}>
  {/* Content */}
</DarkModeProvider>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultDark` | boolean | `false` | Initial dark mode state |
| `children` | ReactNode | - | Child components |

### Toggle Button Props

```jsx
<DarkModeToggle className="custom-class" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional CSS classes |

## Styling

The library automatically handles dark mode transitions and applies appropriate styles based on the current theme. It uses CSS variables for theme colors which can be customized in your CSS:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --border-color: #e5e7eb;
}

.dark {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --border-color: #374151;
}
```

## Browser Support

- Chrome (and Chromium-based browsers)
- Firefox
- Safari
- Edge

## Requirements

- React 18 or higher
- Tailwind CSS 3.0 or higher

## License

MIT