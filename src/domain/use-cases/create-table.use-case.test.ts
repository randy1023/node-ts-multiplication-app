import { CreateTable } from "./create-table.use-case";
describe("Test on create-table.use-case", () => {
  test("should create table with default values", () => {
    const base = 2;
    const limit = 10;
    const createTable = new CreateTable();
    const table = createTable.execute({ base, limit });
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain(`2 x 1 = 2`);
    expect(table).toContain(`2 x 10 = 20`);
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = {
      base: 10,
      limit: 1,
    };
    const { base: b, limit: l } = options;
    const createTable = new CreateTable();
    const table = createTable.execute(options);
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain(`${b} x 1 = ${b}`);
    expect(table).toContain(`${b} x ${l} = ${b * l}`);
    expect(rows).toBe(l);
  });
});
