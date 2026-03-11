"use server";
import { hashPassword } from "../auth";
import { prisma } from "../prisma";
import { RegisterSchema, RegisterSchemaType } from "../schema";

export async function registerUser(data: RegisterSchemaType) {
  const validatedData = RegisterSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid registration data",
      issues: validatedData.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return {
        success: false,
        error: "Email already in use",
      };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "An error occurred while registering",
    };
  }
}
