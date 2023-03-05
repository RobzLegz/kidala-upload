import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../Button';

export interface NoFilesProps {
    liked?: boolean;
    saved?: boolean;
    my?: boolean;
}

const NoFiles: React.FC<NoFilesProps> = ({ liked, saved, my }) => {
    const router = useRouter();

    return (
        <div className="w-full items-center justify-center p-4 rounded-lg border border-primary-700 bg-primary-800 flex flex-col no_select">
            <Image
                src="/images/kidala.png"
                width={200}
                height={220}
                objectFit="contain"
                draggable={false}
            />

            <p className="text-accent mt-2">
                {liked || saved
                    ? `You don't have any ${
                          liked ? 'liked' : 'favourite'
                      } files :(`
                    : "You haven't uploaded any files"}
            </p>

            {my && (
                <Button className="mt-4" onClick={() => router.push('/')}>
                    Upload
                </Button>
            )}
        </div>
    );
};

export default NoFiles;
