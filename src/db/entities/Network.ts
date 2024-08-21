import {
   Entity,
   CreateDateColumn,
   UpdateDateColumn,
   PrimaryGeneratedColumn,
   OneToMany,
   Column,
   Index,
} from "typeorm";

@Entity({ name: "_network" })
export class Network {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   @Index()
   name!: string;

   @CreateDateColumn()
   createdAt!: Date;

   @UpdateDateColumn()
   updatedAt!: Date;
}