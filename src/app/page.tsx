import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className={
          "flex justify-center flex-col main-text text-xl w-100 h-100 text-center h-dvh "
        }
      >
        <div className="container py-2 px-2">
          <p className={"text-white"}>
            Данное приложение создано с использованием NextJS для распознавания
            объектов. Здесь в будущем будут различные варианты распознавания.
          </p>
        </div>
        <div className={"mt-3 gap-3 flex justify-center"}>
          <Link
            className={"py-2 px-2 text-white rounded-lg bg-gray-500"}
            href={"/object"}
          >
            Распознавание объектов
          </Link>
          <Link
            className={"py-2 px-2 text-white rounded-lg bg-gray-500"}
            href={"/gesture"}
          >
            Распознавание жестов
          </Link>
        </div>
      </div>
    </>
  );
}
