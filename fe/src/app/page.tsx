import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/SearchBar";
import ActivityCardList from "@/components/home/ActivityCardList";
import BottomNavBar from "@/components/common/BottonNavBar";

export default function Home() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-4 pt-6">
        <SearchBar />
        <ActivityCardList />
      </div>
      <BottomNavBar />
    </>
  );
}
