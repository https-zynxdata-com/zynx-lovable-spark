
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
    <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">Z</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="h-16 w-px bg-gradient-to-b from-blue-500/50 to-pink-500/50"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Zynx × Deeja
              </h2>
              <p className="text-xl text-muted-foreground">Advanced AGI Platform</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              ยินดีต้อนรับสู่ <span className="font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">Zynx Technology</span> 
              แพลตฟอร์ม AGI ที่ครบครันที่สุด พร้อม <span className="font-semibold text-primary">Deeja AI Assistant</span> 
              ที่มีความสามารถในการวิเคราะห์อารมณ์ การประมวลผลแบบหลายรูปแบบ และระบบหน่วยความจำอัจฉริยะ
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
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md">
                Zynx Technology
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300 shadow-md">
                Deeja AI Assistant
              </Badge>
              <Badge variant="secondary" className="shadow-md">Multi-modal Input</Badge>
              <Badge variant="secondary" className="shadow-md">Emotion Analysis</Badge>
              <Badge variant="secondary" className="shadow-md">Memory System</Badge>
              <Badge variant="secondary" className="shadow-md">Voice Recognition</Badge>
            </div>
            
            <Button 
              onClick={onMeetDeeja}
              className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Zap className="w-5 h-5 mr-2" />
              Meet Deeja! 🚀
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
