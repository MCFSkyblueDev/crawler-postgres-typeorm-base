import { DataSource, DeepPartial, DeleteResult, Repository } from "typeorm";
import { CustomBaseEntity } from "../entities/base.entity";

export class BaseService<T extends CustomBaseEntity> {
   private readonly repository: Repository<T>;

   constructor(database: DataSource, entity: new () => T) {
      this.repository = database.getRepository(entity);
   }

   public async getAllEntities(): Promise<T[]> {
      try {
         return await this.repository.find();
      } catch (error) {
         throw error;
      }
   }

   public async createNewEntity(
      entity: DeepPartial<T>
   ): Promise<DeepPartial<T>> {
      try {
         await this.repository.save(entity);
         return entity;
      } catch (error) {
         throw error;
      }
   }

   public async getEntityById(id: number): Promise<DeepPartial<T>> {
      try {
         const entity = await this.repository.findOne({
            where: { id: id } as any,
         });
         if (entity) {
            return entity;
         }
         throw new Error(`Entity with ID ${id} not found`);
      } catch (error) {
         throw error;
      }
   }

   public async updateEntityById(
      id: number,
      newEntityInformation: DeepPartial<T>
   ): Promise<DeepPartial<T>> {
      try {
         const entity = await this.repository.findOne({
            where: { id: id } as any,
         });
         if (entity) {
            Object.assign(entity, newEntityInformation);
            await this.repository.save(entity);
            
            return entity;
         }
         throw new Error(`Entity with ID ${id} not found`);
      } catch (error) {
         throw error;
      }
   }

   public async saveEntity(entity: T) {
      try {
         return await this.repository.save(entity);
      } catch (error) {
         throw error;
      }
   }

   public async deleteEntityById(id: number): Promise<string> {
      try {
         const result: DeleteResult = await this.repository.delete(id);
         if (result.affected && result.affected > 0) {
            return `Entity with ID ${id} successfully deleted`;
         } else {
            throw new Error(`Entity with ID ${id} not found`);
         }
      } catch (error) {
         throw error;
      }
   }

   public async deleteAllData(): Promise<string> {
      try {
         const result: DeleteResult = await this.repository.delete({});
         if (result.affected && result.affected > 0) {
            return `All entities successfully deleted`;
         } else {
            throw new Error(`Can not delete all entities`);
         }
      } catch (error) {
         throw error;
      }
   }
}
