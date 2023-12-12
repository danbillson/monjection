This is an app to play around with dependency injection with NextJS, the primary focus will be on using [tsyringe](https://github.com/microsoft/tsyringe) to interact with [PokeAPI](https://pokeapi.co/) and [DAPI](https://digimon-api.com/) but may expand further to use more services or different DI libraries/frameworks. 🏗️

## What is dependency injection? 🤔

Dependency injection is a design pattern that allows for the inversion of control of dependencies. This means that instead of a class creating its own dependencies or a function containing dependencies, they are passed in from the outside.

This is useful for testing as it allows for the mocking of dependencies, but also allows for the reuse of dependencies across multiple classes or functions.

## Why use dependency injection? 🤷‍♂️

Dependency injection is a great way to decouple your code, it allows for the reuse of dependencies and makes testing easier. It also allows for the swapping of dependencies without having to change the code that uses them.

This allows you to keep your project code exactly how you want it rather than coupling pages or components to a specific dependency.

## What is in the project? 📦

The core of this project is around the `MonsterService`, which provides an interface for fetching monsters (pokemon or digimon). 👽

```typescript
export type Monster = {
  id: number;
  name: string;
  sprite: string;
};

export interface MonsterService {
  get(id: number): Promise<Monster | null>;
}
```

We then have the `PokemonService` and `DigimonService` which implement this interface and fetch the data from their respective APIs. This means that they both contain a `get` method that will return the same shape of data.

The alternate to this would likely be two separate fetch functions that still adhere to the return shape. If we wanted to keep the data fetching and logging decoupled we would need to pass them in as args to the function that follow a specific interface.

In our pages and components, we can use fairly generic functions that give us data in the shape we know at want.
In both `/pokemon/:id` and `/digimon/:id` we have:

```typescript
function getMonster(id: number) {
  return monsterService.get(id);
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const monster = await getMonster(id);

  return <Monster monster={monster} />;
}
```

but the difference comes from the dependencies that we inject 😂

In `/pokemon/:id` we use the `PokemonService` and `FetchClient`

```typescript
container.register("Logger", { useClass: ConsoleLogger });
container.register("HTTPClient", { useClass: FetchClient });

const monsterService = container.resolve(PokemonService);
```

and in `/digimon/:id` we use the `DigimonService` and `AxiosClient`

```typescript
container.register("Logger", { useClass: ConsoleLogger });
container.register("HTTPClient", { useClass: AxiosClient });

const monsterService = container.resolve(DigimonService);
```
