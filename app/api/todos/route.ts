import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import {auth} from  "@clerk/nextjs/server"
// import jwt from 'jsonwebtoken'
// import { cookies } from "next/headers";


// const JWT_SECRET = process.env.JWT_SECRET;


// for clerk based authentication

export  async function POST(req:Request) {

  try{
    const {userId} = await auth();
    if(!userId) {
      return NextResponse.json({"message":"unauthorized"})
    }

    const body = await req.json();
    const {task} = body;
      if (!task) {
    return NextResponse.json({ message: "Task can't be empty" }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where:{
      clerkId:userId
    }

  });
  if(!dbUser){
    return NextResponse.json({message:"user not found"})
  }
  const newTask =  await prisma.tasks.create({
    data:{
      task,
      userId:dbUser.id,
    }
    
  })
    return NextResponse.json({ message: "Task created", task: newTask });
  }
  
  catch(error){
    console.log(error)

  }
}

// token based system


// export default async function GET(req:Request){
//   try{
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
    
//     if(!token){
//       return NextResponse.json({messag:"no token provided"});
//     }
//     const decoded = jwt.verify(token,JWT_SECRET!) as {id:number}
//     const tasks = await prisma.tasks.findMany({
//       where:{userId:decoded.id},
//       orderBy:{createdAt:"desc"}
      
//     })
//     return NextResponse.json({tasks})
    
    

//   }
//   catch(error)
  
//   {
//     return NextResponse.json({message:"error fetching data"},{status:500})
    
//   }
  
// }


// export async function POST(req:NextRequest){

// const body = await req.json();
// const {task} = body;

// if(!task)
// {
//     return NextResponse.json({message:"tasks cant be empty"},{status:400});

// }

// const  cookieStore = await cookies();
// const token =  cookieStore.get("token")?.value;

// if(!token){
//     return NextResponse.json({message:"task cant be empty"},{status:401});
// }
//   const decoded = jwt.verify(token, JWT_SECRET!) as { id: number };
//   const newTask =  await prisma.tasks.create({
//     data:{
//         task,
//         userId:decoded.id
//     }
//   })
//   return NextResponse.json({message:"task created sucessfully",task:newTask
//   }
//   )
// }