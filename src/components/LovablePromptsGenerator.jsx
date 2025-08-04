import React, { useState, useEffect, lazy, Suspense } from 'react';

// Core icons - always loaded
import { Copy, Check, Sparkles, Settings } from 'lucide-react';

// Dynamic icon imports for better tree-shaking
const iconComponents = {
  Image: lazy(() => import('lucide-react').then(mod => ({ default: mod.Image }))),
  Palette: lazy(() => import('lucide-react').then(mod => ({ default: mod.Palette }))),
  Wrench: lazy(() => import('lucide-react').then(mod => ({ default: mod.Wrench }))),
  BookOpen: lazy(() => import('lucide-react').then(mod => ({ default: mod.BookOpen }))),
  Code: lazy(() => import('lucide-react').then(mod => ({ default: mod.Code }))),
  Search: lazy(() => import('lucide-react').then(mod => ({ default: mod.Search }))),
  Filter: lazy(() => import('lucide-react').then(mod => ({ default: mod.Filter }))),
  Zap: lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap }))),
  ChevronDown: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown }))),
  ChevronRight: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight }))),
  Heart: lazy(() => import('lucide-react').then(mod => ({ default: mod.Heart }))),
  Star: lazy(() => import('lucide-react').then(mod => ({ default: mod.Star }))),
  Brain: lazy(() => import('lucide-react').then(mod => ({ default: mod.Brain }))),
  Shield: lazy(() => import('lucide-react').then(mod => ({ default: mod.Shield }))),
  Plus: lazy(() => import('lucide-react').then(mod => ({ default: mod.Plus }))),
  X: lazy(() => import('lucide-react').then(mod => ({ default: mod.X }))),
  ExternalLink: lazy(() => import('lucide-react').then(mod => ({ default: mod.ExternalLink }))),
  Github: lazy(() => import('lucide-react').then(mod => ({ default: mod.Github }))),
  Globe: lazy(() => import('lucide-react').then(mod => ({ default: mod.Globe }))),
  Mail: lazy(() => import('lucide-react').then(mod => ({ default: mod.Mail })))
};

// Icon wrapper component with loading fallback
const DynamicIcon = ({ name, size = 16, className = "", ...props }) => {
  const IconComponent = iconComponents[name];
  
  if (!IconComponent) {
    return <div className={`w-${Math.floor(size/4)} h-${Math.floor(size/4)} bg-gray-300 rounded ${className}`} />;
  }
  
  return (
    <Suspense fallback={<div className={`w-${Math.floor(size/4)} h-${Math.floor(size/4)} bg-gray-300 rounded animate-pulse ${className}`} />}>
      <IconComponent size={size} className={className} {...props} />
    </Suspense>
  );
};

const LovablePromptsGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState('images');
  const [selectedPosition, setSelectedPosition] = useState('hero');
  const [iconName, setIconName] = useState('');
  const [imageName, setImageName] = useState('');
  const [purpose, setPurpose] = useState('UX');
  const [styling, setStyling] = useState([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('generator');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showZynxModal, setShowZynxModal] = useState(false);
  const [designStyle, setDesignStyle] = useState('Neobrutalism');

  // Categories with dynamic icons
  const categories = [
    { id: 'images', label: 'Images', icon: 'Image', color: 'bg-blue-500' },
    { id: 'icons', label: 'Icons', icon: 'Palette', color: 'bg-purple-500' },
    { id: 'combined', label: 'Combined', icon: 'Sparkles', color: 'bg-green-500' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'Wrench', color: 'bg-red-500' },
    { id: 'design-styles', label: 'Design Styles', icon: 'Code', color: 'bg-orange-500' }
  ];

  const positions = [
    'hero', 'navbar', 'sidebar', 'card', 'footer', 'button', 'form', 'dashboard', 'header', 'main content'
  ];

  const lucideIcons = [
    'Heart', 'Star', 'Brain', 'Code', 'Shield', 'Zap', 'Sparkles', 'User', 'Users', 'Settings',
    'Home', 'Menu', 'Search', 'Bell', 'Plus', 'Minus', 'Edit', 'Trash2', 'Download', 'Upload',
    'ArrowRight', 'ArrowLeft', 'ChevronDown', 'ChevronUp', 'Check', 'X', 'AlertCircle', 'Info'
  ];

  const purposes = ['UX', 'Aesthetic', 'Performance', 'Accessibility', 'Functional'];
  
  const stylingOptions = ['Gradient', 'Animation', 'Responsive', 'Hover Effect', 'Shadow', 'Rounded'];

  const designStyles = ['Neobrutalism', 'Glassmorphism', 'Hacker', 'Retro', 'Modern', 'Minimalist'];

  // Generate prompt function
  const generatePrompt = () => {
    let prompt = '';
    
    if (selectedCategory === 'images') {
      if (imageName && selectedPosition) {
        prompt = `Add ${imageName} image to ${selectedPosition}`;
      }
    } else if (selectedCategory === 'icons') {
      if (iconName && selectedPosition) {
        prompt = `Add ${iconName} icon to ${selectedPosition}`;
      }
    } else if (selectedCategory === 'combined') {
      if (iconName && imageName && selectedPosition) {
        prompt = `Add ${imageName} image with ${iconName} icon to ${selectedPosition}`;
      }
    } else if (selectedCategory === 'troubleshooting') {
      prompt = `Fix ${selectedPosition} layout issues`;
    } else if (selectedCategory === 'design-styles') {
      prompt = `Apply ${designStyle} design style to ${selectedPosition}`;
    }

    // Add styling
    if (styling.length > 0) {
      prompt += ` with ${styling.join(', ').toLowerCase()}`;
    }

    // Add purpose
    if (purpose && purpose !== 'UX') {
      prompt += ` for ${purpose.toLowerCase()} purposes`;
    }

    setGeneratedPrompt(prompt);
  };

  useEffect(() => {
    generatePrompt();
  }, [selectedCategory, selectedPosition, iconName, imageName, purpose, styling, designStyle]);

  // Copy function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
      setCopiedPrompt('');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Toast Notification */}
      {isToastVisible && (
        <div 
          role="alert" 
          aria-live="assertive" 
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 ease-in-out transform translate-y-0"
        >
          <Check size={16} />
          <span>Copied to clipboard!</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Lovable Prompts Generator
          </h1>
          
          {/* Category Selection */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded ${category.color} mx-auto mb-2 flex items-center justify-center`}>
                  <DynamicIcon name={category.icon} size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory === 'icons' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Name
                </label>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select icon...</option>
                  {lucideIcons.map(icon => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedCategory === 'images' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Description
                </label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="hero background, product photo..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Generated Prompt */}
          {generatedPrompt && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Generated Prompt</h3>
                <button
                  onClick={() => copyToClipboard(generatedPrompt)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Copy size={16} />
                  Copy Prompt
                </button>
              </div>
              <code className="block p-4 bg-gray-50 rounded-lg text-sm font-mono">
                {generatedPrompt}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LovablePromptsGenerator;