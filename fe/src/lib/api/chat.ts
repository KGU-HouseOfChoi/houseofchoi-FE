export async function fetchChatAnswer(user_id: string, message: string): Promise<string> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, message }),
      });
  
    if (!res.ok) throw new Error("GPT API 호출 실패");
  
    const data = await res.json();
    console.log("🔍 응답 내용:", data);
    
    return data.chatbot_response || "답변을 불러오지 못했어요.";
  }
  