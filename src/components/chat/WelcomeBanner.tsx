
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target,
  FileText,
  Image,
  Mic,
  MessageSquare
} from 'lucide-react';

interface WelcomeBannerProps {
  onMeetDeeja: () => void;
}

export function WelcomeBanner({ onMeetDeeja }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Zynx+Deeja
              </h2>
              <p className="text-lg text-muted-foreground">AGI Platform</p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-4">
              ยินดีต้อนรับสู่แพลตฟอร์ม AI ที่ครบครันที่สุด พร้อมความสามารถในการวิเคราะห์อารมณ์ 
              การประมวลผลแบบหลายรูปแบบ และระบบหน่วยความจำอัจฉริยะ
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary" />
                <span className="text-sm text-center">แชทธรรมชาติ</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg">
                <Mic className="w-6 h-6 text-primary" />
                <span className="text-sm text-center">ป้อนข้อมูลด้วยเสียง</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg">
                <Image className="w-6 h-6 text-primary" />
                <span className="text-sm text-center">วิเคราะห์รูปภาพ</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
                <span className="text-sm text-center">วิเคราะห์อารมณ์</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="secondary">Glassmorphism UI</Badge>
              <Badge variant="secondary">Dark/Light Mode</Badge>
              <Badge variant="secondary">Multi-modal Input</Badge>
              <Badge variant="secondary">Emotion Analysis</Badge>
              <Badge variant="secondary">Memory System</Badge>
              <Badge variant="secondary">Prompt Generator</Badge>
            </div>
            
            <Button 
              onClick={onMeetDeeja}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 text-lg font-semibold"
            >
              Meet Deeja! 🚀
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
