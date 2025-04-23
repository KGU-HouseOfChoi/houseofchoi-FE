import ActivityCard from "./ActivityCard";

const mockData = [
  {
    imageUrl: "/images/logo.svg",
    title: "요가 클래스",
    location: "서초동 복지관",
  },
  {
    imageUrl: "/images/logo.svg",
    title: "스마트폰 교실",
    location: "강남 노인회관",
  },
];

export default function ActivityCardList() {
  return (
    <section className="flex flex-col items-center gap-4">
      {mockData.map((item, idx) => (
        <ActivityCard
          key={idx}
          imageUrl={item.imageUrl}
          title={item.title}
          location={item.location}
        />
      ))}

      {/* 리스트 끝 안내 */}
      <div className="mt-8 mb-32 text-textColor-disabled text-center text-xl">
        추천 활동은 여기까지입니다!
      </div>
    </section>
  );
}
