import { cn } from "@/utils";

export default function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-4", className)}
      {...props}
    />
  )
}