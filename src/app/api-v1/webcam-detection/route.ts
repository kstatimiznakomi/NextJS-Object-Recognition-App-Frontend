import {NextRequest} from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        
        const body = await req.text();
        const bodyImage = JSON.parse(JSON.parse(body).body).imageBase64;

        return Response.json(bodyImage);
    } catch (err) {
        console.log(err);
    }

}