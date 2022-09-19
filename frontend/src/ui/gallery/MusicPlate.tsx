import Image from 'next/image';
import React from 'react';

export interface MusicPlateProps {
    image: string;
}

const MusicPlate: React.FC<MusicPlateProps> = ({ image }) => {
    return (
        <div className="flex items-center justify-center relative rounded-full w-40 h-40 border border-primary-700">
            <div className="bg-primary-800 w-20 h-20 relative rounded-full">
                <Image
                    src={image}
                    draggable={false}
                    layout="fill"
                    className="rounded-full"
                    objectFit="cover"
                    blurDataURL={image}
                    placeholder="blur"
                />
            </div>

            <div className="w-full h-full absolute top-0 left-0 rounded-full">
                <Image
                    src="/icons/music-disc.png"
                    draggable={false}
                    layout="fill"
                    className="rounded-full"
                />
            </div>

            <div className="rounded-full p-1 bg-primary-800 absolute"></div>
        </div>
    );
};

export default MusicPlate;
