import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export function AccordionRender({ data }) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-UK", options);
  };
  return (
    <div className="flex flex-row gap-4 w-full flex-wrap items-center">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <Accordion key={index} type="single" collapsible className="w-[49.2%] hover:bg-gray-100 hover:no-underline">
            <AccordionItem value={`item-${index}`} className="px-4">
              <AccordionTrigger className="font-bold">{item.reason}</AccordionTrigger>
              <AccordionContent>
                {formatDate(item.startLeave)} - {formatDate(item.endLeave)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
