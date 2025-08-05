import React from "react";
import { Button } from "./button";
import { Share2 } from "lucide-react";

const ShareButton = ({className}) => {
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
            className={`flex px-4 py-2 text-xs bg-white rounded-sm border-2 border-yellow-500 hover:bg-gray-100 transition-colors ${className}`}
            onClick={handleShare}
        >
            <Share2 className="mr-2 h-4 w-4" />
            Share
        </Button>
    );
};

export default ShareButton;
