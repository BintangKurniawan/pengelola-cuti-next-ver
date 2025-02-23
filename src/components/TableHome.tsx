/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NoteButton from "./NoteBtn";
export const TableHome = ({ data, columns }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-UK", options);
  };
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);
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

  console.log(data);
  console.log(columns);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg my-table table-rounded q-table text-xs">
        <thead className="border-b-2">
          <tr className="capitalize text-sm leading-normal">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-6 text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-3 px-6 text-center">
                    {col.dataKey === "status" ? (
                      <div className={`px-3 py-2 rounded-xl ${getStatusClass(row[col.dataKey])}`}>
                        <span className="font-semibold">{row[col.dataKey]}</span>
                      </div>
                    ) : col.format === "date" ? (
                      <span className="font-semibold">{formatDate(row[col.dataKey])}</span>
                    ) : col.label === "Leave Use" || col.label === "Amount" ? (
                      <span>{row[col.dataKey]} day(s)</span>
                    ) : col.dataKey === "note" ? (
                      row.status === "REJECT" && row.note ? (
                        <NoteButton note={row.note} approved={row.rejectBy} />
                      ) : row.status === "APPROVE" ? (
                        <NoteButton approved={row.approveBy} />
                      ) : (
                        <p>Note not found</p>
                      )
                    ) : (
                      <span>{getNestedValue(row, col.dataKey) || "-"}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
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
