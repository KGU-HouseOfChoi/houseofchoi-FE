import BottonNavBar from "@/components/common/BottonNavBar";

export default function Home() {
  return (
    <>
      <main className=" w-full max-w-[414px] mx-auto p-10 pb-[124px] bg-bgColor-light  font-sans">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-brand-normal mb-6">
          Pretendard 폰트 & 커스텀 색상 테스트
        </h1>

        {/* 텍스트 컬러 테스트 */}
        <section className="space-y-2 mb-8">
          <p className="text-textColor-heading text-xl">
            제목 텍스트 (grayscale-90)
          </p>
          <p className="text-textColor-body">본문 텍스트 (grayscale-70)</p>
          <p className="text-textColor-sub">서브 텍스트 (grayscale-50)</p>
          <p className="text-textColor-disabled">
            비활성 텍스트 (grayscale-40)
          </p>
          <p className="text-textColor-white bg-grayscale-100 p-2 rounded">
            흰색 텍스트 + 검정 배경
          </p>
        </section>

        {/* 버튼 컬러 테스트 */}
        <section className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-brand-normal text-white rounded-lg">
            Brand Normal
          </button>
          <button className="px-4 py-2 bg-brand-hover text-white rounded-lg">
            Brand Hover
          </button>
          <button className="px-4 py-2 bg-brand-active text-white rounded-lg">
            Brand Active
          </button>
        </section>

        {/* 상태 컬러 테스트 */}
        <section className="space-x-3 mb-8">
          <span className="px-3 py-1 bg-danger-50 text-white rounded">
            Danger
          </span>
          <span className="px-3 py-1 bg-success-50 text-white rounded">
            Success
          </span>
          <span className="px-3 py-1 bg-warning-50 text-white rounded">
            Warning
          </span>
        </section>

        {/* 배경 / 테두리 테스트 */}
        <section className="p-4 rounded-lg border border-borderColor-default bg-bgColor-surface">
          <p className="text-bgColor-deep">
            배경: surface / 테두리: default / 텍스트: deep
          </p>
        </section>
      </main>
      <BottonNavBar />
    </>
  );
}
