import { NextRequest, NextResponse } from "next/server";

import { setCallSign } from "../route";
import { CallSign } from "~/types/patient";

export async function POST(req: NextRequest) {
    const { fphm }: { fphm: string } = await req.json();

    setCallSign(fphm, CallSign.NotCalled);

    return NextResponse.json("success");
}
