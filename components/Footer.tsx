import ArrowIcon from "./icons/ArrowIcon";

export default function Footer() {
  return (
    <div
      className="flex fixed bottom-0 left-[55px] bg-[#363636] w-full text-center items-center text-[#BDBDBD] space-x-2 text-md p-2"
      style={{
        height: "36px",
        zIndex: "10",
        border: "1px solid #595858",
      }}
    >
      <div>cart</div>
      <ArrowIcon />
      <div>cart_routes.py</div>
      <ArrowIcon />

      <div>POST /carts/&#123;cart_id&#125;</div>
    </div>
  );
}
