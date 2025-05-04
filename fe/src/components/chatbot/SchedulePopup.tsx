const SchedulePopup = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl px-6 py-4 text-center shadow-lg w-[300px]">
          <p className="text-lg font-semibold mb-2">✅ 일정이 등록되었습니다!</p>
          <p className="text-sm text-gray-600">마이페이지에서 확인할 수 있어요.</p>
        </div>
      </div>
    );
  };
  
  export default SchedulePopup;
  