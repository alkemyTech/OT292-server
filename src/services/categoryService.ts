import db from '../models';

export async function getCategory(id: number) {
  return db.Category.findByPk(id);
}
