import logo from "@/components/assets/logo.png";
import hamburger from "@/components/assets/Hamburger.png";
import Restart from "@/components/assets/Frame.png";
import Repo from "@/components/assets/versions-svgrepo-com 1.png";
import Git from "@/components/assets/git-icon-logo-svgrepo-com 1.png";
import Profile from "@/components/assets/Screenshot 2022-08-22 at 5.44 1 (1).png";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div
        className="fixed z-1000 w-[55px] h-full bg-[#363636] top-0 left-0 flex-col items-center justify-between"
        style={{
          zIndex: "100",
        }}
      >
        <div className="flex-col space-y-8">
          <Image
            width={160}
            height={160}
            alt="Polygon"
            // className="fixed top-4 left-2"
            className="mt-4 m-auto"
            src={logo}
          ></Image>
          <Image
            width={30}
            height={30}
            alt="Polygon"
            // className="fixed top-20 left-2"
            className="m-auto"
            src={hamburger}
          ></Image>
          <Image
            width={30}
            height={30}
            alt="Polygon"
            //  className="fixed top-40 left-3"
            className="m-auto"
            src={Restart}
          ></Image>
          <Image
            width={30}
            height={30}
            alt="Polygon"
            // className="fixed top-60 left-3"
            className="m-auto"
            src={Repo}
          ></Image>
          <Image
            width={30}
            height={30}
            alt="Polygon"
            // className="fixed top-60 left-3"
            className="m-auto"
            src={Git}
          ></Image>
        </div>

        <Image
          width={30}
          height={30}
          alt="Polygon"
          className="fixed bottom-6 left-[10px]"
          // className="m-auto"
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
