import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/SearchBar";
import ActivityCardList from "@/components/home/ActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";

export default function Home() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <ActivityCardList />
      </div>
      <BottomNavBar />
    </>
  );
}
