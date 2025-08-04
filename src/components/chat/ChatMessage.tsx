
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  User, 
  Bot, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Brain
} from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../ZynxDeejaPlatform';

interface ChatMessageProps {
  message: ChatMessageType;
  onFeedback: (messageId: string, type: 'positive' | 'negative') => void;
}

const emotionColors = {
  joy: 'bg-yellow-500/20 border-yellow-500/50',
  sadness: 'bg-blue-500/20 border-blue-500/50',
  anger: 'bg-red-500/20 border-red-500/50',
  fear: 'bg-purple-500/20 border-purple-500/50',
  surprise: 'bg-green-500/20 border-green-500/50',
  disgust: 'bg-gray-500/20 border-gray-500/50',
  neutral: 'bg-gray-100/20 border-gray-300/50',
};

const emotionEmojis = {
  joy: '😊',
  sadness: '😢',
  anger: '😠',
  fear: '😨',
  surprise: '😮',
  disgust: '🤢',
  neutral: '😐',
};

export function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const [showReasoning, setShowReasoning] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedbackGiven(type);
    onFeedback(message.id, type);
  };

  const emotionColor = message.emotion && emotionColors[message.emotion as keyof typeof emotionColors];
  const emotionEmoji = message.emotion && emotionEmojis[message.emotion as keyof typeof emotionEmojis];

  return (
    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
      {message.sender === 'ai' && (
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
        <Card className={`${
          message.sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : `bg-background/50 backdrop-blur-sm ${emotionColor || 'border-border/50'}`
        } border transition-all duration-200`}>
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'คุณ' : 'Deeja'}
                  </span>
                  {emotionEmoji && (
                    <span className="text-sm">{emotionEmoji}</span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString('th-TH', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
                
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">แหล่งที่มา:</p>
                    {message.sources.map((source, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs">
                        <ExternalLink className="w-3 h-3" />
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {source}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {message.sender === 'ai' && (
              <div className="mt-3 pt-2 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback('positive')}
                      className={`h-6 px-2 ${feedbackGiven === 'positive' ? 'bg-green-500/20' : ''}`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback('negative')}
                      className={`h-6 px-2 ${feedbackGiven === 'negative' ? 'bg-red-500/20' : ''}`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {message.reasoning && (
                    <Collapsible>
                      <CollapsibleTrigger
                        className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowReasoning(!showReasoning)}
                      >
                        <Brain className="w-3 h-3" />
                        <span>กระบวนการคิด</span>
                        {showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 p-2 bg-secondary/20 rounded text-xs">
                        {message.reasoning}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {message.sender === 'user' && (
        <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
