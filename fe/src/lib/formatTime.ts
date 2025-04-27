
export const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;
  
    return `${isPM ? '오후' : '오전'} ${hour12}:${minutes}`;
  };
  