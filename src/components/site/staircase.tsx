import { cn } from "@/lib/utils";

/**
 * A escada laranja, assinatura visual da marca (seta do logo).
 * `d` é o caminho SVG; o traço se desenha uma vez ao carregar (anim-draw).
 */
export function Staircase({
  d,
  width,
  height,
  className,
  strokeWidth = 3,
  delay = 0,
  animar = true,
}: {
  d: string;
  width: number;
  height: number;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  animar?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      className={cn("pointer-events-none overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke="#EF6C22"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
        className={animar ? "anim-draw" : undefined}
        style={animar ? ({ "--len": 1, animationDelay: `${delay}ms` } as React.CSSProperties) : undefined}
      />
    </svg>
  );
}
