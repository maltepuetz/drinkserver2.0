import { auth } from "@/auth";
import { NextResponse } from 'next/server';

import {authorizeUser, unAuthorizeUser} from "@/data/user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userid = searchParams.get('userId');
  const authorize = searchParams.get('authorize');

 
  const session = await auth();

  if (!session) {
    return NextResponse.json({error: "Not logged in!", code: 401});
  }

  if(!userid) {
    return NextResponse.json({error: "Missing parameters!", code: 400});
  }

  if(session.user.role !== "ADMIN") {
    return NextResponse.json({error: "You are not authorized to perform this action!", code: 403});
  }

    if(authorize === "false") {
        const result = await unAuthorizeUser(userid);
        return NextResponse.json({data: result, code: 200});
    } else if(authorize === "true") {
        const result = await authorizeUser(userid);
        return NextResponse.json({data: result, code: 200});
    } else {
        return NextResponse.json({error: "Missing parameters!", code: 400});
    }
}
