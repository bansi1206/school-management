import { getPrisma } from "@/config";
import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().teacher.findMany({
    include: {
      user: true,
    },
  });

  return Response.json(res);
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { userId, ...teacherData } = data;

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

  const newTeacher = await getPrisma().teacher.create({
    data: {
      ...teacherData,
      user: { connect: { id: userId } },
    },
  });

  await getPrisma().user.update({
    where: { id: userId },
    data: {
      role: "Teacher",
    },
  });

  return Response.json({
    status: 200,
    data: newTeacher,
    msg: "Success",
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const {
    id,
    editableUser,
    editableName,
    editablePhone,
    editableGender,
    editableDob,
    editableDepartment,
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
    await getPrisma().teacher.update({
      where: { id: String(id) },
      data: {
        name: editableName,
        dob: editableDob,
        gender: editableGender,
        phone: editablePhone,
        department: editableDepartment,
        user: { connect: { id: editableUser } },
      },
    });

    await getPrisma().user.update({
      where: { id: editableUser },
      data: {
        role: "Teacher",
      },
    });

    return Response.json({
      status: 200,
    });
  } catch (error) {
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

    await getPrisma().teacher.delete({
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
      success: "Teacher Deleted Successfully!",
    });
  } catch (error) {
    return Response.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
