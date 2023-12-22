import Card from "@/components/ui/Card";
import { useUserInfo } from "@/hooks/useUserInfo";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import UserService from "@/services/UserService";
import { getFileLink } from "@/utils/utils";
import Image from "next/image";
import React, { ChangeEvent, useMemo } from "react";
import { BiSolidPencil } from "react-icons/bi";
import UserInfoSectionSkeleton from "./UserInfoSectionSkeleton";
interface UserInfoSectionProps {
  userId: string;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ userId }) => {
  const { userInfo, update } = useUserInfo(userId);
  async function upload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await UserService.uploadAvatar(formData);
    update();
  }
  const avgPercent = useMemo(() => {
    const avg =
      userInfo?.results?.reduce(
        (a, c) => (a += c.score / c.questions_count),
        0
      ) / userInfo?.results.length || 0;

    return Math.round(avg * 100);
  }, [userInfo]);

  if (!userInfo) return <UserInfoSectionSkeleton />;

  return (
    <section className="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
      <Card className="w-fit flex items-center gap-4">
        <div className="relative group">
          <Image
            alt="User Image"
            className="rounded-full"
            height="100"
            width="100"
            src={getFileLink(userInfo?.user?.avatar, "avatars")}
            style={{
              aspectRatio: "1",
              objectFit: "cover",
            }}
          />
          <div className="absolute bottom-0 right-0 bg-zinc-800 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100">
            <BiSolidPencil className="w-4" />
          </div>
          <input
            onChange={upload}
            type="file"
            className="absolute inset-0 opacity-0"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{userInfo?.user.username}</h2>
          <p className="text-cyan-500">{userInfo?.user.email}</p>
        </div>
      </Card>
      <div className="flex flex-row justify-between w-full gap-4 md:w-1/2 md:flex-col">
        <Card
          padding="small"
          className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row px-2 md:px-8"
        >
          <p className="">Пройдено тестов</p>
          <p className="text-3xl font-bold text-cyan-500">
            {userInfo?.results.length}
          </p>
        </Card>
        <Card
          padding="small"
          className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row px-2 md:px-8"
        >
          <p className="">Средний балл</p>
          <p className="text-3xl font-bold text-cyan-500">{avgPercent}%</p>
        </Card>
      </div>
    </section>
  );
};

export default UserInfoSection;
