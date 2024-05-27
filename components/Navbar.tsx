import Profile from "../public/Profile.svg";
import Image from "next/image";
import { RepoIcon, GitIcon, Logo, HamburgerIcon, RestartIcon } from "./icons";

export default function Navbar() {
  return (
    <>
      <div
        className="fixed z-1000 w-[55px] h-full bg-[#363636] top-0 left-0 flex-col items-center justify-between"
        style={{
          zIndex: "100",
        }}
      >
        <div className="flex-col space-y-8 mt-4">
          <Logo />
          <HamburgerIcon />
          <RestartIcon />
          <RepoIcon />
          <GitIcon />
        </div>

        <Image
          width={35}
          height={33.57}
          alt="Polygon"
          className="fixed bottom-6 left-[10px]"
          src={Profile}
        ></Image>
      </div>
      <div
        className="fixed h-[55px] w-full bg-[#363636] top-0 left-0"
        style={{
          zIndex: "90",
        }}
      >
        <div className="text-white text-md fixed top-4 left-[76px] font-medium">
          Configure Flows
        </div>
      </div>
    </>
  );
}
