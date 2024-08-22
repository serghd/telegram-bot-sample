import { FastifyInstance } from "fastify";
import { Services } from "services/Services";

export function startBot(services: Services) {
   const bot = services.telegramBot;

   bot.setMyCommands([
      { command: "/start", description: "Initial greeting" },
      { command: "/user_info", description: "Get information about user" },
   ]);

   const startTradingOptions = {
      reply_markup: {
         inline_keyboard: [
            [{ text: "Start Trading Mode 1", callback_data: "1" }],
            [{ text: "Start Trading Mode 2", callback_data: "2" }],
            [{ text: "Start Trading Mode 3", callback_data: "3" }],
         ],
      },
   };

   const stopAllTradingsOptions = {
      reply_markup: {
         inline_keyboard: [
            [{ text: "Stop all Tradings", callback_data: "stop" }],
         ],
      },
   };

   // chat id: modes
   let tradingModes = new Map<number, Set<number>>();

   bot.on("message", async (msg) => {
      const text = msg.text;
      const chatId = msg.chat.id;

      if (text === "/start") {
         await bot.sendSticker(chatId, "https://sl.combot.org/tradingcos/webp/20xf09f93b2.webp");
         return bot.sendMessage(
            chatId,
            "Welcome to Trading Bot! Choose trading mode below: ",
            startTradingOptions,
         );
      }
      if (text === "/user_info") {
         let userInfo = "";
         if (msg.from !== undefined) {
            if (msg.from.first_name !== undefined || msg.from.last_name !== undefined) {
               if (msg.from.first_name !== undefined) {
                  userInfo = `Your first name is ${msg.from.first_name}`;
                  if (msg.from.last_name !== undefined) {
                     userInfo += ` and last name is ${msg.from.last_name}`;
                  }
               } else {
                  userInfo = `Your last name is ${msg.from.last_name}`;
               }
            }
         }
         return bot.sendMessage(chatId, userInfo);
      }

      return bot.sendMessage(chatId, "Unknown command");
   });

   bot.on("callback_query", async (msg) => {
      if (msg.message) {
         const data = msg.data;
         let chatId = msg.message.chat.id;

         if (data === "stop") {
            if (tradingModes.has(chatId)) {
               tradingModes.delete(chatId);
            }
            return bot.sendMessage(chatId, "All Tradings stopped.");
         }

         let option = 0;
         if (data === "1") {
            option = 1;
         } else if (data === "2") {
            option = 2;
         } else if (data === "3") {
            option = 3;
         }

         if (!tradingModes.has(chatId)) {
            tradingModes.set(chatId, new Set([option]));
         } else {
            if (tradingModes.get(chatId)?.has(option)) {
               return bot.sendMessage(chatId, `Trading Mode ${option} has been already started!`, stopAllTradingsOptions);
            } else {
               tradingModes.get(chatId)?.add(option);
            }
         }

         if (option === 1) {
            return bot.sendMessage(chatId, "Trading Mode 1 started.", stopAllTradingsOptions);
         } else if (option === 2) {
            return bot.sendMessage(chatId, "Trading Mode 2 started.", stopAllTradingsOptions);
         } else if (option === 3) {
            return bot.sendMessage(chatId, "Trading Mode 3 started.", stopAllTradingsOptions);
         }

         return bot.sendMessage(chatId, "Unknown callback_query");
      }
      return "";
   });
}
