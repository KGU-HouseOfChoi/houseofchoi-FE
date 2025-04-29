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
    const msgTime = new Date(msg.timestamp).toTimeString().slice(0, 5);

    if (
      lastGroup &&
      lastGroup.sender === msg.sender &&
      lastGroup.isUser === msg.isUser &&
      new Date(lastGroup.timestamp).toTimeString().slice(0, 5) === msgTime
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
