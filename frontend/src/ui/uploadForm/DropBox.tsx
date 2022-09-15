import React from 'react';

export interface DropBoxProps {
    selectFile?: (files: FileList) => void;
}

export const DropBox: React.FC<DropBoxProps> = ({ selectFile }) => {
    const [dragActive, setDragActive] = React.useState(false);

    const handleDrag = function (e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = function (e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            selectFile && selectFile(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            selectFile && selectFile(e.target.files);
        }
    };

    return (
        <div
            className={`flex items-center justify-center w-full h-36 border-4 border-dashed rounded-lg transition-colors duration-300 ${
                dragActive ? 'border-accent' : 'border-primary-600'
            }`}
            onDrag={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                name="drop_box_file"
                id="drop_box_file"
                className="hidden"
                onChange={handleFileSelect}
            />

            <label
                htmlFor="drop_box_file"
                className="w-full h-full rounded-lg cursor-pointer flex flex-col items-center justify-center"
            >
                <strong className="text-accent">Drop your files here!</strong>

                <small className="text-primary-200">
                    and prepare for takeoff
                </small>
            </label>
        </div>
    );
};
