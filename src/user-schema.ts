import { TypeOf, object, string } from "zod";

export const registerUserSchema = object({
  name: string({ required_error: "Заполните имя" })
    .min(1, "Заполните имя")
    .max(30, "Максимальная длина имени 30"),
  username: string({ required_error: "Name is required" })
    .min(1, "Заполните имя пользователя")
    .max(30, "Максимальная длина имени пользователя 30"),
  lastName: string({ required_error: "Name is required" })
    .min(1, "Заполните фамилию")
    .max(30, "Максимальная фамилии имени 30"),
  email: string({ required_error: "Email is required" })
    .min(1, "Заполните почту")
    .email("Неверный формат почты"),
  password: string({ required_error: "Заполните пароль" })
    .min(4, "Минимальная длина пароля 4")
    .max(30, "Максимальная длина пароля 30"),
  verifyPassword: string({
    required_error: "Введите подтверждение пароля",
  })
    .min(4, "Минимальная длина пароля 4")
    .max(30, "Максимальная длина пароля 30"),
}).refine((data) => data.password === data.verifyPassword, {
  path: ["verifyPassword"],
  message: "Пароли не совпадают!",
});

export const loginUserSchema = object({
  username: string({ required_error: "Username is required" })
    .min(3, "Имя пользователя не заполнено")
    .max(30),
  password: string({ required_error: "Password is required" })
    .min(4, "Минимальная длина пароля 4")
    .max(30),
  email: string({ required_error: "Password is required" })
    .min(3, "Почта не заполнена")
    .max(30)
    .optional(),
  verifyPassword: string({
    required_error: "Подтвердите пароль",
  })
    .min(4, "Минимальная длина пароля 4")
    .max(30, "Максимальная длина пароля 30"),
}).refine((data) => data.password === data.verifyPassword, {
  path: ["verifyPassword"],
  message: "Пароли не совпадают!",
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
