export const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric" as const,
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
