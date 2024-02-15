import { EditTeacher } from "@/containers";
import axios from "axios";

export default async function ScreenEditStudent() {
  const getTeachers = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/teacher`;
      const classes = await axios.get(apiUrl);
      return classes.data;
    } catch (error) {
      return [];
    }
  };
  const getUsers = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/user`;
      const users = await axios.get(apiUrl);
      return users.data;
    } catch (error) {
      return [];
    }
  };

  const usersData = await getUsers();

  const teachersData = await getTeachers();

  return (
    <div>
      <EditTeacher teachers={teachersData} user={usersData} />
    </div>
  );
}
