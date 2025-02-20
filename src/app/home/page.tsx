"use client";
import TableHome from "@/components/TableHome";
const sampleData = [
  {
    status: "APPROVE",
    typeOfLeave: { name: "Annual Leave" },
    startLeave: "2024-06-01",
    endLeave: "2024-06-05",
    leaveUse: 5,
    reason: "test",
    approveBy: "Manager John",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
  {
    status: "REJECT",
    typeOfLeave: { name: "Sick Leave" },
    startLeave: "2024-06-10",
    endLeave: "2024-06-12",
    leaveUse: 3,
    reason: "test",
    note: "Insufficient documentation",
    rejectBy: "HR Team",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-scroll w-full hide-scroll">
      <TableHome data={sampleData} />
    </div>
  );
}
