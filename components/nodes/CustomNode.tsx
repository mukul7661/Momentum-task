import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { WhiteGoIcon } from "../icons";

export type CustomNodeData = {
  fileName: string;
  dependentLibs: string;
  params: string[];
  responseObject: string;
  id: string;
};

export function CustomNode({ xPos, yPos, data }: NodeProps<CustomNodeData>) {
  const x = `${Math.round(xPos)}px`;
  const y = `${Math.round(yPos)}px`;
  return (
    <>
      <div
        className="flex text-white text-[14px] items-center justify-between border-[#FFAD62] border-2 p-2"
        style={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
      >
        <div>{data.fileName}</div>

        <WhiteGoIcon />
      </div>
      <div
        className="border-[#FFAD62] border-2 p-2 text-[14px] text-white overflow-hidden h-[130px] w-[350px] font-medium flex-col space-y-2 justify-center items-center"
        style={{
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          borderTop: "none",
        }}
        // style={{
        //   border: "1px solid #FFAD62",
        //   borderRadius: "4px",
        // }}
      >
        <div className="mt-2 mb-2">{data.dependentLibs}</div>
        <div className="flex text-[10px]">
          <div className="mr-1 text-[#FFAD62]">“Dependent Libs” </div>: [“
          {data.dependentLibs}”]
        </div>
        <div className="flex text-[10px]">
          <div className="mr-1 text-[#FFAD62]">“Params” </div> : [
          {data?.params?.map((param, idx) => {
            return (
              <div className="mr-1" key={idx}>
                “{param}”{idx === data.params.length - 1 ? "" : ", "}
              </div>
            );
          })}
          ]
        </div>
        <div className="flex text-[10px]">
          <div className="mr-1 text-[#FFAD62]">“ResponseObject”</div> : “{" "}
          {data.responseObject}”
        </div>
        <Handle
          type="source"
          position={Position.Right}
          style={{
            visibility: "hidden",
          }}
        />
        <Handle
          type="target"
          style={{
            visibility: "hidden",
          }}
          position={Position.Left}
        />
      </div>
    </>
  );
}
