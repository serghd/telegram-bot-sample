import { checkConfig, toBoolean } from "./common/tools";

const env = process.env;

const isDebug = toBoolean(env.DEBUG);

export const config = Object.freeze({
   debug: isDebug,
   port: Number(env.PORT) || 3001,
   telegramBotToken: String(env.TELEGRAM_BOT_TOKEN),
   database: {
      host: env.DATABASE_HOST,
      port: Number(env.DATABASE_PORT || 3306),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      name: env.DATABASE_NAME,
   },
});

checkConfig(config);

if (isDebug) {
   console.log(config);
}
