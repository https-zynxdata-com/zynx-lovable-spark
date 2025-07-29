
export interface EmotionResult {
  emotion: string;
  confidence: number;
}

class MockEmotionService {
  private emotionKeywords = {
    joy: ['ดี', 'สนุก', 'มีความสุข', 'ยิ้ม', 'ชอบ', 'รัก', 'เยื่อเย็น', 'ยอดเยี่ยม'],
    sadness: ['เศร้า', 'เสียใจ', 'ผิดหวัง', 'ร่ำไห', 'เปล่า', 'ไม่ดี', 'แย่'],
    anger: ['โกรธ', 'งั่น', 'ฉุนเฉียว', 'หงุดหงิด', 'รำคาญ', 'ไม่พอใจ', 'แกล้ง'],
    fear: ['กลัว', 'กังวล', 'ห่วง', 'ตื่นเต้น', 'ประหม่า', 'ไม่แน่ใจ', 'อันตราย'],
    surprise: ['แปลกใจ', 'ตกใจ', 'ไม่คิดมาก่อน', 'ทึ่ง', 'ยากเย็น', 'ประหลาด'],
    disgust: ['น่ารังเกียจ', 'ไม่ชอบ', 'แย่มาก', 'ไม่พอใจ', 'น่าเบื่อ']
  };

  async analyzeEmotion(text: string): Promise<EmotionResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const scores: Record<string, number> = {
      joy: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      neutral: 0.3
    };

    const lowerText = text.toLowerCase();

    // Score based on keywords
    for (const [emotion, keywords] of Object.entries(this.emotionKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          scores[emotion] += 0.2;
        }
      }
    }

    // Add some randomness for demo
    for (const emotion in scores) {
      scores[emotion] += Math.random() * 0.1;
    }

    // Find the emotion with highest score
    const maxEmotion = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    );

    return {
      emotion: maxEmotion[0],
      confidence: Math.min(maxEmotion[1], 0.95)
    };
  }
}

export const mockEmotionService = new MockEmotionService();
