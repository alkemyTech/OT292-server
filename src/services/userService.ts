import bcrypt from 'bcryptjs';
import db from '../models';
import { User } from '../models/user';

export function filterPassword(user: User) {
  const dataResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photo: user.photo,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return dataResponse;
}

export function buildUser(user: User) {
  const newUser = User.build({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photo: user.photo,
    roleId: user.roleId,
    password: user.password,
  });

  return newUser;
}

export function passwordHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export async function userByEmail(email: string) {
  return db.User.findOne({ where: { email } });
}
