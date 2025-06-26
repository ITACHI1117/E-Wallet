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
  userRole: z.string().refine((val) => val === "student" || val === "admin", {
    message: "Role must be either 'student' or 'admin'",
  }),
});

// fund wallet Schema
export const fundWalletSchema = z.object({
  walletBalance: z.number().min(1000, "You have to fund more than 1000 "),
});

// create event schema
export const createEventSchema = z.object({
  eventName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Event Title must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Description must be less than 50 characters"),
  targetAmount: z.number(),
  // createdBy: z.string(),
});
