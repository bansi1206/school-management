import { EditStudent } from "@/containers";
import axios from "axios";

export default async function ScreenEditStudent() {
  const getStudents = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/student`;
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
  const getClasses = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/class`;
      const classes = await axios.get(apiUrl);
      return classes.data;
    } catch (error) {
      return [];
    }
  };

  const usersData = await getUsers();
  const classesData = await getClasses();
  const studentsData = await getStudents();

  return (
    <div>
      <EditStudent
        students={studentsData}
        user={usersData}
        classes={classesData}
      />
    </div>
  );
}
