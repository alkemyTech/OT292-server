import { sign, verify } from 'jsonwebtoken';

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretKEYOT292-33';

const generateToken = (id: number, role:number): string => sign({ id, role }, JWT_SECRET, {
  expiresIn: '1h',
});

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };
