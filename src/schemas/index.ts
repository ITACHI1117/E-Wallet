import { z } from "zod/v4";

// login up Schema
export const loginSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  matricNumber: z.number().min(1, "Matric number is required"),
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
  //   confirmPassword: z
  //     .string()
  //     .min(6, "Confirm password must be at least 6 characters")
  //     .nonempty("Confirm password is required"),
});
