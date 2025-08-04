
export interface AIResponse {
  content: string;
  reasoning: string;
  sources?: string[];
}

class MockAIService {
  private responses = {
    general: [
      "ขอบคุณสำหรับคำถามครับ ฉันเป็น Deeja ผู้ช่วย AI ที่พร้อมช่วยเหลือคุณในทุกเรื่อง",
      "นั่นเป็นคำถามที่น่าสนใจมาก ให้ฉันอธิบายให้ฟังนะครับ",
      "ฉันเข้าใจในสิ่งที่คุณถามแล้ว มาดูคำตอบกันเลย",
      "ข้อมูลนี้น่าสนใจมาก ขอให้ฉันวิเคราะห์ให้คุณฟังครับ"
    ],
    developer: [
      "ในฐานะนักพัฒนา ฉันแนะนำให้คุณใช้เทคโนโลยีที่เหมาะสมกับงานนี้",
      "จากมุมมองของการเขียนโปรแกรม ปัญหานี้สามารถแก้ได้หลายวิธี",
      "ให้ฉันอธิบายแนวทางการพัฒนาที่เหมาะสมกับโปรเจกต์นี้",
      "เรามาดูรายละเอียดทางเทคนิคของเรื่องนี้กันครับ"
    ],
    researcher: [
      "จากการวิจัยล่าสุด ข้อมูลนี้มีความน่าสนใจในหลายมิติ",
      "ตามหลักการทางวิทยาศาสตร์ เราควรวิเคราะห์ข้อมูลอย่างเป็นระบบ",
      "การศึกษาแสดงให้เห็นถึงแนวโน้มที่น่าสนใจในเรื่องนี้",
      "ให้ฉันอธิบายจากมุมมองการวิจัยและข้อมูลเชิงประจักษ์"
    ],
    creative: [
      "ในแง่ของความคิดสร้างสรรค์ เรื่องนี้มีศักยภาพมาก",
      "ฉันได้แรงบันดาลใจจากคำถามนี้ มาสร้างสรรค์อะไรใหม่ๆ กันเถอะ",
      "เรื่องนี้เปิดโอกาสให้เราคิดนอกกรอบได้มาก",
      "ให้ฉันเสนอแนวทางที่มีความคิดสร้างสรรค์และแปลกใหม่"
    ]
  };

  async generateResponse(
    message: string, 
    mode: 'general' | 'developer' | 'researcher' | 'creative'
  ): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const modeResponses = this.responses[mode];
    const baseResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];
    
    let enhancedResponse = baseResponse;
    
    // Add context-specific responses
    if (message.toLowerCase().includes('โค้ด') || message.toLowerCase().includes('โปรแกรม')) {
      enhancedResponse += "\n\n```javascript\n// ตัวอย่างโค้ด\nconst example = () => {\n  console.log('Hello World!');\n};\n```";
    }
    
    if (message.toLowerCase().includes('ข้อมูล') || message.toLowerCase().includes('วิเคราะห์')) {
      enhancedResponse += "\n\n📊 จากข้อมูลที่วิเคราะห์:\n• ประเด็นสำคัญคือ...\n• แนวโน้มแสดงให้เห็นว่า...\n• ข้อเสนอแนะคือ...";
    }
    
    return {
      content: enhancedResponse,
      reasoning: `การวิเคราะห์ในโหมด ${mode}: ระบบพิจารณาบริบทของคำถาม วิเคราะห์ความเหมาะสมของคำตอบ และปรับโทนเสียงให้เหมาะกับบทบาทที่กำหนด`,
      sources: Math.random() > 0.5 ? [
        'https://example.com/reference1',
        'https://example.com/reference2'
      ] : undefined
    };
  }

  async summarizeConversation(messages: any[]): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const messageCount = messages.length;
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const aiMessages = messages.filter(m => m.sender === 'ai').length;
    
    return `สรุปบทสนทนา:
• จำนวนข้อความทั้งหมด: ${messageCount} ข้อความ
• ข้อความจากผู้ใช้: ${userMessages} ข้อความ
• ข้อความจาก AI: ${aiMessages} ข้อความ
• หัวข้อหลักที่สนทนา: การใช้งาน AI, เทคโนโลยี, และการแก้ปัญหา
• ธีมโดยรวม: บทสนทนาเป็นไปในลักษณะที่เป็นมิตรและให้ข้อมูลที่เป็นประโยชน์
• ข้อเสนอแนะ: ควรต่อยอดการสนทนาในประเด็นที่น่าสนใจเพิ่มเติม`;
  }
}

export const mockAIService = new MockAIService();
