import type { FC } from 'react';
import Image from 'next/image';
import VoiceInput from '@/components/chatbot/VoiceInput';

const ChatbotBottom: FC = () => {
  return (
    <div className="w-full bg-white h-[85px] flex items-center justify-center py-[15px] px-[9px] gap-[9px] text-[19px] text-gray font-pretendard">
      
      {/* 음성 입력 버튼 */}
      <VoiceInput />

      {/* 텍스트 입력창 */}
      <div className="w-[294px] h-[54px] rounded-2xl bg-whitesmoke border border-gainsboro flex items-center justify-between py-[7px] px-3 gap-3.5 box-border">
        <div className="text-gray-500">궁금한 내용을 입력해주세요.</div>
        <Image
          src="/default/bold/send-2.svg"
          width={36}
          height={36}
          alt="전송"
        />
      </div>

    </div>
  );
};

export default ChatbotBottom;
