import { EditClass } from "@/containers";
import axios from "axios";

export default async function ScreenEditClass() {
  const getClasses = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/class`;
      const classes = await axios.get(apiUrl);
      return classes.data;
    } catch (error) {
      return [];
    }
  };
  const classesData = await getClasses();
  return (
    <div>
      <EditClass classes={classesData} />
    </div>
  );
}
