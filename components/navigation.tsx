import { Button } from "@/components/ui/button";
import Link from "next/link";

type NavigationProps = {
  prev: string;
  next: string;
};

export function Navigation({ prev, next }: NavigationProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <Button variant="secondary" asChild>
        <Link href={prev}>Prev</Link>
      </Button>
      <Button asChild>
        <Link href={next}>Next</Link>
      </Button>
    </div>
  );
}
