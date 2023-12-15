import { Monster } from "@/components/monster";
import { Navigation } from "@/components/navigation";
import { FetchClient } from "@/lib/http";
import { ConsoleLogger } from "@/lib/logger";
import { MockPokemonService, PokemonService } from "@/lib/monster";
import { notFound } from "next/navigation";
import { container } from "tsyringe";

container.register("Logger", { useClass: ConsoleLogger });
container.register("HTTPClient", { useClass: FetchClient });

const pokemonService =
  process.env.DEBUG || process.env.NODE_ENV === "test"
    ? MockPokemonService
    : PokemonService;
const monsterService = container.resolve(pokemonService);

function getMonster(id: number) {
  return monsterService.get(id);
}

export default async function Home({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const monster = await getMonster(id);

  if (!monster) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Monster monster={monster} />
      <Navigation prev={`/pokemon/${id - 1}`} next={`/pokemon/${id + 1}`} />
    </main>
  );
}
