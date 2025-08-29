import { cn } from "@/libs/utils";

export default function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white text-black shadow-sm",
        className
      )}
      {...props}
    />
  )
}