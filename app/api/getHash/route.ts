import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
	const body = await req.json();
	const { serverSeed, clientSeed, nonce } = body;
	const hash = crypto
		.createHmac("sha512", serverSeed)
		.update(`${clientSeed}-${nonce}`)
		.digest("hex")
		.substring(0, 10);
	return NextResponse.json({ hash });
}
