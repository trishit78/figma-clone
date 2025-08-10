import { Liveblocks } from "@liveblocks/node";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

if (!env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is missing from environment");
}

const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(req: Request): Promise<Response> {
  const userSession = await auth();

  if (!userSession?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: userSession.user.id },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Pull room name dynamically from query params
  

  const session = liveblocks.prepareSession(user.id, {
    userInfo: { name: user.email ?? "Anonymous" },
  });

  const { searchParams } = new URL(req.url);
const roomId = searchParams.get("roomId") ?? "default-room";
 if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  session.allow(`room:${roomId}`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
