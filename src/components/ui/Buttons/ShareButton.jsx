import React from "react";
import { Button } from "./button";
import { Share2 } from "lucide-react";

export const ShareButton = ({ className }) => {
    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator
                .share({
                    title: "Check out this meal!",
                    text: "I found this amazing meal and wanted to share it with you!",
                    url: url,
                })
                .then(() => console.log("Share successful"))
                .catch((error) => console.error("Error sharing:", error));
        }
    };

    return (
        <Button
            variant={"outline"}
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium"
        >
            <Share2 className="mr-2 h-4 w-4" />
            Share
        </Button>
    );
};
