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

  // Template prompts
  const promptTemplates = {
    images: [
      {
        title: 'Add Hero Image',
        prompt: 'Add hero background image to hero section full-screen',
        description: 'Add full-screen background image to hero section'
      },
      {
        title: 'Add Product Gallery',
        prompt: 'Add responsive image gallery grid with 3 columns',
        description: 'Create responsive 3-column image gallery'
      },
      {
        title: 'Add Logo to Header',
        prompt: 'Add logo image to left side of header',
        description: 'Add logo image to left side of header'
      }
    ],
    icons: [
      {
        title: 'Change Navigation Icon',
        prompt: 'Change Menu icon to X in navigation bar',
        description: 'Change Menu icon to X in navigation'
      },
      {
        title: 'Add User Icon',
        prompt: 'Add User icon to right side of navbar',
        description: 'Add User icon to right side of navbar'
      },
      {
        title: 'Add Success Icon',
        prompt: 'Add green CheckCircle icon for success state',
        description: 'Add green CheckCircle icon for success state'
      }
    ],
    combined: [
      {
        title: 'Hero with Icon',
        prompt: 'Add hero background with Sparkles icon',
        description: 'Add hero section with background and icon'
      },
      {
        title: 'Feature Card',
        prompt: 'Add feature card with Brain icon and placeholder image',
        description: 'Create feature card with icon and image'
      }
    ],
    troubleshooting: [
      {
        title: 'Fix Icon Display',
        prompt: 'Fix icon not showing - check Lucide React icon name',
        description: 'Troubleshoot icon display issues'
      },
      {
        title: 'Fix Image Loading',
        prompt: 'Fix slow image loading with lazy loading and WebP format',
        description: 'Optimize image loading performance'
      }
    ],
    'design-styles': [
      {
        title: 'Apply Glassmorphism',
        prompt: 'Apply glassmorphism style with translucent background',
        description: 'Add glass-like transparent effects'
      },
      {
        title: 'Apply Neobrutalism',
        prompt: 'Apply neobrutalism style with bold colors and sharp edges',
        description: 'Add bold, raw design elements'
      }
    ]
  };

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Cheat Sheet Data
  const cheatSheetData = {
    'Quick Commands': [
      { command: 'hero-setup', description: 'Add hero background + Sparkles icon + CTA button' },
      { command: 'nav-modern', description: 'Create Navigation Bar with Home, User, Settings icons' },
      { command: 'feature-cards', description: 'Add 3 feature cards with Brain, Code, Shield icons' }
    ],
    'Popular Icons': [
      { command: 'Brain', description: 'AI and Intelligence' },
      { command: 'Code', description: 'Development and Programming' },
      { command: 'Shield', description: 'Security and Protection' },
      { command: 'Zap', description: 'Energy and Performance' }
    ],
    'Design Styles': [
      { command: 'Glassmorphism', description: 'Translucent glass-like effects' },
      { command: 'Neobrutalism', description: 'Bold, raw, high-contrast design' },
      { command: 'Hacker', description: 'Terminal-inspired dark theme' },
      { command: 'Retro', description: 'Vintage nostalgic aesthetics' }
    ]
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

      {/* Zynx Modal */}
      {showZynxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <DynamicIcon name="Brain" size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">รู้จัก Zynx</h2>
                    <p className="text-sm text-gray-600">AI Developer</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowZynxModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  aria-label="Close About Zynx modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">👋 สวัสดี!</h3>
                <p className="text-gray-700 leading-relaxed">
                  ฉันคือ <strong>Zynx</strong> นักพัฒนา AI ที่สร้าง tool นี้เพื่อช่วยให้คุณ
                  generate prompts สำหรับ Lovable.AI ได้ง่ายขึ้น
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="text-purple-500" size={20} />
                  ลองใช้ tool นี้ดู!
                </h3>
                <p className="text-sm text-purple-800">
                  • เลือกหมวด Images, Icons หรือ Combined<br/>
                  • กรอกข้อมูลในฟอร์ม<br/>
                  • กดปุ่ม Copy เพื่อใช้ prompt กับ Lovable.AI
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  มีข้อเสนอแนะหรือต้องการพูดคุย?
                </p>
                <a 
                  href="mailto:zynx@zynxdata.com" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <DynamicIcon name="Mail" size={16} />
                  zynx@zynxdata.com
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl text-center">
              <p className="text-xs text-gray-500">
                🚀 Currently building Zynx AI Platform
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-purple-500" size={24} />
            Lovable Prompts
          </h1>
          <p className="text-sm text-gray-600 mt-1">Generate perfect prompts for Lovable.AI</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <DynamicIcon name="Heart" size={12} className="text-red-400" />
            <button 
              onClick={() => setShowZynxModal(true)}
              className="hover:text-purple-600 transition-colors underline decoration-dotted"
            >
              Created by Zynx
            </button>
          </p>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {categories.map(category => {
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                    <DynamicIcon name={category.icon} size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Templates */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {promptTemplates[selectedCategory]?.map((template, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{template.title}</h4>
                    <button
                      onClick={() => copyToClipboard(template.prompt)}
                      className="text-gray-500 hover:text-purple-600 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                      aria-label={`Copy prompt: ${template.title}`}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                  <code className="text-xs bg-white px-2 py-1 rounded border">{template.prompt}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-6" role="tablist" aria-label="Main navigation">
            {['generator', 'cheatsheet', 'examples'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-panel`}
                className={`py-4 px-2 border-b-2 text-sm font-medium capitalize transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 rounded-t ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'cheatsheet' ? 'Cheat Sheet' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'generator' && (
            <div className="max-w-4xl mx-auto" role="tabpanel" id="generator-panel" aria-labelledby="generator-tab">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings size={20} />
                    Customize Prompt
                  </h2>

                  <div className="space-y-4">
                    {/* Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <select
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {positions.map(pos => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>

                    {/* Icon Name (for icons/combined) */}
                    {(selectedCategory === 'icons' || selectedCategory === 'combined') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
                        <select
                          value={iconName}
                          onChange={(e) => setIconName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Icon</option>
                          {lucideIcons.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Image Name (for images/combined) */}
                    {(selectedCategory === 'images' || selectedCategory === 'combined') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Description</label>
                        <input
                          type="text"
                          value={imageName}
                          onChange={(e) => setImageName(e.target.value)}
                          placeholder="e.g., hero background, logo, product photo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    {/* Purpose */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {purposes.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    {/* Design Style Selector (for design-styles category) */}
                    {selectedCategory === 'design-styles' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
                        <select
                          value={designStyle}
                          onChange={(e) => setDesignStyle(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus-visible:ring-2 focus-visible:ring-purple-500"
                        >
                          {designStyles.map(style => (
                            <option key={style} value={style}>{style}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Styling (Optional)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {stylingOptions.map(option => (
                          <label key={option} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={styling.includes(option)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setStyling([...styling, option]);
                                } else {
                                  setStyling(styling.filter(s => s !== option));
                                }
                              }}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <DynamicIcon name="Code" size={20} />
                    Generated Prompt
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                      {generatedPrompt || 'Configure options to generate prompt...'}
                    </pre>
                  </div>

                  <button
                    onClick={() => copyToClipboard(generatedPrompt)}
                    disabled={!generatedPrompt}
                    aria-label="Copy generated prompt to clipboard"
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <Copy size={16} />
                    Copy Prompt
                  </button>

                  {/* Quick Actions */}
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setIconName('Brain');
                          setSelectedPosition('hero');
                          setPurpose('UX');
                        }}
                        className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        AI Hero Setup
                      </button>
                      <button
                        onClick={() => {
                          setIconName('User');
                          setSelectedPosition('navbar');
                          setPurpose('Functional');
                        }}
                        className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        User Navigation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cheatsheet' && (
            <div className="max-w-4xl mx-auto" role="tabpanel" id="cheatsheet-panel" aria-labelledby="cheatsheet-tab">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(cheatSheetData).map(([section, items]) => (
                  <div key={section} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <DynamicIcon name="BookOpen" size={18} />
                      {section}
                    </h3>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {item.command}
                            </code>
                            <button
                              onClick={() => copyToClipboard(item.description)}
                              className="text-gray-500 hover:text-purple-600 transition-colors"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="max-w-4xl mx-auto" role="tabpanel" id="examples-panel" aria-labelledby="examples-tab">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Design Examples */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Patterns</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Tech Startup', prompt: 'Create tech startup homepage with Hero gradient + Zap icon + CTA button' },
                      { title: 'E-commerce', prompt: 'Create e-commerce layout with ShoppingCart, Heart, Search icons' },
                      { title: 'Dashboard', prompt: 'Create business dashboard with sidebar icons + stats cards' }
                    ].map(example => (
                      <div key={example.title} className="border border-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{example.prompt}</p>
                        <button
                          onClick={() => copyToClipboard(example.prompt)}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                        >
                          <Copy size={12} />
                          Copy Example
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Fixes</h3>
                  <div className="space-y-4">
                    {[
                      { problem: 'Icon not showing', solution: 'Check Lucide React icon name spelling' },
                      { problem: 'Image loading slow', solution: 'Add lazy loading + WebP format' },
                      { problem: 'Mobile icon too small', solution: 'Add responsive icon size={24}' }
                    ].map(fix => (
                      <div key={fix.problem} className="border border-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-red-600 mb-2">❌ {fix.problem}</h4>
                        <p className="text-sm text-green-600">✅ {fix.solution}</p>
                        <button
                          onClick={() => copyToClipboard(fix.solution)}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1 mt-2"
                        >
                          <Copy size={12} />
                          Copy Solution
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LovablePromptsGenerator;