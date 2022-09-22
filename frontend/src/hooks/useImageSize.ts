import { useEffect, useState } from 'react';

const useImageSize = (url?: string) => {
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                const { width, height } = img;

                let nH = 0;

                const nW = 128;
                const w_c_p = ((nW - width) / width) * 100;
                const f_w_c_p = Math.floor(w_c_p) / 100;
                const hDiff = height * f_w_c_p;

                nH = height + hDiff;

                setImageDimensions({
                    width: nW,
                    height: nH,
                });
            };
        }
    }, [url]);

    return imageDimensions;
};

export default useImageSize;
