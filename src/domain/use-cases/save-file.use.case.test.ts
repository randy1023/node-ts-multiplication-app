import fs from "fs";
import { SaveFile } from "./save-file.use.case";

describe("Test on save-file.use.case", () => {
  const options = {
    fileContent: "custon content new",
    fileDestination: "custom-outputs/new-capa-outputs",
    fileName: "custom-table-name-2",
  };
  afterAll(() => {
    //clean Up
    fs.rmSync("outputs", { recursive: true });
  });
  test("should save file with default values", () => {
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
      fileDestination: "outputs",
      fileName: "table",
    };
    const saveFile = new SaveFile();
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });
  test("should save file with custom values", () => {
    const { fileContent, fileDestination, fileName } = options;
    const filePath = `${fileDestination}/${fileName}.txt`;
    const saveFile = new SaveFile();
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContentTest = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContentTest).toBe(fileContent);
  });

  test("should return false if  directory dosnt be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("this is a custom error message from testing");
    });
    const result = saveFile.execute(options);
   

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });
  test("should return false if  file dosnt be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("this is a custom error message from testing");
    });
    const result = saveFile.execute(options);
   

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
