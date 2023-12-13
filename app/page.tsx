"use client";

import { CheckResults } from "@/types/api";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
	const [rollJson, setRollJson] = useState("");
	const [checkResults, setCheckResults] = useState<CheckResults>();

	async function checkRoll(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const req = await axios.post<CheckResults>("/api/check", {
			json: rollJson,
		});
		if (req.data) {
			setCheckResults({
				isPublicHashValid: req.data.isPublicHashValid,
				isRollValid: req.data.isRollValid,
				publicHash: req.data.publicHash,
				randomNumber: req.data.randomNumber,
			});
		}
	}

	return (
		<main className="flex text-white min-h-screen flex-col items-center p-24">
			<form className="flex gap-1 flex-col" onSubmit={checkRoll}>
				<textarea
					rows={10}
					cols={90}
					placeholder="Paste the json here"
					className="border-white outline-none border bg-zinc-800 p-1"
					onChange={e => {
						setCheckResults(null);
						setRollJson(e.currentTarget.value);
					}}
				></textarea>
				<button className="bg-zinc-700 px-2 py-1" type="submit">
					Check
				</button>
			</form>
			<div className="flex justify-center flex-col items-center m-4">
				<h2 className="bg-zinc-800 p-2 rounded m-2">Check results</h2>
				{checkResults ? (
					<div className="m-2 flex flex-col items-center">
						<p>Given public hash: {JSON.parse(rollJson).publicHash}</p>
						<p>Generated public hash: {checkResults.publicHash}</p>
						{checkResults.isPublicHashValid ? (
							<p className="bg-green-800 p-2 rounded">The data is equal!</p>
						) : (
							<p className="bg-red-500">
								The data is not equal! verify the values and try again
							</p>
						)}
					</div>
				) : null}
				{checkResults ? (
					<div className="m-2 flex flex-col items-center">
						<p>Given Roll: {JSON.parse(rollJson).roll}</p>
						<p>Generated Roll: {checkResults.randomNumber}</p>
						{checkResults.isRollValid ? (
							<p className="bg-green-800 p-2 rounded">The data is equal!</p>
						) : (
							<p className="bg-red-500">
								The data is not equal! verify the values and try again
							</p>
						)}
					</div>
				) : null}
			</div>
		</main>
	);
}
