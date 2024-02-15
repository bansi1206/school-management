import { AddTeacher } from "@/containers";
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

  const usersData = await getUsers();

  return (
    <div>
      <AddTeacher user={usersData} />
    </div>
  );
}
