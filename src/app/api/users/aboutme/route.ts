import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from '@/helpers/getUserToken';
connect()


export  async function POST(request:NextRequest) {
   const userId =  await getUserToken(request)
   const user = await User.findOne({_id: userId}).select("-password")

   return NextResponse.json({
    message: "User found",
    data: user
   })
}