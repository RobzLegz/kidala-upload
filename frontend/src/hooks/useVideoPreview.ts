import { useEffect, useState } from 'react';

export const useVideoPreview = (url?: string) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (url) {
            const video = document.createElement('video');
            video.src = url;
            const onLoad = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.currentTime = 1;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(video, 0, 0);
                    setCanvas(canvas);
                }
            };

            video.addEventListener('canplay', onLoad);
            return () => video.removeEventListener('load', onLoad);
        }
    }, [url]);

    return canvas;
};
