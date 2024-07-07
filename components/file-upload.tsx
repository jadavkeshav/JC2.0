"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url? : String) => void;
    endpoint: keyof typeof OurFileRouter;
}

export const FileUpload =({
    onChange,
    endpoint
}: FileUploadProps) => {
    return (
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res)=>{
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error)=> {
                toast.error(error.message)
            }}
        />
    )
}