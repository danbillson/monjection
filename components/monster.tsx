import type { Monster } from "@/lib/monster";
import Image from "next/image";

export function Monster({ monster }: { monster: Monster }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-center">{monster.name}</h1>
      <Image width={96} height={96} src={monster.sprite} alt={monster.name} />
    </div>
  );
}
