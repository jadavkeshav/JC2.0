"use client";

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    url: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer = ({
    url,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        console.log("Component mounted on client side");
    }, []);

    useEffect(() => {
        if (isReady) {
            console.log("Video is ready to play");
        }
    }, [isReady]);

    if (!isClient) {
        return (
            <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary " />
                </div>
            </div>
        );
    }

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary " />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="w-8 h-8" />
                    <p className="text-sm">
                        This chapter is locked.
                    </p>
                </div>
            )}

            {!isLocked && (
                <ReactPlayer
                    url={url}
                    // className={cn(!isReady && "hidden")}
                    onReady={() => {
                        setIsReady(true);
                        console.log("ReactPlayer onReady triggered");
                    }}
                    onError={(e) => console.error('Error loading video:', e)}
                    onEnded={() => console.log("Video has ended")}
                    controls
                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    width="100%"
                    height="100%"

                />
            )}
        </div>
    );
};