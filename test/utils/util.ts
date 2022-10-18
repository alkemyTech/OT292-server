import bcrypt from 'bcryptjs';
import db from '../../src/models';
import { User } from '../../src/models/user';
import { Role } from '../../src/models/role';
import { generateToken } from '../../src/utils/jwt.handle';

export const baseUser = {
  firstname: 'test',
  lastname: 'testTest',
  email: 'test@test.com',
  photo: 'www.img.com',
  password: 'secretTest',
};

export const baseMember = {
  name: 'Federico',
  facebookUrl: 'https://www.facebook.com/route',
  instagramUrl: 'https://www.instagram.com/route',
  linkedinUrl: 'https://www.linkedin.com/route',
  image: 'https://www.imageBank.com/img',
  description: 'some description',
};

const getRole = async (roleName:string) : Promise<Role> => {
  let role : Role | null = await db.Role.findOne({ where: { name: roleName } });
  if (!role) {
    role = await db.Role.create({
      name: roleName,
    });
  }
  return role;
};

const createUser = async (user:any, roleId: number) : Promise<User> => {
  const passwordHash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  const userSaved = await db.User.create({
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    photo: user.photo,
    roleId,
    password: passwordHash,
  });
  return userSaved;
};

/**
 * Async function ,create a new user associated with
 * the provided roleString and return his hashed password.
 * @params string
 * @returns string bearer token
 */
const getToken = async (roleString:string) : Promise<string> => {
  const role = await getRole(roleString);
  const user = await createUser({ ...baseUser, roleId: role.id, email: `${roleString}@test.com` }, role.id);

  return `Bearer ${generateToken(user.id, user.roleId)}`;
};

const fillMember = async (n: number) => {
  const members = (new Array(n)).fill(baseMember);
  const membersSaved = await db.Member.bulkCreate(members);
  return membersSaved;
};

const saveMember = async () => {
  const member = await db.Member.create(baseMember);
  return member;
};

export default {
  getToken,
  fillMember,
  saveMember,
};
