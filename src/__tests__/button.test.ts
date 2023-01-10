import { render, screen, fireEvent } from "@testing-library/svelte";
import { sum } from "../aa";
import Button from "../components/Button.svelte";
describe("Counter", () => {
  test("it has a button with the text 'Clicks: 0'", async () => {
    render(Button, { text: "aa", rounded: false });
    const button = screen.getByText("aa");
    expect(button).toBeTruthy();
  });
});

describe("sum ", () => {
  it("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
