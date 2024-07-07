import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request, 
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {

        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        });

        if (!chapter || !chapter.title || !chapter.videoUrl || !chapter.description) {
            return new NextResponse("Missing Required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: true
            }
        });
        
        return NextResponse.json(publishedChapter);

    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Unauthorized", { status: 500 });
    }
}