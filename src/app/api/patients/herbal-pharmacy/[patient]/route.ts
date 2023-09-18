import { NextRequest, NextResponse } from "next/server";

import { setCallSign } from "../route";
import { CallSign } from "~/types/patient";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { patient: string } },
) {
    const FPHM = params.patient;

    setCallSign(FPHM, CallSign.NotCalled);

    return NextResponse.json("success");
}
