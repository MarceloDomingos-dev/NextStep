"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";

/** Accordion em cards cinza arredondados. O ícone + vira − ao abrir. */
export function FaqList({
  itens,
  abertoInicial = 0,
  escuro = false,
}: {
  itens: { p: string; r: string }[];
  abertoInicial?: number | null;
  escuro?: boolean;
}) {
  return (
    <AccordionPrimitive.Root
      defaultValue={abertoInicial === null ? [] : [abertoInicial]}
      className="flex flex-col gap-3"
    >
      {itens.map((item, i) => (
        <AccordionPrimitive.Item
          key={item.p}
          value={i}
          className={cn(
            "rounded-[20px] transition-colors",
            escuro ? "border border-ink-line bg-ink-2 text-white" : "bg-mist",
          )}
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 rounded-[20px] px-6 py-5 text-left text-lg font-bold lg:px-7 lg:text-[1.1875rem]">
              {item.p}
              <span aria-hidden="true" className="relative size-5 shrink-0">
                <span className="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute top-0 left-1/2 h-5 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-step)] group-aria-expanded:scale-y-0" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-[var(--ease-step)] data-ending-style:h-0 data-starting-style:h-0">
            <p className={cn("px-6 pb-6 text-base lg:px-7", escuro ? "text-[#d4d4d4]" : "text-[#444]")}>{item.r}</p>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
