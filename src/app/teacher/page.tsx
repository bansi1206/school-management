import { Teacher } from "@/containers";
import axios from "axios";

export default async function ScreenTeacher() {
  const getTeachers = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/teacher`;
      const classes = await axios.get(apiUrl);
      return classes.data;
    } catch (error) {
      return [];
    }
  };

  const teachersData = await getTeachers();
  return (
    <div>
      <Teacher teachers={teachersData} />
    </div>
  );
}
