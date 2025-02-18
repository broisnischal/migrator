import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { createZodDto, } from 'nestjs-zod';
import z from "zod";

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  username: text(),
  age: integer().notNull()
});

const userCreateSchema = createInsertSchema(users);
const userUpdateSchema = createUpdateSchema(users);

export type TUserSelectSchema = z.infer<typeof userCreateSchema>;

export class UserSelectSchema extends createZodDto(userCreateSchema.extend(
    {
        name: z.string().min(1).optional(),
        createdAt: z.date(),
        updatedAt: z.date()
    }
).omit({
    // id: true,
})) {}


export class UserDto extends UserSelectSchema {
    @IsString()    
    name?: string;

    @IsNotEmpty()
    username?: string; 
   
}
