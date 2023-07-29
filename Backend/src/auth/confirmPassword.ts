import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

async function confirmPassword() {
  const username = 'Simon';
  const inputPassword = 'Kluka';

  const user = await prisma.users.findUnique({ where: { username } });

  if (!user) {
    console.log('User not found');
    return;
  }

  // Check if the stored password matches the input password
  const isPasswordMatch = await compare(inputPassword, user.password);

  console.log('Password match:', isPasswordMatch);
}

confirmPassword()
  .catch((error) => {
    console.error('Error occurred:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
