import { FetchClient } from "@/lib/http";
import { PokemonService } from "@/lib/monster";
import Image from "next/image";
import { notFound } from "next/navigation";
import { container } from "tsyringe";

container.register("HTTPClient", { useClass: FetchClient });

const monsterService = container.resolve(PokemonService);

function getMonster() {
  return monsterService.get(25);
}

export default async function Home() {
  const monster = await getMonster();

  if (!monster) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">{monster.name}</h1>
      <Image width={96} height={96} src={monster.sprite} alt={monster.name} />
    </main>
  );
}
