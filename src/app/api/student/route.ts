import { getPrisma } from "@/config";
import { EditClass } from "@/containers";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().student.findMany({
    include: {
      user: true,
      class: true,
    },
  });

  return Response.json(res);
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { userId, classId, ...studentData } = data;

  const existingStudent = await getPrisma().student.findFirst({
    where: { userId: String(userId) },
  });

  const existingTeacher = await getPrisma().teacher.findFirst({
    where: { userId: String(userId) },
  });
  if (existingStudent !== null || existingTeacher !== null) {
    return Response.json({
      status: 401,
      msg: "Email already existed!",
    });
  }

  const newStudent = await getPrisma().student.create({
    data: {
      ...studentData,
      user: { connect: { id: userId } },
      class: { connect: { id: classId } },
    },
  });

  await getPrisma().user.update({
    where: { id: userId },
    data: {
      role: "Student",
    },
  });

  return Response.json({
    status: 200,
    data: newStudent,
    msg: "Success",
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const {
    id,
    editableUser,
    editableClass,
    editableName,
    editablePhone,
    editableGender,
    editableDob,
  } = data;

  const existingStudentWithEmail = await getPrisma().student.findFirst({
    where: {
      userId: editableUser,
      id: { not: String(id) },
    },
  });

  const existingTeacherWithEmail = await getPrisma().teacher.findFirst({
    where: {
      userId: editableUser,
      id: { not: String(id) },
    },
  });

  if (existingStudentWithEmail || existingTeacherWithEmail) {
    return Response.json({
      status: 401,
      msg: "Email already existed!",
    });
  }
  try {
    await getPrisma().student.update({
      where: { id: String(id) },
      data: {
        name: editableName,
        dob: editableDob,
        gender: editableGender,
        phone: editablePhone,
        user: { connect: { id: editableUser } },
        class: { connect: { id: editableClass } },
      },
    });

    await getPrisma().user.update({
      where: { id: editableUser },
      data: {
        role: "Student",
      },
    });

    return Response.json({
      status: 200,
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
    const { id, userId } = data;

    await getPrisma().student.delete({
      where: { id: String(id) },
    });

    await getPrisma().user.update({
      where: { id: userId },
      data: {
        role: "User",
      },
    });

    return Response.json({
      status: 200,
      success: "Student Deleted Successfully!",
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    return Response.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
