import { Calendar } from "@/containers";
import axios from "axios";
import { env } from "@/config";

export default async function ScreenCalendar() {
  const getCalendar = async () => {
    try {
      const calendarId = `${env.CALENDAR_ID}`;
      const apiKey = `${env.GOOGLE_API_KEY}`;

      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

      const response = await axios.get(url);
      const events = response.data.items;

      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  };
  const calendarData = await getCalendar();

  return (
    <div>
      <Calendar />
    </div>
  );
}
