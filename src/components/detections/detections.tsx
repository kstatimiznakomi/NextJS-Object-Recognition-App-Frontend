import { PrismaClient } from "@prisma/client";

interface User {
  id: string;
}

export const Detections: React.FC<User> = async ({ id }) => {
  var getDetections = async (id: string) => {
    var prisma = new PrismaClient();
    return await prisma.users_Images.findMany({
      where: {
        user_id: Number(id),
      },
    });
  };
  return (
    <div className="flex h-full items-center justify-center content-center align-center flex-col ">
      <div className="flex flex-col gap-3 bg-[#141414] p-5 rounded-xl justify-center">
        <div className="flex justify-between">
          <div className="flex w-full justify-center">
            <span className="text-xl text-white">Исходное изображение</span>
          </div>
          <div className="flex w-full justify-center">
            <span className="text-xl text-white">Распознанное изображение</span>
          </div>
        </div>
        {Object.values(await getDetections(id)).map((item) => (
          <>
            <div className="gap-3 flex flex-wrap w-fit">
              <div>
                <img
                  key={item.image}
                  className="rounded-xl"
                  height={200}
                  width={400}
                  alt=""
                  src={item.image}
                />
              </div>
              <div>
                <img
                  className="rounded-xl"
                  key={item.detected_image}
                  alt=""
                  width={400}
                  height={200}
                  src={item.detected_image}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
