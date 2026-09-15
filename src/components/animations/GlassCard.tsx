import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "relative rounded-2xl border border-glass-border bg-glass p-6 md:p-8 backdrop-blur-md",
        "transition-all duration-300 hover:border-glass-border/80 hover:bg-glass/80",
        className
      )} 
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
