import { Youtube } from "lucide-react";

const VideoSection = ({ url }) => {
    const getYoutubeEmbedUrl = (url) => {
        const match = url.match(/v=([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    return (
        <div className="flex flex-col w-full p-4 gap-4 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-md">
            <p className="flex items-center gap-2 font-medium text-md">
                <Youtube className="text-red-600" />
                Cooking Video
            </p>
            <div>
                {url ? (
                    <div className="aspect-video">
                        <iframe
                            src={getYoutubeEmbedUrl(url)}
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
