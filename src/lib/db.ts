import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

(async () => {
	let admin = await prisma.user.findFirst({ where: { name: 'admin' } });
	if (!admin) {
		const passwordHash = await hash('admin', 10);
		admin = await prisma.user.create({
			data: { name: 'admin', created_at: new Date(), hash: passwordHash, role: 'ADMIN' }
		});
	}
})();

export default prisma;
