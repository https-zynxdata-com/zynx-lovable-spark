
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Upload, 
  Settings,
  Moon,
  Sun,
  Bot,
  User,
  Brain,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Volume2,
  Send,
  Wand2,
  FileText,
  Image,
  Archive
} from 'lucide-react';
import { ChatMessage } from './chat/ChatMessage';
import { WelcomeBanner } from './chat/WelcomeBanner';
import { VoiceInput } from './chat/VoiceInput';
import { FileUpload } from './chat/FileUpload';
import { PromptGenerator } from './chat/PromptGenerator';
import { EmotionPanel } from './chat/EmotionPanel';
import { mockAIService } from '../services/mockAIService';
import { mockEmotionService } from '../services/mockEmotionService';
import { mockMemoryService } from '../services/mockMemoryService';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  reasoning?: string;
  sources?: string[];
}

export default function ZynxDeejaPlatform() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [conversationMode, setConversationMode] = useState<'general' | 'developer' | 'researcher' | 'creative'>('general');
  const [currentEmotion, setCurrentEmotion] = useState<{ emotion: string; confidence: number } | null>(null);
  const [ethicsFlag, setEthicsFlag] = useState(false);
  const [showPromptGenerator, setShowPromptGenerator] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load from localStorage
    const savedMessages = localStorage.getItem('zynx-deeja-messages');
    const savedTheme = localStorage.getItem('zynx-deeja-theme');
    const savedApiKey = localStorage.getItem('zynx-deeja-api-key');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('zynx-deeja-messages', JSON.stringify(messages));
    localStorage.setItem('zynx-deeja-theme', darkMode ? 'dark' : 'light');
    if (apiKey) {
      localStorage.setItem('zynx-deeja-api-key', apiKey);
    }
  }, [messages, darkMode, apiKey]);

  useEffect(() => {
    // Apply theme
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    playNotificationSound();
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Analyze emotion
      const emotionResult = await mockEmotionService.analyzeEmotion(inputMessage);
      setCurrentEmotion(emotionResult);
      setEthicsFlag(emotionResult.confidence > 0.8 && ['anger', 'sadness', 'fear'].includes(emotionResult.emotion));

      // Get AI response
      const aiResponse = await mockAIService.generateResponse(inputMessage, conversationMode);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        emotion: emotionResult.emotion,
        reasoning: aiResponse.reasoning,
        sources: aiResponse.sources,
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Store in memory service
      await mockMemoryService.storeConversation(userMessage, aiMessage);
      
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputMessage(text);
  };

  const handleFileUpload = (file: File) => {
    const message = `[ไฟล์ที่อัปโหลด: ${file.name}]`;
    setInputMessage(prev => prev + message);
    
    toast({
      title: "อัปโหลดไฟล์สำเร็จ",
      description: `ไฟล์ ${file.name} ถูกเพิ่มเข้าข้อความแล้ว`,
    });
  };

  const handlePromptGenerated = (prompt: string) => {
    setInputMessage(prompt);
    setShowPromptGenerator(false);
    // Auto-send the generated prompt
    setTimeout(() => {
      handleSendMessage();
    }, 500);
  };

  const handleFeedback = (messageId: string, type: 'positive' | 'negative') => {
    toast({
      title: `ขอบคุณสำหรับ Feedback ${type === 'positive' ? 'เชิงบวก' : 'เชิงลบ'}`,
      description: "ข้อมูลนี้จะช่วยปรับปรุงการตอบสนองของ AI",
    });
  };

  const handleMeetDeeja = () => {
    setShowWelcome(false);
    const welcomeMessage = `สวัสดี! ฉันคือ Deeja 🤖 ผู้ช่วย AI ที่พร้อมช่วยเหลือคุณในทุกเรื่อง\n\nฉันสามารถช่วยคุณได้ในด้านต่างๆ เช่น:\n• การเขียนโปรแกรม\n• การวิเคราะห์ข้อมูล\n• การสร้างเนื้อหา\n• การตอบคำถาม\n• และอื่นๆ อีกมากมาย\n\nลองถามอะไรฉันสิ!`;
    
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      content: welcomeMessage,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages([aiMessage]);
  };

  const handleSummarizeConversation = async () => {
    if (messages.length === 0) {
      toast({
        title: "ไม่มีบทสนทนาที่จะสรุป",
        description: "กรุณาเริ่มบทสนทนาก่อน",
      });
      return;
    }

    setIsLoading(true);
    try {
      const summary = await mockAIService.summarizeConversation(messages);
      
      const summaryMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `📋 **สรุปบทสนทนา:**\n\n${summary}`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสรุปบทสนทนาได้",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-sm">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Zynx+Deeja
                  </h1>
                  <p className="text-sm text-muted-foreground">AGI Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConversationMode('general')}
                    className={conversationMode === 'general' ? 'bg-primary/20' : ''}
                  >
                    ทั่วไป
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConversationMode('developer')}
                    className={conversationMode === 'developer' ? 'bg-primary/20' : ''}
                  >
                    นักพัฒนา
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConversationMode('researcher')}
                    className={conversationMode === 'researcher' ? 'bg-primary/20' : ''}
                  >
                    นักวิจัย
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConversationMode('creative')}
                    className={conversationMode === 'creative' ? 'bg-primary/20' : ''}
                  >
                    นักสร้างสรรค์
                  </Button>
                </div>
                
                <Separator orientation="vertical" className="h-6" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {showApiKeyInput && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Input
                    type="password"
                    placeholder="ใส่ API Key (Demo Mode - ไม่จำเป็นต้องใส่)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => setShowApiKeyInput(false)}
                    variant="secondary"
                  >
                    บันทึก
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * ในโหมด Demo นี้ ระบบจะใช้ Mock Data ไม่จำเป็นต้องใส่ API Key จริง
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Emotion Panel */}
            <div className="lg:col-span-1">
              <EmotionPanel 
                currentEmotion={currentEmotion}
                ethicsFlag={ethicsFlag}
                onSummarize={handleSummarizeConversation}
              />
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-200px)] bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span>แชทกับ Deeja</span>
                    <Badge variant="secondary" className="ml-auto">
                      {conversationMode === 'general' && 'โหมดทั่วไป'}
                      {conversationMode === 'developer' && 'โหมดนักพัฒนา'}
                      {conversationMode === 'researcher' && 'โหมดนักวิจัย'}
                      {conversationMode === 'creative' && 'โหมดนักสร้างสรรค์'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col h-full p-0">
                  {/* Messages Area */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                  >
                    {showWelcome && (
                      <WelcomeBanner onMeetDeeja={handleMeetDeeja} />
                    )}
                    
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onFeedback={handleFeedback}
                      />
                    ))}
                    
                    {isLoading && (
                      <div className="flex items-center space-x-2 p-4 bg-secondary/20 rounded-lg">
                        <Bot className="w-5 h-5 text-primary animate-pulse" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Deeja กำลังคิด...</span>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <VoiceInput onVoiceInput={handleVoiceInput} />
                      <FileUpload onFileUpload={handleFileUpload} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPromptGenerator(true)}
                      >
                        <Wand2 className="w-4 h-4 mr-1" />
                        Prompt Generator
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="พิมพ์ข้อความของคุณที่นี่..."
                          className="w-full resize-none rounded-lg border border-border bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          rows={2}
                          disabled={isLoading}
                        />
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Prompt Generator Modal */}
        {showPromptGenerator && (
          <PromptGenerator
            onPromptGenerated={handlePromptGenerated}
            onClose={() => setShowPromptGenerator(false)}
          />
        )}
      </div>
    </div>
  );
}
