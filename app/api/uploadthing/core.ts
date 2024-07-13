import { isTeacher } from "@/lib/teacher";
import { auth as authh } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {

    const { userId } = authh();

    const isAuthenticated = isTeacher(userId);

    if (!userId || !isAuthenticated) throw new Error("Unauthorized");
    return { userId };
}

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    courseAttachment: f({
        text: { maxFileSize: "32MB" },   // Example max size for text files
        image: { maxFileSize: "32MB" },  // Example max size for image files
        video: { maxFileSize: "1GB" },   // Example max size for video files
        audio: { maxFileSize: "32MB" },  // Example max size for audio files
        pdf: { maxFileSize: "32MB" }     // Example max size for pdf files
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;