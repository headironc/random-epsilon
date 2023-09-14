import { NextRequest, NextResponse } from "next/server";

import { setCallSign } from "../route";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { patient: string } },
) {
    const FPHM = params.patient;

    setCallSign(FPHM, 0);

    return NextResponse.json("success");
}
