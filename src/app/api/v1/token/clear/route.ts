import { DeleteTokensPastDate } from "@/db/queries";
import { APIResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

/**
 * Api for CRON jobs to clear user tokens
 */
export const GET = async (req: NextRequest) => {
  const { headers } = req;

  const authHeader = headers.get("Authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      } satisfies APIResponse),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const date = new Date();
  date.setHours(date.getHours() - 1);

  const result = await DeleteTokensPastDate(date);

  return new NextResponse(
    JSON.stringify({
      message: `Deleted ${result} tokens older than ${date.toISOString()}`,
    } satisfies APIResponse),
    {
      status: 200,
    },
  );
};
