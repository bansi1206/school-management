import { StudentByClass } from "@/containers";
import axios from "axios";

const getStudentsByClass = async (slug: string) => {
  try {
    const students = await axios.get(
      `http://localhost:3000/api/student/${slug}`
    );
    return students.data;
  } catch (error) {
    return {};
  }
};

export default async function ScreenStudentsByClass({
  params,
}: {
  params: { slug: string };
}) {
  const students = await getStudentsByClass(params.slug);

  return <StudentByClass students={students} />;
}
