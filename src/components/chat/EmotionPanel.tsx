
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  AlertTriangle, 
  Brain, 
  BarChart3,
  Shield,
  Zap,
  FileText
} from 'lucide-react';

interface EmotionPanelProps {
  currentEmotion: { emotion: string; confidence: number } | null;
  ethicsFlag: boolean;
  onSummarize: () => void;
}

const emotionLabels = {
  joy: 'ความสุข',
  sadness: 'ความเศร้า',
  anger: 'ความโกรธ',
  fear: 'ความกลัว',
  surprise: 'ความประหลาดใจ',
  disgust: 'ความรังเกียจ',
  neutral: 'เป็นกลาง',
};

const emotionColors = {
  joy: 'text-yellow-600',
  sadness: 'text-blue-600',
  anger: 'text-red-600',
  fear: 'text-purple-600',
  surprise: 'text-green-600',
  disgust: 'text-gray-600',
  neutral: 'text-gray-500',
};

export function EmotionPanel({ currentEmotion, ethicsFlag, onSummarize }: EmotionPanelProps) {
  return (
    <div className="space-y-4">
      {/* Emotion Analysis */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Heart className="w-4 h-4 text-primary" />
            <span>การวิเคราะห์อารมณ์</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentEmotion ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">อารมณ์ปัจจุบัน:</span>
                <Badge 
                  variant="secondary" 
                  className={`${emotionColors[currentEmotion.emotion as keyof typeof emotionColors]}`}
                >
                  {emotionLabels[currentEmotion.emotion as keyof typeof emotionLabels]}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>ความมั่นใจ:</span>
                  <span>{Math.round(currentEmotion.confidence * 100)}%</span>
                </div>
                <Progress value={currentEmotion.confidence * 100} className="h-2" />
              </div>
              
              {ethicsFlag && (
                <div className="flex items-center space-x-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700">ตรวจพบความเสี่ยงด้านอารมณ์</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">ยังไม่มีข้อมูลอารมณ์</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ethics Panel */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Shield className="w-4 h-4 text-primary" />
            <span>ธงจริยธรรม</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">สถานะ:</span>
            <Badge variant={ethicsFlag ? "destructive" : "secondary"}>
              {ethicsFlag ? 'เตือน' : 'ปกติ'}
            </Badge>
          </div>
          
          {ethicsFlag && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-sm text-red-700">
                ระบบตรวจพบเนื้อหาที่อาจมีความเสี่ยง กรุณาใช้งานด้วยความระมัดระวัง
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Zap className="w-4 h-4 text-primary" />
            <span>การดำเนินการด่วน</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={onSummarize}
          >
            <FileText className="w-4 h-4 mr-2" />
            สรุปบทสนทนา
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => window.location.reload()}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            รีเซ็ตบทสนทนา
          </Button>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span>สถานะระบบ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>โหมด:</span>
            <Badge variant="secondary">Demo</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>AI Engine:</span>
            <Badge variant="secondary">Mock</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>หน่วยความจำ:</span>
            <Badge variant="secondary">Local</Badge>
          </div>
          
          <Separator />
          
          <p className="text-xs text-muted-foreground text-center">
            ระบบ Demo ใช้ข้อมูลจำลอง
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
