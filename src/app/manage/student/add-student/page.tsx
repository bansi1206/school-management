import { AddStudent } from "@/containers";
import axios from "axios";

export default async function ScreenAddClass() {
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

  return (
    <div>
      <AddStudent user={usersData} classes={classesData} />
    </div>
  );
}
