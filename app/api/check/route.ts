import {
	combineAndHash,
	generateRandomNumber,
	returnPublicHash,
} from "@/utils/provablyFair";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const json = JSON.parse(body.json);
	const publicHash = returnPublicHash(json.serverSeed, json.salt);
	const hash = combineAndHash(json.serverSeed, json.clientSeed, json.nonce);
	const randomNumber = generateRandomNumber(hash);
	const isPublicHashValid = publicHash === json.publicHash;
	const isRollValid = randomNumber === json.roll;
	return NextResponse.json({
		publicHash,
		randomNumber,
		isPublicHashValid,
		isRollValid,
	});
}
