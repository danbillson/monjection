import { injectable, inject } from "tsyringe";
import type { HTTPClient } from "./http";

type Monster = {
  id: number;
  name: string;
  sprite: string;
};

export interface MonsterService {
  get(id: number): Promise<Monster | null>;
}

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

@injectable()
export class PokemonService implements MonsterService {
  constructor(@inject("HTTPClient") private httpClient: HTTPClient) {}

  async get(id: number): Promise<Monster | null> {
    if (isNaN(id) || id < 1 || id > 1023) {
      return null;
    }

    const pokemon = await this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    if (!pokemon) {
      return null;
    }

    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
    };
  }
}
