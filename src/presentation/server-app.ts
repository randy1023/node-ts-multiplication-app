import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use.case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log("Server running....");

    const table = new CreateTable().execute({ base, limit });

    const fileWasCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      fileDestination,
    });
    fileWasCreated
      ? console.log("File Created!")
      : console.error("File Not created");
    showTable && console.log(table);
  }
}
