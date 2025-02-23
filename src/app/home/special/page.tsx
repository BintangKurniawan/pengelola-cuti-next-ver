"use client";
import { getTableHomeSpecial } from "@/services/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { TableHome } from "@/components/TableHome";

const columns = [
  { label: "Status", dataKey: "status" },
  { label: "Leave Title", dataKey: "leaveTitle" },
  { label: "Start", dataKey: "startLeave", format: "date" },
  { label: "End", dataKey: "endLeave", format: "date" },
  { label: "Gender", dataKey: "gender" },
  { label: "Amount", dataKey: "amount" },
  { label: "Reject Note", dataKey: "note" },
];

export default function Special() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get("page")) || 1;
  const perPage = parseInt(searchParams.get("perPage")) || 8;

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);

      try {
        const response = await getTableHomeSpecial(page, perPage);
        if (isMounted) {
          setData(response.data.employee.specialLeave || []);
          setTotalCount(response.meta.lastPage || 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [page, perPage]);

  return (
    <div className="flex flex-col overflow-x-auto w-full hide-scroll">
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      ) : (
        <>
          <TableHome data={data} columns={columns} />
          <PaginationWithLinks page={page} pageSize={perPage} totalCount={totalCount} />
        </>
      )}
    </div>
  );
}
