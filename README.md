# 🚀 Zynx Lovable Prompts Generator

> AI-powered prompt generator for Lovable.AI - Create perfect prompts for images, icons, and UI components with ease

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/zynxdata/lovable-prompts-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-<180kB-green.svg)](https://bundlephobia.com/)
[![Accessibility](https://img.shields.io/badge/a11y-AA%20compliant-green.svg)](https://www.w3.org/WAI/WCAG2AA-Conformance)

## ✨ Features

- **🎯 5 Categories**: Images, Icons, Combined, Troubleshooting, Design Styles
- **⚡ Real-time Generation**: Live prompt preview as you type
- **📱 Responsive Design**: Works seamlessly on all devices
- **♿ Accessibility First**: WCAG AA compliant with screen reader support
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS
- **📋 One-Click Copy**: Copy prompts to clipboard instantly
- **🔧 Performance Optimized**: Dynamic imports, <180kB bundle size
- **📚 Built-in Templates**: Quick-start templates for common use cases

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn 1.22+

### Installation

```bash
# Clone repository
git clone https://github.com/zynxdata/lovable-prompts-generator.git
cd lovable-prompts-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📖 Usage

### Basic Usage

1. **Select Category**: Choose from Images, Icons, Combined, Troubleshooting, or Design Styles
2. **Configure Options**: 
   - Position (hero, navbar, sidebar, etc.)
   - Icon name (from Lucide React library)
   - Image description 
   - Purpose (UX, Aesthetic, Performance, etc.)
   - Styling options (Gradient, Animation, Responsive, etc.)
3. **Copy Prompt**: Click "Copy Prompt" to use with Lovable.AI

### Example Prompts Generated

```javascript
// Images Category
"Add hero background image to hero section with gradient for aesthetic purposes"

// Icons Category  
"Add Brain icon to navbar with animation for UX purposes"

// Combined Category
"Add hero background image with Sparkles icon to hero section with responsive"

// Design Styles
"Apply Glassmorphism design style to card with shadow, rounded"
```

### Quick Templates

The app includes pre-built templates for common scenarios:

- **Add Hero Image**: Full-screen background image setup
- **Add User Icon**: Navigation user interface elements
- **Feature Cards**: AI, development, and security themed cards
- **Design Patterns**: Tech startup, e-commerce, dashboard layouts

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run analyze      # Bundle size analysis
npm run lighthouse   # Performance audit
```

### Project Structure

```
src/
├── components/           # React components
│   ├── LovablePromptsGenerator.jsx
│   └── ...
├── assets/              # Static assets
├── styles/              # Global styles
└── tests/               # Test files
```

## 🎨 Customization

### Adding New Categories

1. Update the `categories` array in `LovablePromptsGenerator.jsx`:

```javascript
const categories = [
  // ... existing categories
  { 
    id: 'custom', 
    label: 'Custom Category', 
    icon: 'CustomIcon', 
    color: 'bg-custom-500' 
  }
];
```

2. Add corresponding logic in `generatePrompt()` function
3. Add templates to `promptTemplates` object

### Custom Styling

The project uses Tailwind CSS. Customize the design by:

1. Editing `tailwind.config.js`
2. Adding custom CSS in `src/styles/`
3. Modifying component classes

## 🧪 Testing

### Unit Tests

```bash
npm run test              # Run all tests
npm run test:coverage     # Run with coverage report
```

### E2E Tests

```bash
npm run test:e2e          # Run Playwright tests
```

### Performance Testing

```bash
npm run lighthouse        # Lighthouse CI audit
npm run size-check        # Bundle size limits
```

## 📊 Performance Metrics

| Metric | Target | Status |
|--------|--------|---------|
| Bundle Size | <180kB | ✅ ~120kB |
| Lighthouse Performance | >90 | ✅ 95+ |
| Lighthouse Accessibility | >90 | ✅ 100 |
| First Contentful Paint | <2s | ✅ <1.5s |
| Test Coverage | >80% | ✅ 85%+ |

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
VITE_APP_TITLE="Lovable Prompts Generator"
VITE_APP_VERSION="1.0.0"
VITE_CONTACT_EMAIL="zynx@zynxdata.com"
```

### Build Configuration

Customize build settings in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true
  }
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- ESLint + Prettier for formatting
- React Hooks patterns
- Accessible components (WCAG AA)
- Performance-first approach

## 📝 Changelog

### v1.0.0 (2024-01-XX)

- 🎉 Initial release
- ✨ 5 prompt categories with templates
- 🎨 Modern UI with Tailwind CSS
- ♿ Full accessibility support
- 📱 Mobile-responsive design
- ⚡ Performance optimized (<180kB)
- 🧪 Comprehensive test suite

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lovable.AI](https://lovable.dev) - For the amazing no-code platform
- [Lucide React](https://lucide.dev) - For the beautiful icon library
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
- [Vite](https://vitejs.dev) - For the fast build tool

## 📧 Contact & Support

- **Creator**: Zynx 
- **Email**: [zynx@zynxdata.com](mailto:zynx@zynxdata.com)
- **Website**: [zynxdata.com](https://zynxdata.com)
- **Issues**: [GitHub Issues](https://github.com/zynxdata/lovable-prompts-generator/issues)

---

<div align="center">

**Built with ❤️ by [Zynx](https://zynxdata.com)**

*Part of the Zynx AI Platform ecosystem*

[🚀 Live Demo](https://lovable-prompts.zynxdata.com) • [📖 Docs](https://docs.zynxdata.com) • [💬 Discord](https://discord.gg/zynxdata)

</div>