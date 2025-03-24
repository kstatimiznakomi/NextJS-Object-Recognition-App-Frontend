import { loginUserSchema, registerUserSchema } from "@/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodError } from "zod";
import { SpanError } from "../SpanError/SpanError";

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });
  const [isResultGot, setIsResultGot] = useState(false);

  const send = async (data: FieldValues) => {
    try {
      loginUserSchema.parse(data);
    } catch (e) {
      return;
    }

    await axios
      .post("http://localhost:3000/api-v1/register", data)
      .then((res) => {
        res.data.msg;
      });
    setIsResultGot(true);
    setTimeout(() => setIsResultGot(false), 5000);
  };

  return (
    <div className="flex justify-center flex-col p-3">
      {isResultGot && (
        <span
          className={
            "absolute text-white text-center bg-sky-500/75 p-3 right-0 bottom-0 m-4 rounded-l flex-1"
          }
        >
          Регистрация прошла успешно!
        </span>
      )}

      <div className="flex flex-wrap justify-center h-full">
        <form
          onSubmit={handleSubmit((data) => send(data))}
          className="flex bg-black flex-col gap-4 p-5  border-2 border-black border-solid rounded-xl w-[500px]"
        >
          <div className="flex mb-4 justify-center">
            <span className="text-2xl absolute text-white text-center">
              Регистрация
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="ln">
              Фамилия
            </label>
            <input
              className="p-3"
              type="text"
              id="ln"
              {...register("lastName", {
                required: true,
                maxLength: 30,
              })}
              placeholder="Введите фамилию"
              required
            />
            {errors.lastName && (
              <SpanError error={String(errors.lastName?.message)} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="n">
              Имя
            </label>
            <input
              className="p-3"
              type="text"
              id="n"
              {...register("name")}
              placeholder="Введите имя"
              required
            />
            {errors.name && <SpanError error={String(errors.name?.message)} />}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="sn">
              Отчество
            </label>
            <input
              className="p-3"
              type="text"
              id="sn"
              {...register("surName", {
                maxLength: 30,
              })}
              placeholder="Введите отчество"
              required
            />
            {errors.surName && (
              <SpanError error={String(errors.surName?.message)} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="un">
              Имя пользователя
            </label>
            <input
              className="p-3"
              type="text"
              id="un"
              {...register("username")}
              placeholder="Введите имя пользователя"
              required
            />
            {errors.username && (
              <SpanError error={String(errors.username?.message)} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="email">
              Почта
            </label>
            <input
              className="p-3"
              type="email"
              id="email"
              {...register("email", {
                required: true,
                maxLength: 30,
              })}
              placeholder="Введите почту"
              required
            />
            {errors.email && (
              <SpanError error={String(errors.email?.message)} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="psword">
              Пароль
            </label>
            <input
              className="p-3"
              type="password"
              id="psword"
              {...register("password", {
                required: true,
                maxLength: 30,
              })}
              placeholder="Введите пароль"
              required
            />
            {errors.password && (
              <SpanError error={String(errors.password?.message)} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2 ml-1" htmlFor="verifyPassword">
              Подтверждение пароля
            </label>
            <input
              className="p-3"
              type="password"
              id="verifyPassword"
              {...register("verifyPassword", {
                required: true,
                maxLength: 30,
              })}
              placeholder="Подтвердите пароль"
              required
            />
            {errors.verifyPassword && (
              <SpanError error={String(errors.verifyPassword?.message)} />
            )}
          </div>
          <button className="bg-white p-3 rounded-xl" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
