import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  reasoning?: string;
  sources?: any[];
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
}

export function useSecureConversations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      const conversationsWithMessages = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          const { data: messagesData, error: messagesError } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: true });

          if (messagesError) throw messagesError;

          return {
            ...conv,
            created_at: new Date(conv.created_at),
            updated_at: new Date(conv.updated_at),
            messages: (messagesData || []).map(msg => ({
              ...msg,
              timestamp: new Date(msg.created_at)
            }))
          };
        })
      );

      setConversations(conversationsWithMessages);
      
      // Set current conversation to the most recent one if none selected
      if (!currentConversationId && conversationsWithMessages.length > 0) {
        setCurrentConversationId(conversationsWithMessages[0].id);
      }
    } catch (error: any) {
      toast({
        title: "Failed to load conversations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (title?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: title || 'New Conversation'
        })
        .select()
        .single();

      if (error) throw error;

      const newConversation: Conversation = {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        messages: []
      };

      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
      
      return newConversation.id;
    } catch (error: any) {
      toast({
        title: "Failed to create conversation",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const addMessage = async (content: string, sender: 'user' | 'ai', metadata?: {
    emotion?: string;
    reasoning?: string;
    sources?: any[];
  }) => {
    if (!user) return;

    let conversationId = currentConversationId;
    
    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content,
          sender,
          emotion: metadata?.emotion,
          reasoning: metadata?.reasoning,
          sources: metadata?.sources
        })
        .select()
        .single();

      if (error) throw error;

      const newMessage: ChatMessage = {
        ...data,
        timestamp: new Date(data.created_at)
      };

      // Update local state
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      ));

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

    } catch (error: any) {
      toast({
        title: "Failed to save message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteConversation = async (conversationId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId)
        .eq('user_id', user.id);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversationId === conversationId) {
        const remaining = conversations.filter(c => c.id !== conversationId);
        setCurrentConversationId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error: any) {
      toast({
        title: "Failed to delete conversation",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    conversations,
    currentConversation,
    currentConversationId,
    loading,
    createConversation,
    addMessage,
    deleteConversation,
    setCurrentConversationId
  };
}