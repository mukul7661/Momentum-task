"use client";

import { useEffect, useState } from "react";
import Info from "@/components/assets/Group 57.png";
import Group65 from "@/components/assets/Group 65.png";
import InputWithText from "./InputWithText";
import Image from "next/image";

interface DependenciesProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Dependency({ name, onChange }: DependenciesProps) {
  return (
    <div className="flex space-x-2 items-center">
      <input
        value={name}
        onChange={onChange}
        type="checkbox"
        style={{
          width: "15px",
          height: "15px",
        }}
      />
      <div className="text-[15px]">{name}</div>
      <Image
        width={13}
        height={13}
        alt="Polygon 2"
        style={{ marginLeft: "auto" }}
        className="w-[13px] h-[13px]"
        src={Group65}
      />
    </div>
  );
}

interface RightPanelProps {
  name: string;
  dependencies?: string[];
  configuration: any;
}

export default function RightPanel({
  name,
  dependencies,
  configuration,
}: RightPanelProps) {
  const [isDatabaseMocked, setIsDatabaseMocked] = useState<boolean>(
    configuration?.is_db_mocked
  );
  const [entitiesToMock, setEntitiesToMock] = useState<string[]>(
    configuration?.entities_to_mock ?? []
  );
  const handleIsDatabaseMocked = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setIsDatabaseMocked(e.target.checked);
    setIsDatabaseMocked((prev) => !prev);
  };

  const handleSaveConfiguration = async () => {
    const res = await fetch("/api/configuration", {
      method: "POST",
      body: JSON.stringify({
        flow: name,
        is_db_mocked: isDatabaseMocked,
        entities_to_mock: entitiesToMock,
        db_config: {
          username,
          password,
        },
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const [username, setUsername] = useState(configuration?.db_config?.username);
  const [password, setPassword] = useState(configuration?.db_config?.password);
  const [hostName, setHostName] = useState("");
  const [depenedencies, setDependencies] = useState(dependencies ?? []);

  const handleDependencyCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEntitiesToMock([...entitiesToMock, e.target.value]);
    } else {
      setEntitiesToMock(
        entitiesToMock.filter((entity) => entity !== e.target.value)
      );
    }
  };

  return (
    <>
      <div
        className="w-[500px] mt-[55px] bg-[#363636] text-white p-4 space-y-8 no-scrollbar overflow-y-auto "
        style={{
          maxHeight: "calc(100vh - 55px)",
          borderTop: "1px solid #B7B7B7",
        }}
      >
        <div className="text-lg font-bold">{name}</div>
        <div className="flex-col space-y-1">
          <div className="flex space-x-2 items-center">
            <Image
              height={12}
              width={12}
              alt="Info"
              src={Info}
              className="w-[12px] h-[12px]"
            />
            <div>Last 2 commits scanned</div>
          </div>
          <div className="flex space-x-2 items-center">
            <Image
              width={12}
              height={12}
              alt={"Info"}
              src={Info}
              className="w-[12px] h-[12px]"
            />
            <div>5 entry points identified</div>
          </div>
        </div>

        <div className="flex-col space-y-2">
          <div>Selected Flow</div>
          <div className="select-wrapper">
            <select className="custom-select border-2 border-[#D9D9D9] bg-[#363636] w-full p-2 rounded-md">
              <option>POST /carts/&#123;cart_id&#125;</option>
            </select>
          </div>
        </div>
        <div className="flex-col space-y-2">
          <div className="text-md ">Dependencies</div>
          <div className="text-sm text-[#B7B7B7]">
            Select the ones you want to mock
          </div>
          <div className="flex-col space-y-3">
            {depenedencies?.map((dep) => (
              <Dependency
                key={dep}
                name={dep}
                onChange={handleDependencyCheck}
              />
            ))}
          </div>
        </div>

        <div className="flex-col space-y-2 mt-20">
          <div className="text-md ">Databases</div>
          <div className="text-sm text-[#B7B7B7]">
            Select if you want to mock databases{" "}
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              checked={isDatabaseMocked}
              // value={isDatabaseMocked ? true : false}
              onChange={handleIsDatabaseMocked}
            />
            <div className="text-[15px]">I want to mock databases</div>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              checked={!isDatabaseMocked}
              // value={isDatabaseMocked}
              onChange={handleIsDatabaseMocked}
            />
            <div className="text-[15px]">I don’t want to mock database</div>
          </div>
        </div>

        <div className="flex-col space-y-4" style={{ marginBottom: "70px" }}>
          <div className="text-md ">Database Configurations</div>

          {/* <div className="flex space-x-2 items-center"> */}
          <InputWithText
            initialValue={username}
            onChange={setUsername}
            isDisabled={isDatabaseMocked}
            text="Database User"
          />
          <InputWithText
            initialValue={password}
            onChange={setPassword}
            isDisabled={isDatabaseMocked}
            text="Database Password"
          />
          <InputWithText
            initialValue={hostName}
            onChange={setHostName}
            isDisabled={isDatabaseMocked}
            text="Database Hostname"
          />
          {/* </div> */}
        </div>
      </div>

      <div
        className="fixed bottom-0 right-0 w-[380px] bg-[#363636] text-white h-[53px] justify-center"
        style={{
          zIndex: "1000",
          borderTop: "1px solid #B7B7B7",
          borderLeft: "1px solid #B7B7B7",
        }}
      >
        <button
          className="bg-[#009FF9] text-white text-[14px] px-5 py-[6px] rounded-[4px] fixed bottom-2 right-2"
          style={{
            float: "right",
          }}
          onClick={handleSaveConfiguration}
        >
          Save
        </button>
      </div>
    </>
  );
}
