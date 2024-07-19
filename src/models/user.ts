import knex from "../utils/database";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  email: string;
  password: string;
  name: String;
}

export const createUser = async (user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const [id] = await knex("users").insert({
    ...user,
    password: hashedPassword,
  });
  
  const createdUser = await knex("users").where({ id }).first();
  const { password, ...userWithoutPassword } = createdUser;
  return userWithoutPassword;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return knex("users").where({ email }).first();
};