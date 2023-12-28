import Card from "@/components/ui/Card";
import React from "react";
import { BiSolidPencil } from "react-icons/bi";
interface UserInfoSectionSkeletonProps {}

const UserInfoSectionSkeleton: React.FC<UserInfoSectionSkeletonProps> = () => {
  const userInfo = null;
  return (
    <section className="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
      <Card className="w-fit flex items-center gap-4">
        <div className="relative group">
          <div className="skeleton !rounded-full !h-[100px] w-[100px]"></div>
        </div>
        <div>
          <h2 className="skeleton text-2xl font-bold w-24"></h2>
          <p className="skeleton text-cyan-500 w-36"></p>
        </div>
      </Card>
      <div className="flex flex-row justify-between w-full gap-4 md:w-1/2 md:flex-col">
        <Card
          padding="small"
          className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row"
        >
          <p className="skeleton w-36"></p>
          <p className="skeleton text-3xl font-bold text-cyan-500 w-12"></p>
        </Card>
        <Card
          padding="small"
          className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row"
        >
          <p className="skeleton w-36"></p>
          <p className="skeleton text-3xl font-bold text-cyan-500 w-12"></p>
        </Card>
      </div>
    </section>
  );
};

export default UserInfoSectionSkeleton;
