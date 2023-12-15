import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renders the name of the pokemon", async () => {
    render(await Page({ params: { id: "25" } }));

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Pikachu");
  });

  it("shows navigation to the previous and next pokemon", async () => {
    render(await Page({ params: { id: "25" } }));

    const previous = screen.getByText("Prev");
    const next = screen.getByText("Next");

    expect(previous).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(previous).toHaveAttribute("href", "/pokemon/24");
    expect(next).toHaveAttribute("href", "/pokemon/26");
  });
});
