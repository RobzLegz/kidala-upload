import Image from 'next/image';
import React from 'react';

export interface MusicPlateProps {
    image?: string;
}

const MusicPlate: React.FC<MusicPlateProps> = ({ image }) => {
    return (
        <div className="flex items-center justify-center relative rounded-full w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 border border-primary-700">
            <div className="w-full h-full rounded-full relative">
                <Image
                    src="/icons/music-disc.png"
                    draggable={false}
                    layout="fill"
                    className="rounded-full"
                />
            </div>

            {image && (
                <div className="bg-primary-800 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 absolute rounded-full border-2 border-white">
                    <div className="w-full h-full relative">
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
                </div>
            )}

            <div className="rounded-full p-1.5 bg-primary-800 absolute"></div>
        </div>
    );
};

export default MusicPlate;
