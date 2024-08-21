import { DataSource, FindOptionsWhere, In, Repository } from "typeorm";
import { Network } from "./entities/Network";
import { createDatabase } from "typeorm-extension";
import { consoleLog } from "../common/tools";
import { Initialize } from "../common/types";
import { toBoolean } from "../common/tools";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { defaultDataSourceConfig } from "./dataSource";
import { getEnv } from "../common/tools";

export class DataStorage implements Initialize {
   private dataSourceOptions: MysqlConnectionOptions;
   private dataSource!: DataSource;
   private networkRepostory!: Repository<Network>;
   private isDestroyed: boolean;

   constructor() {
      this.dataSourceOptions = defaultDataSourceConfig;
      this.dataSource = new DataSource(this.dataSourceOptions);
      this.isDestroyed = false;
   }

   getDataSource() {
      return this.dataSource;
   }

   async initialize(): Promise<void> {
      await createDatabase({ options: this.dataSourceOptions, ifNotExist: true });

      if (this.isDestroyed) {
         this.dataSource = new DataSource(this.dataSourceOptions);
         this.isDestroyed = false;
      }

      await this.dataSource.initialize();

      this.networkRepostory = this.dataSource.getRepository(Network);

      consoleLog(`Database ${this.dataSourceOptions.database} was initialized`);

      await this.dataSource.transaction(async (entityManager) => {
         // const networkRepository = entityManager.getRepository(Network);
         // const count = await networkRepository.count();
         // if (count === 0) {
         //    for (const network of deployNetworks) {
         //       const dbNetwork = new Network();
         //       dbNetwork.name = network;
         //       await networkRepository.save(dbNetwork);
         //    }
         //    consoleLog(`Database was seeded`);
         // }
      });
   }

   async init(): Promise<void> {
      if (toBoolean(getEnv("CONNECT_TO_DB"))) {
         consoleLog(`Connecting to database...`);
         await this.initialize();
      }
   }

   async dropDatabase(): Promise<void> {
      await this.dataSource.dropDatabase();
      await this.dataSource.destroy();
      this.isDestroyed = true;
      consoleLog(`Database was dropped`);
   }
}
