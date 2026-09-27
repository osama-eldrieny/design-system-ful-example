# React Design System Dashboard

A production-ready React application built with components from your Figma design system using design tokens and TypeScript.

## 📦 Components Included

- **Button** - Primary/Secondary, Filled/Text styles, multiple sizes
- **Card** - Reusable content container with image, title, and description
- **Alert** - Primary, Success, Warning, Error variants
- **InputField** - Text input with label, error states, and helper text
- **Avatar** - Small, Medium, Large sizes with initials support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm or yarn

### Installation

```bash
cd /Users/oo/Desktop/design-system/react-app
npm install
```

### Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎨 Design System Integration

All components use CSS variables from your design system (`tokens.css`):

- Color tokens (primary, secondary, success, warning, error)
- Typography tokens (font families, sizes, weights)
- Spacing tokens (padding, gaps, margins)
- Border tokens (radius, widths)
- Shadow tokens

### Using Components

```tsx
import { Button, Card, Alert, InputField, Avatar } from './components';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" style="filled">
        Click Me
      </Button>

      <Card
        title="My Card"
        description="Card content goes here"
        image={<span>📦</span>}
      />

      <Alert
        variant="success"
        title="Success"
        message="Operation completed!"
      />

      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
      />

      <Avatar size="medium" initials="JD" />
    </div>
  );
}
```

## 📁 Project Structure

```
react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Alert.tsx
│   │   ├── InputField.tsx
│   │   ├── Avatar.tsx
│   │   └── index.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── Button.css
│   │   ├── Card.css
│   │   ├── Alert.css
│   │   ├── InputField.css
│   │   └── Avatar.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## ✨ Features

✅ **TypeScript** - Full type safety with TypeScript
✅ **Design Tokens** - All styling from design system variables
✅ **CSS Variables** - No hardcoded colors or values
✅ **Responsive** - Mobile-first responsive design
✅ **Accessible** - Semantic HTML and ARIA attributes
✅ **Production Ready** - Best practices and clean architecture

## 🔧 Component Props

### Button

```tsx
<Button
  variant="primary" | "secondary"
  style="filled" | "text"
  size="small" | "medium" | "icon"
  state="default" | "hover" | "focus" | "disabled"
  disabled={boolean}
  onClick={(e) => {}}
>
  Label
</Button>
```

### Card

```tsx
<Card
  title="Card Title"
  description="Card description"
  image={<ReactNode>}
  className="optional-class"
>
  Optional children
</Card>
```

### Alert

```tsx
<Alert
  variant="primary" | "success" | "warning" | "error"
  title="Alert Title"
  message="Alert message"
  icon={<ReactNode>}
  className="optional-class"
/>
```

### InputField

```tsx
<InputField
  label="Input Label"
  type="text" | "email" | "password"
  placeholder="Placeholder text"
  error="Error message"
  helperText="Helper text"
  disabled={boolean}
  onChange={(e) => {}}
/>
```

### Avatar

```tsx
<Avatar
  size="small" | "medium" | "large"
  initials="JD"
  src="image-url.jpg"
  alt="Avatar description"
  className="optional-class"
/>
```

## 📚 Design Token Usage

Tokens are automatically available in all component CSS files:

```css
.component {
  background: var(--button-primary-default-bg-color);
  color: var(--button-primary-default-text-color);
  padding: var(--button-medium-padding-y) var(--button-medium-padding-x);
  border-radius: var(--button-medium-border-radius);
}
```

## 🤝 Contributing

When adding new components:

1. Create component file in `src/components/ComponentName.tsx`
2. Create CSS file in `src/styles/ComponentName.css`
3. Export component in `src/components/index.ts`
4. Add to App.tsx for showcase
5. Use design tokens for all styling values

## 📄 License

Part of your design system. All rights reserved.

## 💡 Next Steps

1. **Run the app**: `npm start`
2. **View components**: Browse the dashboard at localhost:3000
3. **Build custom pages**: Use these components in your own pages
4. **Add more components**: Extract React code from other component docs
5. **Connect to your backend**: Add API calls as needed

---

Built with ❤️ from your Figma design system
