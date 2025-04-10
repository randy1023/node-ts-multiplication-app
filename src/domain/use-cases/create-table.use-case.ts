export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() /**
   * DI - Dependency Injection
   */ {}

  execute({ base, limit }: CreateTableOptions) {
    let outPutMessage = "";
    for (let index = 1; index <= limit; index++) {
      outPutMessage += `${base} x ${index} = ${base * index}\n`;
    }

    return outPutMessage;
  }
}
