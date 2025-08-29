import { cn } from "@/libs/utils";

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