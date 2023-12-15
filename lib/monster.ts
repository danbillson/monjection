import { injectable, inject } from "tsyringe";
import type { HTTPClient } from "./http";

export type Monster = {
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

const mockPokemon = [
  { id: 1, name: "Bulbasaur" },
  { id: 4, name: "Charmander" },
  { id: 7, name: "Squirtle" },
];

export class MockPokemonService implements MonsterService {
  async get(id: number): Promise<Monster | null> {
    if (isNaN(id) || id < 1 || id > 1023) {
      return null;
    }

    const pokemon = mockPokemon[id % mockPokemon.length];
    return id === 25
      ? {
          id,
          name: "Pikachu",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        }
      : {
          id,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        };
  }
}

type Digimon = {
  id: number;
  name: string;
  images: { href: string }[];
};

@injectable()
export class DigimonService implements MonsterService {
  constructor(@inject("HTTPClient") private httpClient: HTTPClient) {}

  async get(id: number): Promise<Monster | null> {
    if (isNaN(id) || id < 1 || id > 1000) {
      return null;
    }

    const digimon = await this.httpClient.get<Digimon>(
      `https://digi-api.com/api/v1/digimon/${id}`
    );

    if (!digimon) {
      return null;
    }

    return {
      id: digimon.id,
      name: digimon.name,
      sprite: digimon.images[0].href,
    };
  }
}
