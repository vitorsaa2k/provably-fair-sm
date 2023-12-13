import { NextResponse } from "next/server";
import crypto from "crypto";
import { Requisition } from "@/types/api";

export async function POST(req: Requisition) {
	const body = await req.json();
	const { serverSeed, salt } = body;
	const publicHash = crypto
		.createHmac("sha256", serverSeed)
		.update(salt)
		.digest("hex");
	return NextResponse.json({ publicHash });
}
