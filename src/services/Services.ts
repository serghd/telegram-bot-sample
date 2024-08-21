import { Initialize } from "../common/types";
import { DataStorage } from "../db/DataStorage";

export class Services implements Initialize {
   public dataStorage!: DataStorage;

   constructor() {
      this.dataStorage = new DataStorage();
   }

   async init() {
      await this.dataStorage.init();
   }
}
