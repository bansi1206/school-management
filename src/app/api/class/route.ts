import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().class.findMany({
    include: {
      students: true,
    },
  });

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const existingClasses = await getPrisma().class.findMany({
    select: {
      title: true,
    },
  });

  const existingTitlesLowercase = existingClasses.map((classes) =>
    classes.title?.toLowerCase()
  );

  const dataTitles = data.title.map((title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (existingTitlesLowercase.includes(lowercaseTitle)) {
      return title;
    } else {
      getPrisma().class.create({
        data: { title },
      });
      return title;
    }
  });

  const newClasses = dataTitles
    .filter(
      (title: string) => !existingTitlesLowercase.includes(title.toLowerCase())
    )
    .map((title: string) => ({ title }));

  const createdClasses = await Promise.all(
    newClasses.map((classes: any) =>
      getPrisma().class.create({
        data: classes,
      })
    )
  );

  return Response.json({
    createdClasses,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, editableTitle } = data;

    await getPrisma().class.update({
      where: { id: String(id) },
      data: {
        title: editableTitle,
      },
    });

    return Response.json({
      status: 200,
      success: "Class Updated Successfully!",
    });
  } catch (error) {
    console.error("Error updating class:", error);
    return Response.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const { id } = data;

    await getPrisma().class.delete({
      where: { id: String(id) },
    });

    return Response.json({
      status: 200,
      success: "Class Deleted Successfully!",
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    return Response.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
