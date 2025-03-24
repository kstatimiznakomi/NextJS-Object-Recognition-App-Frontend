import { Detections } from "@/components/detections/detections";
import { verifyJwt } from "@/utils/session";
import { cookies } from "next/headers";

export default async function DetectionsPage() {
  var cookieStore = await cookies();
  var verifiedUser = await verifyJwt(cookieStore.get("JWT")?.value);
  return <Detections id={String(verifiedUser?.id)} />;
}
