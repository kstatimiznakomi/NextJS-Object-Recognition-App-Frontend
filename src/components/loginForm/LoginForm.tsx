import { loginUserSchema } from "@/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { NextResponse } from "next/server";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodError } from "zod";
import { SpanError } from "../SpanError/SpanError";

export const LoginForm: React.FC = () => {
  const [isResultGot, setIsResultGot] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const send = async (data: FieldValues) => {
    try {
      loginUserSchema.parse(data);
    } catch (e: ZodError) {
      return;
    }

    try {
      var { msg, status } = await axios
        .post("http://localhost:3000/api-v1/login", data)
        .then((res) => {
          return res.data;
        });
      if (status !== 404) {
        setIsResultGot(true);
        setTimeout(() => setIsResultGot(false), 5000);

        return NextResponse.redirect(
          new URL(`http://localhost:3000/upload`, document.URL)
        );
      } else {
        setServerError(String(status));
        setTimeout(() => setServerError(""), 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center flex-col p-3">
      {isResultGot && (
        <span
          className={
            "absolute text-white text-center bg-sky-500/75 p-3 right-0 bottom-0 m-4 rounded-l flex-1"
          }
        >
          Вы успешно вошли!
        </span>
      )}
      <div className="flex flex-wrap justify-center">
        <form
          onSubmit={handleSubmit((data) => send(data))}
          className="flex bg-black flex-col gap-4 p-5 border-2 border-black border-solid rounded-xl w-[500px]"
        >
          {serverError === "404" && (
            <span
              className={
                "text-white text-center bg-red-500/75 p-3 select-none rounded-l"
              }
            >
              Неверный логин или пароль!
            </span>
          )}
          <div className="flex mb-4 justify-center">
            <span className="text-2xl absolute text-white text-center">
              Вход
            </span>
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
            <label className="text-white mb-2 ml-1" htmlFor="psword">
              Пароль
            </label>
            <input
              className="p-3"
              type="password"
              id="psword"
              {...register("password")}
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
              {...register("verifyPassword")}
              placeholder="Подтвердите пароль"
              required
            />
            {errors.verifyPassword && (
              <SpanError error={String(errors.verifyPassword?.message)} />
            )}
          </div>
          <button className="bg-white p-3 rounded-xl" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
