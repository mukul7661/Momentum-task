import { dependencies } from "@/lib/db";

export async function GET(request: Request) {
  return Response.json({ dependencies });
}
