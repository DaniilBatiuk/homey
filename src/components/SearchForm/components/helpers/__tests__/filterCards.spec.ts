import "@testing-library/jest-dom";

import { filterCards } from "../filterCards";

describe("filterCards tests", () => {
  const items = [
    "Ukraine Kyiv Shevchenko 50",
    "Russia Moskow Lenina 44",
    "America New York 55",
    "France Frica 52",
    "Africa Abudabi 50",
    "USA New York 63",
  ];

  test('test with arg: "USA", items', () => {
    expect(filterCards("USA", items)).toEqual(["USA New York 63"]);
  });
  test('test with arg: "USA", []', () => {
    expect(filterCards("USA", [])).toEqual([]);
  });

  test('test with arg: "", items', () => {
    expect(filterCards("", items)).toEqual(items);
  });
  test('test with arg: "New York", items', () => {
    expect(filterCards("New York", items)).toEqual(["America New York 55", "USA New York 63"]);
  });
});
