import { Clock } from "lucide-react";

const InstructionsSection = ({ instructions }) => {
    const instructionsList = instructions ? instructions.split("\n") : [];
    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-md">
            <p className="flex gap-2 items-center font-medium text-md">
                <Clock />
                Cooking Instructions
            </p>
            <p className="text-md font flex flex-col gap-4">
                {instructionsList.length > 0 ? (
                    instructionsList.map((line, index) => (
                        <span key={index}>{line}</span>
                    ))
                ) : (
                    <span className="text-gray-400">
                        No instructions available
                    </span>
                )}
            </p>
        </div>
    );
};

export default InstructionsSection;
