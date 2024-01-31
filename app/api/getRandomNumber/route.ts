import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const { hash, maxRange } = body;
	const decimalValue = parseInt(hash, 16);
	const randomNumber = (decimalValue % maxRange) + 1;
	return NextResponse.json({ randomNumber });
}
