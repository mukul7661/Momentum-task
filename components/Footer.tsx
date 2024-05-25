import Image from "next/image";
import Polygon from "@/components/assets/Polygon 2.png";

export default function Footer() {
  return (
    <div
      className="flex fixed bottom-0 left-[56px] bg-[#363636] w-full text-center items-center text-[#BDBDBD] space-x-2 text-md p-2"
      style={{
        height: "36px",
        zIndex: "10",
        border: "1px solid white",
      }}
    >
      <div>cart</div>
      <Image
        width={9}
        height={9}
        alt="Polygon 2"
        className="h-[9px] w-[9px]"
        src={Polygon}
      />
      <div>cart_routes.py</div>
      <Image
        width={9}
        height={9}
        alt="Polygon 2"
        className="h-[9px] w-[9px]"
        src={Polygon}
      />

      <div>POST /carts/&#123;cart_id&#125;</div>
    </div>
  );
}
