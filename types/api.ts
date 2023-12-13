import { NextRequest } from "next/server";

export type CheckResults = {
	publicHash: string;
	randomNumber: number;
	isPublicHashValid: boolean;
	isRollValid: boolean;
} | null;

export type Requisition = NextRequest & {
	json: any;
};
