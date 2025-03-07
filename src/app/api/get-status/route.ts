import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export async function GET(): Promise<Response> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        //console.log(`${process.env.NEXT_PUBLIC_API_URL}/health -> ${response.status}`);

        if (response.status === 200) {
            return NextResponse.json(
                { status: "API ONLINE" }, 
                { status: StatusCodes.OK } 
            );
        } 
        else {
            return NextResponse.json(
                { status: "API OFFLINE" },
                { status: StatusCodes.SERVICE_UNAVAILABLE } 
            );
        }
    } 
    catch (error) {
        // if (error instanceof Error) {
        //     console.log(`❌ Erro ao checkar status da api ->`, error.message);
        // }
        return NextResponse.json(
            { status: "API OFFLINE", message: error },
            { status: StatusCodes.SERVICE_UNAVAILABLE } 
        );
    }
}

