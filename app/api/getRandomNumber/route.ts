import { Requisition } from "@/types/api";
import { NextResponse } from "next/server";

export async function POST(req: Requisition) {
	const body = await req.json();
	const { hash, maxRange } = body;
	const decimalValue = parseInt(hash, 16);
	const randomNumber = (decimalValue % maxRange) + 1;
	return NextResponse.json({ randomNumber });
}
