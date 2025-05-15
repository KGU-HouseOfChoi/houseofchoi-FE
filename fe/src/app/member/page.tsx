import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/search/SearchBar";
import MemberActivityCardList from "@/components/home/MemberActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";

export default function MemberPage() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <MemberActivityCardList />
      </div>
      <BottomNavBar />
    </>
  );
}
