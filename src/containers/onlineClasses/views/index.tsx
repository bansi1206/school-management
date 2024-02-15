"use client";

type Props = {};

export const Calendar: React.FC<Props> = () => {
  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Calendar</h1>
        </div>
      </div>
      <div className="container mt-[53px] flex justify-center">
        <div>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=186c07836c284a27bcc99199d60e9699bb6c0c78effd8ea6445ad86aad78066a%40group.calendar.google.com&ctz=Asia%2FHo_Chi_Minh"
            className="border-none w-[800px] h-[600px] "
          ></iframe>
        </div>
      </div>
    </div>
  );
};
