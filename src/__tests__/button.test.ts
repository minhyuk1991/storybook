import { render, screen, fireEvent } from "@testing-library/svelte";
import Button from "../lib/Button.svelte";
import { sum } from "../aa";
describe("Counter", () => {
  test("it has a button with the text 'Clicks: 0'", async () => {
    render(Button, { text: "aa" });

    const button = screen.getByText("aa");
    expect(button).toBeTruthy();
  });
});

describe("sum ", () => {
  it("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
