import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import {order} from "@/actions/order";
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userid = searchParams.get('userId');
  const itemid = searchParams.get('itemId');
 
  const session = await auth();

  if (!session) {
    return NextResponse.json({error: "Not logged in!", code: 401});
  }

  if(session.user.id !== userid) {
    return NextResponse.json({error: "Not logged in as this user!", code: 401});
  }

  if(!itemid || !userid) {
    return NextResponse.json({error: "Missing parameters!", code: 400});
  }

    const result = await order(itemid,userid);

  return NextResponse.json({data: result, code: 200});

}
