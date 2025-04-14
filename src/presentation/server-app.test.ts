import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use.case";
import { ServerApp } from "./server-app";
describe("test on server app", () => {
  beforeEach(()=>{
    jest.clearAllMocks();
  })
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-fileName",
  };
  const { base, limit, fileDestination, fileName } = options;
  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });
  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Server running....");
    expect(logSpy).toHaveBeenLastCalledWith("File Created!");
    expect(createTableSpy).toHaveBeenCalledWith({ base, limit });
    expect(saveFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        fileDestination,
        fileName,
      })
    );
  });

  test("should run with custom values mocked", () => {
    const createMock = jest.fn().mockReturnValue("1 x 1 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    global.console.error = logErrorMock;
    global.console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;
    ServerApp.run(options);
    expect(logMock).toHaveBeenCalledWith("Server running....");
    expect(createMock).toHaveBeenCalledWith({ base, limit });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination,
      fileName,
    });
    expect(logMock).toHaveBeenCalledWith("File Created!");
  });
});
