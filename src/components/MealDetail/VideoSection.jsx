import { Youtube } from "lucide-react";

/**
 * VideoSection displays a cooking video for a given meal.
 * @param {Object} props
 * @param {string} props.url - The YouTube URL of the cooking video.
 */

const VideoSection = ({ url }) => {
    const getYoutubeEmbedUrl = (url) => {
        if (!url || typeof url !== "string") return "";
        // Standard YouTube URL
        let match = url.match(/v=([^&]+)/);
        if (match) return `https://www.youtube.com/embed/${match[1]}`;
        // Short youtu.be URL
        match = url.match(/youtu\.be\/([^?&]+)/);
        if (match) return `https://www.youtube.com/embed/${match[1]}`;
        // Embed URL already
        match = url.match(/youtube\.com\/embed\/([^?&]+)/);
        if (match) return url;
        // If nothing matches, return empty string
        return "";
    };

    const embedUrl = getYoutubeEmbedUrl(url);
    return (
        <div className="flex flex-col w-full p-4 gap-4 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-md">
            <p className="flex items-center gap-2 font-medium text-md">
                <Youtube className="text-red-600" />
                Cooking Video
            </p>
            <div>
                {embedUrl ? (
                    <div className="aspect-video">
                        <iframe
                            src={embedUrl}
                            className="w-full h-full rounded-lg"
                            title="Cooking Video"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">
                        No video available
                    </p>
                )}
            </div>
        </div>
    );
};

export default VideoSection;
