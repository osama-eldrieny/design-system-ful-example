Bell,
  Check,
  ChevronDown,
  Download,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  TriangleAlert,
  User,
  X,
} from 'lucide-react';

# Iconography

The system uses **[Lucide](https://lucide.dev)** icons: one consistent, open-source set with over 1,500 icons drawn on a 24 × 24 grid with 2 px strokes.

```tsx

## Guidelines

- Icons inherit the text color (`currentColor`) and take their size from the component, e.g. `--button-medium-icon-size`.
- Pair icons with a text label. An icon on its own needs an accessible name, which `IconButton` requires through its `label` prop.
- Decorative icons are hidden from screen readers; components do this for you.
- Don't use emoji as icons.
- Mirror directional icons (arrows, chevrons) in right-to-left layouts; symbols like a check or a trash can stay as they are.

The older docs and prototypes use Font Awesome. They move to Lucide as each component is migrated.
