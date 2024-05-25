import React from "react";

import "reactflow/dist/style.css";
import RightPanel from "@/components/RightPanel";
import { FlowComponent } from "@/components/Graph";

async function fetchGraphData() {
  try {
    const response = await fetch("https://momentum-task.vercel.app/api/graph");
    const data = await response.json();
    return data?.graph;
  } catch (err) {
    console.log(err);
  }
}

async function fetchDependencies() {
  const res = await fetch("https://momentum-task.vercel.app/api/dependencies");
  const data = await res.json();
  return data.dependencies;
}

async function fetchConfiguration(name: string) {
  const res = await fetch(
    "https://momentum-task.vercel.app/api/configuration?flow=" + name
  );
  const data = await res.json();
  return data?.configuration;
  // setUsername(data?.configuration?.db_config?.username);
  // setPassword(data?.configuration?.db_config?.password);
  // setEntitiesToMock(data?.configuration?.entities_to_mock);
}

const App = async () => {
  const graphData = await fetchGraphData();
  const dependencies = await fetchDependencies();
  const configuration = await fetchConfiguration(
    graphData?.function?.split(":")[1]
  );
  return (
    <div className="flex">
      <FlowComponent graphData={graphData} />
      <RightPanel
        name={graphData?.function?.split(":")[1]}
        dependencies={dependencies}
        configuration={configuration}
      />
    </div>
  );
};

export default App;
