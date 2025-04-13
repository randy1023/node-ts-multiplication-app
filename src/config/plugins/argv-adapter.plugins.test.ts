//import { yarg } from "./argv-adapter.plugin";
const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("./argv-adapter.plugin");
  return yarg;
};

describe("tests on argv-adapter.plugin", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });
  test("should return default value", async () => {
    const yarg = await runCommand(["-b", "5"]);
    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "Multiplication-table",
        d: "outputs",
      })
    );
  });

  test("should return configuration with custom value", async () => {
    const customValue = [
      "-b",
      "10",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-table",
      "-d",
      "customOutputs",
    ];
    const yarg = await runCommand([
      "-b",
      "10",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-table",
      "-d",
      "customOutputs",
    ]);
    console.log(yarg);
    expect(yarg).toEqual(
      expect.objectContaining({
        b: 10,
        l: 20, 
        s: true,    
        n: "custom-table",  
        d: "customOutputs",
     
      })
    );
  });
});
