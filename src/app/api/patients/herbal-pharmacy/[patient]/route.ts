import { NextRequest, NextResponse } from "next/server";

import { setCallSign } from "../route";
import { CallSignNumber } from "~/types/patient";

export async function POST(req: NextRequest) {
    const { FPHM }: { FPHM: string } = await req.json();

    setCallSign(FPHM, CallSignNumber.Called);

    return NextResponse.json("success");
}
