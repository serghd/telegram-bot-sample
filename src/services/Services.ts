import { config } from "config";
import { Initialize } from "../common/types";
import { DataStorage } from "../db/DataStorage";
import TelegramBot from "node-telegram-bot-api";

export class Services implements Initialize {
   public dataStorage!: DataStorage;
   public telegramBot!: TelegramBot;

   constructor() {
      this.dataStorage = new DataStorage();
      this.telegramBot = new TelegramBot(config.telegramBotToken, { polling: true });
   }

   async init() {
      await this.dataStorage.init();
   }
}
