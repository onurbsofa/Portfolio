import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  background?: string;
}

/** Botón con un destello que recorre el borde (Shimmer Button de Magic UI), como enlace. */
export function ShimmerButton({
  shimmerColor = "#3df2e0",
  shimmerSize = "0.08em",
  shimmerDuration = "3s",
  background = "rgba(5, 6, 10, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <a
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--cut": shimmerSize,
          "--speed": shimmerDuration,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/10 px-7 py-3.5 text-white [background:var(--bg)]",
        "transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1]">
          <div className="absolute -inset-full w-auto animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:inherit] [inset:var(--cut)]" />
    </a>
  );
}
