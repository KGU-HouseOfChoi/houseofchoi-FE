'use client';

import { useState, useEffect } from 'react';
import { analyzeUserTrait } from '@/apis/chatbot/analyzeUserTrait';

export function useMessageCount() {
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const incrementMessageCount = async () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    
    if (newCount === 30) {
      setLoading(true);
      try {
        await analyzeUserTrait();
        console.log("✅ 30번째 메시지 도달로 자동 성향 분석 완료");
       
        setMessageCount(0);
      } catch (error) {
        console.log("❌ 자동 성향 분석 실패:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    messageCount,
    loading,
    incrementMessageCount
  };
} 