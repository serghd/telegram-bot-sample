import dayjs from "dayjs";

export function getEnv(key: string) {
   const envKey = process.env[key];
   if (!envKey) {
      throw new Error(`getEnv(): Please set your ${key} in a .env file`);
   }
   return envKey;
}

export function checkConfig(config: object) {
   const entries = Object.entries(config);
   for (const entry of entries) {
      const key = entry[0];
      const value = entry[1];
      if (value === undefined) {
         throw new Error(`checkConfig(): Please set your '${key}' in a env-file`);
      } else if (typeof value === "object") {
         checkConfig(value);
      }
   }
}

export function toBoolean(value: string | undefined) {
   return value?.toLowerCase() === "true";
}

export class ApiError extends Error {
   constructor(message: string, public statusCode: number) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
   }
}

export class NotFoundError extends ApiError {
   constructor(message = "Not found") {
      super(message, 404);
   }
}

export function checkIfNumber(
   value: string | undefined,
   errorMessage = `${value} is not a number`,
) {
   const numberValue = Number(value);
   if (!Number.isInteger(numberValue)) {
      // throw new HttpApplicationError(errorMessage, { statusCode: 404 });
      throw new ApiError(errorMessage, 404);
   }
   return numberValue;
}

export function consoleLog(...msg: any[]) {
   const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
   console.log(`[${date}]`, ...msg);
}

export async function sleep(ms: number): Promise<number> {
   return new Promise((resolve) => setTimeout(resolve as any, ms));
}

export function printError(error: any) {
   if ("message" in error) {
      return error.message;
   }

   return error;
}

export interface QueryParam {
   network: string;
}