import { NextResponse } from "next/server";
import crypto from "crypto";
import { Requisition } from "@/types/api";

export async function POST(req: Requisition) {
	const body = await req.json();
	const { serverSeed, clientSeed, nonce } = body;
	const hash = crypto
		.createHmac("sha512", serverSeed)
		.update(`${clientSeed}-${nonce}`)
		.digest("hex")
		.substring(0, 10);
	return NextResponse.json({ hash });
}
