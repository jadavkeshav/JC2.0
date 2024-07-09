"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);
        } catch (error) {
            console.error("Request failed:", error);

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    console.error("Response data:", axiosError.response.data);
                    console.error("Response status:", axiosError.response.status);
                    console.error("Response headers:", axiosError.response.headers);

                    if (axiosError.response.status === 404) {
                        toast.error("Course not found. Please check the course ID.");
                    } else {
                        toast.error("Something went wrong. Please try again.");
                    }
                } else if (axiosError.request) {
                    console.error("Request data:", axiosError.request);
                    toast.error("No response received. Please check your network connection.");
                } else {
                    console.error("Error message:", axiosError.message);
                    toast.error("An error occurred. Please try again.");
                }
            } else {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={onClick}
            disabled={isLoading}
            className="w-full md:w-auto" 
            size={"sm"}
        >
            Enroll for {formatPrice(price)}
        </Button>
    );
};
