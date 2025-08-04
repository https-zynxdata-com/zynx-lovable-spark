
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Wand2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PromptGeneratorProps {
  onPromptGenerated: (prompt: string) => void;
  onClose: () => void;
}

export function PromptGenerator({ onPromptGenerated, onClose }: PromptGeneratorProps) {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    projectType: '',
    framework: '',
    language: '',
    mainFunction: '',
    targetAudience: '',
    toneStyle: '',
    additionalContext: ''
  });

  const projectTypes = [
    'เว็บแอปพลิเคชัน',
    'มือถือแอป',
    'API/Backend',
    'ฐานข้อมูล',
    'AI/ML',
    'การวิเคราะห์ข้อมูล',
    'เกม',
    'อื่นๆ'
  ];

  const frameworks = [
    'React',
    'Vue.js',
    'Angular',
    'Next.js',
    'Express.js',
    'Django',
    'FastAPI',
    'Spring Boot',
    'Flutter',
    'React Native'
  ];

  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'Swift',
    'Kotlin'
  ];

  const toneStyles = [
    'เป็นทางการ',
    'เป็นกันเอง',
    'เชิงเทคนิค',
    'เรียบง่าย',
    'สร้างสรรค์',
    'เชิงธุรกิจ'
  ];

  const generatePrompt = () => {
    const parts = [];
    
    if (config.projectType) {
      parts.push(`สร้าง${config.projectType}`);
    }
    
    if (config.framework) {
      parts.push(`ใช้ ${config.framework}`);
    }
    
    if (config.language) {
      parts.push(`เขียนด้วย ${config.language}`);
    }
    
    if (config.mainFunction) {
      parts.push(`ที่มีฟังก์ชันหลัก: ${config.mainFunction}`);
    }
    
    if (config.targetAudience) {
      parts.push(`สำหรับกลุ่มเป้าหมาย: ${config.targetAudience}`);
    }
    
    if (config.toneStyle) {
      parts.push(`ใช้โทน${config.toneStyle}`);
    }
    
    if (config.additionalContext) {
      parts.push(`\n\nข้อมูลเพิ่มเติม: ${config.additionalContext}`);
    }
    
    parts.push('\n\nกรุณาอธิบายขั้นตอนการทำงานและให้ตัวอย่างโค้ดที่เกี่ยวข้อง');
    
    return parts.join(' ');
  };

  const handleGenerate = () => {
    const prompt = generatePrompt();
    onPromptGenerated(prompt);
    toast({
      title: "สร้าง Prompt สำเร็จ",
      description: "Prompt ถูกสร้างและเพิ่มลงในช่องข้อความแล้ว",
    });
  };

  const handleCopy = async () => {
    const prompt = generatePrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "คัดลอกสำเร็จ",
        description: "Prompt ถูกคัดลอกไปยังคลิปบอร์ดแล้ว",
      });
    } catch (error) {
      toast({
        title: "คัดลอกไม่สำเร็จ",
        description: "กรุณาคัดลอกด้วยตัวเอง",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-primary" />
              <span>Prompt Generator</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-type">ประเภทโปรเจกต์</Label>
              <Select value={config.projectType} onValueChange={(value) => setConfig(prev => ({ ...prev, projectType: value }))}>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="เลือกประเภทโปรเจกต์" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={config.framework} onValueChange={(value) => setConfig(prev => ({ ...prev, framework: value }))}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="เลือก Framework" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map(framework => (
                    <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">ภาษาโปรแกรม</Label>
              <Select value={config.language} onValueChange={(value) => setConfig(prev => ({ ...prev, language: value }))}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="เลือกภาษา" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone-style">โทน/สไตล์</Label>
              <Select value={config.toneStyle} onValueChange={(value) => setConfig(prev => ({ ...prev, toneStyle: value }))}>
                <SelectTrigger id="tone-style">
                  <SelectValue placeholder="เลือกโทน" />
                </SelectTrigger>
                <SelectContent>
                  {toneStyles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="main-function">ฟังก์ชันหลัก</Label>
            <Input
              id="main-function"
              value={config.mainFunction}
              onChange={(e) => setConfig(prev => ({ ...prev, mainFunction: e.target.value }))}
              placeholder="เช่น ระบบจัดการข้อมูลสินค้า, แชทบอท, เกมปริศนา"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-audience">กลุ่มเป้าหมาย</Label>
            <Input
              id="target-audience"
              value={config.targetAudience}
              onChange={(e) => setConfig(prev => ({ ...prev, targetAudience: e.target.value }))}
              placeholder="เช่น นักเรียน, ผู้ประกอบการ, นักพัฒนา"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-context">ข้อมูลเพิ่มเติม</Label>
            <Textarea
              id="additional-context"
              value={config.additionalContext}
              onChange={(e) => setConfig(prev => ({ ...prev, additionalContext: e.target.value }))}
              placeholder="รายละเอียดเพิ่มเติมหรือข้อกำหนดพิเศษ"
              rows={3}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>ตัวอย่าง Prompt ที่จะสร้าง:</Label>
            <div className="p-4 bg-secondary/20 rounded-lg border border-border">
              <p className="text-sm text-foreground font-mono leading-relaxed">
                {generatePrompt() || 'กรุณากรอกข้อมูลเพื่อสร้าง Prompt'}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              คัดลอก
            </Button>
            <Button onClick={handleGenerate} className="bg-primary hover:bg-primary/90">
              <Wand2 className="w-4 h-4 mr-2" />
              สร้างและส่ง
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
