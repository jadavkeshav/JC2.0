"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactPlayer from 'react-player';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter video
                <Button onClick={toggleEdit} variant={"ghost"} >
                    {isEditing ? "Cancel" : initialData.videoUrl ? (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Video
                        </>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a Video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-600 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        {initialData.videoUrl && (
                            <ReactPlayer 
                                volume={1}
                                url={initialData.videoUrl} 
                                controls={true}
                                width="100%"
                                height="100%"
                                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            />
                        )}
                    </div>
                )
            ) : (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-sm text-muted-foreground mt-4">
                        Upload this Chapter&apos;s video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-sm text-muted-foreground mt-2">
                    Videos can take a while to load. Refresh the page if you don&apos;t see the video.
                </div>
            )}
        </div>
    );
};
