import { Monster } from "@/components/monster";
import { Navigation } from "@/components/navigation";
import { FetchClient } from "@/lib/http";
import { ConsoleLogger } from "@/lib/logger";
import { PokemonService, MockPokemonService } from "@/lib/monster";
import { notFound } from "next/navigation";
import { container } from "tsyringe";

container.register("Logger", { useClass: ConsoleLogger });
container.register("HTTPClient", { useClass: FetchClient });

const pokemonService = process.env.DEBUG ? MockPokemonService : PokemonService;
const monsterService = container.resolve(pokemonService);

function getMonster() {
  return monsterService.get(25);
}

export default async function Home() {
  const monster = await getMonster();

  if (!monster) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Monster monster={monster} />
      <Navigation prev="/pokemon/24" next="/pokemon/26" />
    </main>
  );
}
