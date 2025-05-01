import { Message } from "@/types/chatbot";

export function groupMessages(messages: Message[]) {
  const groups: {
    sender: string;
    profileUrl: string;
    timestamp: string;
    isUser?: boolean;
    items: Message[];
  }[] = [];

  for (const msg of messages) {
    const lastGroup = groups[groups.length - 1];
    const msgDate = new Date(msg.timestamp);
    const msgTime = `${msgDate.getHours()}:${msgDate.getMinutes()}`;

    if (
      lastGroup &&
      lastGroup.sender === msg.sender &&
      lastGroup.isUser === msg.isUser &&
      (() => {
        const lastDate = new Date(lastGroup.timestamp);
        return lastDate.getHours() === msgDate.getHours() && 
        lastDate.getMinutes() === msgDate.getMinutes();
      })()
    ) {
      lastGroup.items.push(msg);
    } else {
      groups.push({
        sender: msg.sender,
        profileUrl: msg.profileUrl,
        timestamp: msg.timestamp,
        isUser: msg.isUser,
        items: [msg],
      });
    }
  }

  return groups;
}
