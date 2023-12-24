"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video, XSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chaterId: string;
};

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chaterId,
}: ChapterVideoFormProps) => {
    const [isEditing, setEditing] = useState(false);

    const toggleEdit = () => setEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chaterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong!")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter video 
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>
                            <XSquare className="h-4 w-4 mr-2"/>
                            Cancel
                        </>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add a video
                        </>
                    )}    
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit video
                        </>
                    )}    
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60
                     bg-slate-200 rounded-sm">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                       <MuxPlayer 
                            playbackId={initialData?.muxData?.playbackId || ""}
                       />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapter's video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to uploaded,
                    Refresh the page if video does not appear.
                </div>
            )}
        </div>
    )
}