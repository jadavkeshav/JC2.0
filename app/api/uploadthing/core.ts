import { isTeacher } from "@/lib/teacher";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = clerkAuth();

    const isAuthenticated = isTeacher(userId);

    if (!userId || !isAuthenticated) throw new Error("Unauthorized");
    return { userId };
}

// This function seems to be a placeholder for actual auth implementation
const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { 
            // Implement any logic needed upon successful upload
        }),
    courseAttachment: f({
        "text": { maxFileSize: "32MB" },
        "image": { maxFileSize: "32MB" },
        "video": { maxFileSize: "1GB" },
        "audio": { maxFileSize: "32MB" },
        "pdf": { maxFileSize: "32MB" }
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            // Implement any logic needed upon successful upload
        }),
    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            // Implement any logic needed upon successful upload
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
