import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { hash } from 'bcrypt';
import { ADMIN_PASS } from '$lib/config';

const prisma = new PrismaClient();

(async () => {
	console.log('Create User', ADMIN_PASS);

	let admin = await prisma.user.findFirst({ where: { name: 'admin' } });

	console.log(admin);

	if (!admin && ADMIN_PASS) {
		const passwordHash = await hash(ADMIN_PASS, 10);
		console.log('CREATE');
		admin = await prisma.user.create({
			data: { name: 'admin', created_at: new Date(), hash: passwordHash, role: 'ADMIN' }
		});
	}
})();

export default prisma;
