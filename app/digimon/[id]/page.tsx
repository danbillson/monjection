import { Monster } from "@/components/monster";
import { Navigation } from "@/components/navigation";
import { AxiosClient } from "@/lib/http";
import { ConsoleLogger } from "@/lib/logger";
import { DigimonService } from "@/lib/monster";
import { notFound } from "next/navigation";
import { container } from "tsyringe";

container.register("Logger", { useClass: ConsoleLogger });
container.register("HTTPClient", { useClass: AxiosClient });

const monsterService = container.resolve(DigimonService);

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
      <Navigation prev={`/digimon/${id - 1}`} next={`/digimon/${id + 1}`} />
    </main>
  );
}
