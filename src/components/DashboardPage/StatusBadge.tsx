export const StatusBadge = ({ status }) => {
  const styles = {
    Reported: "bg-blue-50 text-blue-600 border-blue-200",
    Inprogress: "bg-orange-50 text-orange-600 border-orange-200",
    Resolved: "bg-green-50 text-green-600 border-green-200",
  };

  const label = status === "Inprogress" ? "In Progress" : status;

  return (
    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {label}
    </span>
  );
};