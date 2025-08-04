export interface MemoryItem {
  id: string;
  userMessage: string;
  aiResponse: string;
  timestamp: Date;
  emotions: string[];
}

class MockMemoryService {
  private memories: MemoryItem[] = [];

  async storeConversation(userMessage: any, aiMessage: any): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const memoryItem: MemoryItem = {
      id: Date.now().toString(),
      userMessage: userMessage.content,
      aiResponse: aiMessage.content,
      timestamp: new Date(),
      emotions: aiMessage.emotion ? [aiMessage.emotion] : []
    };

    this.memories.push(memoryItem);
    
    // Keep only last 50 items for demo
    if (this.memories.length > 50) {
      this.memories = this.memories.slice(-50);
    }

    // Store in localStorage
    localStorage.setItem('zynx-deeja-memories', JSON.stringify(this.memories));
  }

  async retrieveMemories(): Promise<MemoryItem[]> {
    // Load from localStorage
    const stored = localStorage.getItem('zynx-deeja-memories');
    if (stored) {
      this.memories = JSON.parse(stored);
    }
    
    return this.memories;
  }

  async searchMemories(query: string): Promise<MemoryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const lowerQuery = query.toLowerCase();
    return this.memories.filter(item => 
      item.userMessage.toLowerCase().includes(lowerQuery) ||
      item.aiResponse.toLowerCase().includes(lowerQuery)
    );
  }

  async deleteMemory(id: string): Promise<void> {
    this.memories = this.memories.filter(item => item.id !== id);
    localStorage.setItem('zynx-deeja-memories', JSON.stringify(this.memories));
  }
}

export const mockMemoryService = new MockMemoryService();
