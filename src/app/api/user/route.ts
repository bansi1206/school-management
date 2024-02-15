import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().user.findMany({
    where: {
      role: {
        not: "SuperAdmin",
      },
    },
  });

  return Response.json(res);
}
