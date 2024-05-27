"use client";

import { useState } from "react";
import InputWithText from "./InputWithText";
import { InfoIcon, YellowGoIcon } from "./icons";
import Checkbox from "./Checkbox";

interface DependenciesProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Dependency({ name, onChange }: DependenciesProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex space-x-2 items-center">
      <Checkbox
        label="Check me"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange(e);
        }}
      />

      {/* <input
        value={name}
        onChange={onChange}
        type="checkbox"
        style={{
          width: "15px",
          height: "15px",
        }}
      /> */}
      <div className="text-[15px]">{name}</div>
      <YellowGoIcon />
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
        className="w-[450px] mt-[55px] bg-[#363636] text-white p-4 pb-0 no-scrollbar overflow-y-auto text-md"
        style={{
          maxHeight: "calc(100vh - 55px)",
          borderTop: "1px solid #505050",
        }}
      >
        <div className="text-[20px] font-bold">{name}</div>
        <div className="flex-col space-y-1 mt-5">
          <div className="flex space-x-2 items-center">
            <InfoIcon />
            <div>Last 2 commits scanned</div>
          </div>
          <div className="flex space-x-2 items-center">
            <InfoIcon />

            <div>5 entry points identified</div>
          </div>
        </div>

        <div className="flex-col space-y-2  mt-4">
          <div>Selected flow</div>
          <div className="select-wrapper">
            <select className="custom-select border-[1px] border-[#D9D9D9] bg-[#363636] w-full px-[10px] py-[6px] rounded-[3px]">
              <option className="text-md">
                POST /carts/&#123;cart_id&#125;
              </option>
            </select>
          </div>
        </div>

        <div className="flex-col space-y-2 mt-5">
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

        <div className="flex-col space-y-3 mt-10">
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

        <div className="flex-col space-y-4 mt-8 mb-6">
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

        <div
          className="sticky bottom-0 right-0 w-[calc(100%+2rem)] bg-[#363636] text-white h-[53px] justify-center ml-[-16px]"
          style={{
            zIndex: "1000",
            borderTop: "1px solid #595858",
            borderLeft: "1px solid #595858",
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
      </div>
    </>
  );
}
