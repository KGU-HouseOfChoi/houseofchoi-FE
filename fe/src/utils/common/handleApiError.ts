export function handleApiError(error: unknown, message: string) {
    console.error("API Error:", error);
  
    if (typeof window !== "undefined") {
      alert(message); 
    }
  }