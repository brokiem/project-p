import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const {email, password} = await readBody(event);

  const user = await prisma.users.findFirst({
    where: {email},
  });

  if (!user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'User not found',
    }), {status: 404});
  }

  // Check if the password is valid using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid password',
    }), {status: 401});
  }

  const {uuid, username, permissions} = user;
  // Create a token using jwt
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({uuid, username, email, permissions}, jwtSecretKey!, {
    algorithm: 'HS384',
    expiresIn: '7d' // expires in 7 days
  });

  return new Response(JSON.stringify({
    success: true,
    message: token,
  }), {status: 200});
});
