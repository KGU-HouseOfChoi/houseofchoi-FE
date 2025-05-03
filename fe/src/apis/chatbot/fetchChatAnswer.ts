export async function fetchChatAnswer(userId: string, message: string): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, message }),
    });
  
    if (!res.ok) throw new Error("GPT 응답 실패");
  
    const data = await res.json();
    return data.text; // ← 백엔드가 이렇게 응답한다고 가정
  }
  