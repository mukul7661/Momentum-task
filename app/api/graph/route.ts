import { addIds, graph } from "@/lib/db";

export async function GET(request: Request) {
  addIds(graph);

  return Response.json({ graph });
}
