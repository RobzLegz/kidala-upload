import Head from 'next/head';
import CheckAuth from '../../src/hooks/CheckAuth';
import dynamic from 'next/dynamic';
import { PageComponent } from '../../src/types/PageComponent';
import { FileInterface } from '../../src/interfaces/file';
import { sortFiles } from '../../src/utils/sortFiles';
import { LIST_FILES } from '../../src/requests/routes';
import { useEffect } from 'react';
import { AppInfo, selectApp, setFiles } from '../../src/redux/slices/appSlice';
import { useSelector, useDispatch } from 'react-redux';

const GalleryContainer = dynamic(
    () => import('../../src/components/gallery/GalleryContainer')
);
const LanguageSelector = dynamic(
    () => import('../../src/components/language/LanguageSelector')
);

interface GalleryProps {
    files: FileInterface[];
}

const Gallery: PageComponent<GalleryProps> = ({ files }) => {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            dispatch(setFiles(files));
        }
    }, []);

    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Files</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans 🔥 stafaars. Max safe pacani utt. Only at www.kidala.life"
                />
            </Head>

            <GalleryContainer />

            <CheckAuth />

            <LanguageSelector />
        </div>
    );
};

Gallery.getInitialProps = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = await fetch(LIST_FILES, requestOptions);
    const resJson: FileInterface[] = await res.json();

    return {
        files: resJson,
    };
};

export default Gallery;
