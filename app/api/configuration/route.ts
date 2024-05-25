import { addIds, graph, configuration } from "@/lib/db";

export async function GET(request: Request) {
  return Response.json({ configuration });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data, "data");
  configuration.is_db_mocked = data;

  return Response.json({ msg: "success" });
}
