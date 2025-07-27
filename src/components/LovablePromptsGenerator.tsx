import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Image, 
  Sparkles, 
  Layers, 
  Settings, 
  Palette, 
  Copy, 
  Wand2,
  Brain,
  Zap,
  Target,
  Monitor,
  Smartphone,
  Navigation,
  Layout,
  User,
  Home,
  Search,
  ShoppingCart,
  BarChart3,
  Shield
} from 'lucide-react';

interface PromptConfig {
  category: string;
  position: string;
  iconName: string;
  imageDescription: string;
  purpose: string;
  stylingOptions: string[];
  designStyle: string;
  troubleshootingType: string;
}

const categories = [
  { id: 'images', label: 'Images', icon: Image, color: 'bg-ai-primary' },
  { id: 'icons', label: 'Icons', icon: Sparkles, color: 'bg-ai-secondary' },
  { id: 'combined', label: 'Combined', icon: Layers, color: 'bg-ai-accent' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: Settings, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
  { id: 'design', label: 'Design Styles', icon: Palette, color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
];

const positions = [
  'hero', 'navbar', 'sidebar', 'footer', 'header', 'main', 'section', 
  'card', 'button', 'form', 'modal', 'dropdown', 'menu', 'banner'
];

const purposes = [
  'UX', 'Aesthetic', 'Performance', 'Accessibility', 'Branding', 
  'Navigation', 'Visual Hierarchy', 'User Engagement', 'Conversion'
];

const stylingOptions = [
  'Gradient', 'Animation', 'Responsive', 'Shadow', 'Rounded', 
  'Border', 'Glow', 'Hover Effects', 'Transition', 'Glass Effect'
];

const designStyles = [
  'Glassmorphism', 'Neumorphism', 'Minimalist', 'Modern', 'Retro',
  'Brutalist', 'Material Design', 'Flat Design', 'Skeuomorphic', 'Abstract'
];

const troubleshootingTypes = [
  'Layout Issues', 'Responsive Problems', 'Color Contrast', 'Performance',
  'Accessibility', 'Component Alignment', 'Typography', 'Spacing'
];

const popularIcons = [
  'Brain', 'Zap', 'Target', 'Monitor', 'Smartphone', 'Navigation', 
  'Layout', 'User', 'Home', 'Search', 'ShoppingCart', 'BarChart3', 'Shield'
];

const promptTemplates = {
  'hero-image': 'Add hero background image to hero section with gradient for aesthetic purposes',
  'user-icon': 'Add User icon to navbar with animation for UX purposes',
  'feature-ai': 'Add Brain icon with "AI-Powered Analytics" image to card section with glow, rounded for branding purposes',
  'feature-dev': 'Add Zap icon with "Development Tools" image to card section with gradient, hover effects for user engagement purposes',
  'feature-security': 'Add Shield icon with "Security Features" image to card section with shadow, border for trust building purposes'
};

export default function LovablePromptsGenerator() {
  const { toast } = useToast();
  const [config, setConfig] = useState<PromptConfig>({
    category: 'images',
    position: 'hero',
    iconName: 'Brain',
    imageDescription: 'AI dashboard with modern interface',
    purpose: 'UX',
    stylingOptions: [],
    designStyle: 'Modern',
    troubleshootingType: 'Layout Issues'
  });

  const generatePrompt = useCallback(() => {
    const { category, position, iconName, imageDescription, purpose, stylingOptions, designStyle, troubleshootingType } = config;
    
    switch (category) {
      case 'images':
        return `Add ${imageDescription} to ${position} section${stylingOptions.length ? ` with ${stylingOptions.join(', ').toLowerCase()}` : ''} for ${purpose.toLowerCase()} purposes`;
      
      case 'icons':
        return `Add ${iconName} icon to ${position}${stylingOptions.length ? ` with ${stylingOptions.join(', ').toLowerCase()}` : ''} for ${purpose.toLowerCase()} purposes`;
      
      case 'combined':
        return `Add ${imageDescription} with ${iconName} icon to ${position} section${stylingOptions.length ? ` with ${stylingOptions.join(', ').toLowerCase()}` : ''}`;
      
      case 'troubleshooting':
        return `Fix ${troubleshootingType.toLowerCase()} in ${position} section - ensure proper ${purpose.toLowerCase()} implementation${stylingOptions.length ? ` with ${stylingOptions.join(', ').toLowerCase()}` : ''}`;
      
      case 'design':
        return `Apply ${designStyle} design style to ${position}${stylingOptions.length ? ` with ${stylingOptions.join(', ').toLowerCase()}` : ''}`;
      
      default:
        return 'Add component to page';
    }
  }, [config]);

  const copyPrompt = async () => {
    const prompt = generatePrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copied to clipboard!",
        description: "Your prompt is ready to use with Lovable.AI",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please manually copy the prompt",
        variant: "destructive",
      });
    }
  };

  const applyTemplate = (templateKey: string) => {
    const templatePrompt = promptTemplates[templateKey as keyof typeof promptTemplates];
    if (templatePrompt) {
      // Parse template and update config
      if (templateKey === 'hero-image') {
        setConfig(prev => ({
          ...prev,
          category: 'images',
          position: 'hero',
          imageDescription: 'hero background image',
          stylingOptions: ['Gradient'],
          purpose: 'Aesthetic'
        }));
      } else if (templateKey === 'user-icon') {
        setConfig(prev => ({
          ...prev,
          category: 'icons',
          position: 'navbar',
          iconName: 'User',
          stylingOptions: ['Animation'],
          purpose: 'UX'
        }));
      }
      toast({
        title: "Template applied!",
        description: "Configuration updated with template settings",
      });
    }
  };

  const toggleStylingOption = (option: string) => {
    setConfig(prev => ({
      ...prev,
      stylingOptions: prev.stylingOptions.includes(option)
        ? prev.stylingOptions.filter(opt => opt !== option)
        : [...prev.stylingOptions, option]
    }));
  };

  const currentPrompt = generatePrompt();

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Wand2 className="h-10 w-10 text-ai-primary animate-float" />
              <div className="absolute inset-0 bg-ai-primary opacity-20 rounded-full animate-glow"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Zynx Lovable
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Prompts Generator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered prompt generator for Lovable.AI - Create perfect prompts for images, icons, and UI components with ease
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Badge variant="secondary">v1.0.0</Badge>
            <Badge variant="secondary">Bundle Size &lt;180kB</Badge>
            <Badge variant="secondary">WCAG AA</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Categories */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-ai-primary" />
                <span>Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={config.category === category.id ? "default" : "ghost"}
                    className={`w-full justify-start space-x-3 h-12 ${
                      config.category === category.id 
                        ? 'bg-gradient-primary hover:bg-gradient-primary shadow-glow' 
                        : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => setConfig(prev => ({ ...prev, category: category.id }))}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{category.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Center Panel - Configuration */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-ai-secondary" />
                <span>Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={config.position} onValueChange={(value) => setConfig(prev => ({ ...prev, position: value }))}>
                  <SelectTrigger id="position" className="bg-secondary/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(position => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category-specific fields */}
              {(config.category === 'icons' || config.category === 'combined') && (
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon Name</Label>
                  <Select value={config.iconName} onValueChange={(value) => setConfig(prev => ({ ...prev, iconName: value }))}>
                    <SelectTrigger id="icon" className="bg-secondary/20 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {popularIcons.map(icon => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(config.category === 'images' || config.category === 'combined') && (
                <div className="space-y-2">
                  <Label htmlFor="image-desc">Image Description</Label>
                  <Textarea
                    id="image-desc"
                    value={config.imageDescription}
                    onChange={(e) => setConfig(prev => ({ ...prev, imageDescription: e.target.value }))}
                    placeholder="Describe the image you want..."
                    className="bg-secondary/20 border-border resize-none"
                    rows={2}
                  />
                </div>
              )}

              {config.category === 'troubleshooting' && (
                <div className="space-y-2">
                  <Label htmlFor="troubleshooting">Issue Type</Label>
                  <Select value={config.troubleshootingType} onValueChange={(value) => setConfig(prev => ({ ...prev, troubleshootingType: value }))}>
                    <SelectTrigger id="troubleshooting" className="bg-secondary/20 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {troubleshootingTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {config.category === 'design' && (
                <div className="space-y-2">
                  <Label htmlFor="design-style">Design Style</Label>
                  <Select value={config.designStyle} onValueChange={(value) => setConfig(prev => ({ ...prev, designStyle: value }))}>
                    <SelectTrigger id="design-style" className="bg-secondary/20 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {designStyles.map(style => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Select value={config.purpose} onValueChange={(value) => setConfig(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger id="purpose" className="bg-secondary/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map(purpose => (
                      <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Styling Options */}
              <div className="space-y-2">
                <Label>Styling Options</Label>
                <div className="flex flex-wrap gap-2">
                  {stylingOptions.map(option => (
                    <Badge
                      key={option}
                      variant={config.stylingOptions.includes(option) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all ${
                        config.stylingOptions.includes(option) 
                          ? 'bg-ai-primary hover:bg-ai-primary/80' 
                          : 'hover:bg-secondary/80'
                      }`}
                      onClick={() => toggleStylingOption(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Output & Templates */}
          <div className="space-y-6">
            {/* Generated Prompt */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-ai-accent" />
                  <span>Generated Prompt</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary/20 rounded-lg border border-border">
                  <p className="text-sm text-foreground font-mono leading-relaxed">
                    {currentPrompt}
                  </p>
                </div>
                <Button onClick={copyPrompt} className="w-full bg-gradient-primary hover:bg-gradient-primary/80 shadow-glow">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Prompt
                </Button>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-ai-primary" />
                  <span>Quick Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-secondary/50"
                  onClick={() => applyTemplate('hero-image')}
                >
                  <div className="text-left">
                    <div className="font-medium">Hero Image</div>
                    <div className="text-xs text-muted-foreground">Full-screen background</div>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-secondary/50"
                  onClick={() => applyTemplate('user-icon')}
                >
                  <div className="text-left">
                    <div className="font-medium">User Icon</div>
                    <div className="text-xs text-muted-foreground">Navigation element</div>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-secondary/50"
                  onClick={() => applyTemplate('feature-ai')}
                >
                  <div className="text-left">
                    <div className="font-medium">AI Feature</div>
                    <div className="text-xs text-muted-foreground">Brain + analytics</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Separator className="bg-border" />
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-sm text-muted-foreground">
                  Built with ❤️ by <span className="font-semibold text-ai-primary">Zynx</span> • Part of the Zynx AI Platform ecosystem
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <a href="mailto:zynx@zynxdata.com" className="hover:text-ai-primary transition-colors">
                    Contact
                  </a>
                  <span>•</span>
                  <a href="https://zynxdata.com" className="hover:text-ai-primary transition-colors">
                    Website
                  </a>
                  <span>•</span>
                  <span className="text-ai-secondary">v1.0.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}