import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  subtitle?: string;
}

export function SectionHeading({ children, subtitle, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {subtitle && (
        <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
          {subtitle}
        </span>
      )}
      <h2 
        className="text-3xl md:text-5xl font-heading font-bold tracking-tight"
        {...props}
      >
        {children}
      </h2>
    </div>
  );
}
