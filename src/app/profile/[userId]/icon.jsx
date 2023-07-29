import { baseUrl, userRoute } from "@/services/routes";
import { ImageResponse } from "next/server";

export const size = {
  width: 32,
  height: 32,
};

export default async function icon({ params }) {
  // fetch data
  const user = await fetch(`${baseUrl}${userRoute}/${params?.userId}`).then(
    (res) => res.json()
  );
  console.log({ user, params });
  return new ImageResponse(
    (
      <img
        alt="avatar"
        style={{ borderRadius: "100%" }}
        width="100%"
        height="100%"
        src={user?.image}
      />
    )
  );
}
