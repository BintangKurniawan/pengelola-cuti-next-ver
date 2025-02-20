/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import NoteButton from "./NoteBtn";
const TableHome = ({ data }) => {
  const formatDate = (dateString: any) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-UK", options);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "APPROVE":
        return "bg-green-100 text-green-700";
      case "REJECT":
        return "bg-red-100 text-red-700";
      case "WAITING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg my-table table-rounded q-table text-xs">
        <thead className="border-b-2">
          <tr className=" capitalize text-sm leading-normal">
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Type</th>
            <th className="py-3 px-6 text-center">Start</th>
            <th className="py-3 px-6 text-center">End</th>
            <th className="py-3 px-6 text-center">Leave Use</th>
            <th className="py-3 px-6 text-center">Reason</th>
            <th className="py-3 px-6 text-center">Note</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data && data.length > 0 ? (
            data.map((row: any, index) => (
              <tr key={index} className="border-b border-gray-200">
                {/* Status */}
                <td className="py-3 px-6 text-center">
                  <div className={`px-3 py-2 rounded-xl ${getStatusClass(row.status)}`}>
                    <span className="font-semibold">{row.status}</span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 px-6 text-center">
                  <span className="font-semibold">{row.typeOfLeave.name}</span>
                </td>

                {/* Start Date */}
                <td className="py-3 px-6 text-center">
                  <span className="font-semibold">{formatDate(row.startLeave)}</span>
                </td>

                {/* End Date */}
                <td className="py-3 px-6 text-center">
                  <span className="font-semibold">{formatDate(row.endLeave)}</span>
                </td>

                {/* Leave Use */}
                <td className="py-3 px-6 text-center">
                  <span>{row.leaveUse} day(s)</span>
                </td>

                <td className="py-3 px-6 text-center">
                  <span>{row.reason}</span>
                </td>

                {/* Note */}
                <td className="py-3 px-6 text-center">
                  {row.status === "REJECT" && row.note ? <NoteButton note={row.note} approved={row.rejectBy} /> : row.status === "APPROVE" ? <NoteButton approved={row.approveBy} /> : <p>Note not found</p>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>
        {`
          .my-table {
            border-radius: 0.375rem;
          }
          .q-table tbody tr:nth-child(even) {
            background-color: #f7f6fe; /* Warna abu-abu untuk baris genap */
          }

          .q-table tbody tr:nth-child(odd) {
            background-color: #ffffff; /* Warna putih untuk baris ganjil */
          }

          .q-table thead th {
            font-weight: bold;
          }

          .table-rounded thead tr:first-child th:first-child {
            border-radius: 10px 0 0 10px;
          }

          .table-rounded thead tr:first-child th:last-child {
            border-radius: 0 10px 10px 0;
          }

          .table-rounded tbody tr {
            border-spacing: 0.25rem 0.25rem;
            row-gap: 1px;
            margin: 10px 0 !important;
          }

          .q-table tbody tr:margin {
            margin: 10px 0 !important;
          }
          .hide-scroll::-webkit-scrollbar-track {
            box-shadow: none !important;
          }

          th {
            padding: 12px 16px;
          }
        `}
      </style>
    </div>
  );
};

export default TableHome;
