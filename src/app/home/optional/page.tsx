"use client";

import { AccordionRender } from "@/components/ui/accordion-render";
import { getOptionalLeave } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
export default function Mandatory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(null);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const perPage = parseInt(searchParams.get("perPage")) || 10;

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);

      try {
        const response = await getOptionalLeave(page);
        if (isMounted) {
          setData(response.data.employee.leaves || []);
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
  }, [page]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Show loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      ) : (
        <>
          <AccordionRender data={data} />
          <PaginationWithLinks page={page} pageSize={perPage} totalCount={totalCount} />
        </>
      )}
    </div>
  );
}
