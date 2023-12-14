import { NextRequest, NextResponse } from "next/server";

import { getHitList } from "@/app/hacks/log4shell/data";

export const GET = (_: NextRequest) =>
  NextResponse.json(getHitList(), { status: 200 });
