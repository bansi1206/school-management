import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const students = await getPrisma().student.findMany({
    where: {
      classId: params.slug as string,
    },
    include: {
      user: true,
      class: true,
    },
  });

  const classInfo = await getPrisma().class.findUnique({
    where: {
      id: params.slug as string,
    },
  });

  return Response.json({
    students,
    classInfo,
  });
}
