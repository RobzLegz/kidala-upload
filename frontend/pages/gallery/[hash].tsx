import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckAuth from '../../src/hooks/CheckAuth';
import { FileInterface } from '../../src/interfaces/file';
import { AppInfo, selectApp, setFiles } from '../../src/redux/slices/appSlice';
import { BASE_URL, LIST_FILES } from '../../src/requests/routes';
import { isImage } from '../../src/utils/isImage';
import dynamic from 'next/dynamic';
import { PageComponent } from '../../src/types/PageComponent';
import { isServer } from '../../src/lib/isServer';

interface RoomPageProps {
    files: FileInterface[];
    file: FileInterface | undefined;
}

const SingleFileContainer = dynamic(
    () => import('../../src/components/gallery/SingleFileContainer')
);
const LanguageSelector = dynamic(
    () => import('../../src/components/language/LanguageSelector')
);
import { useRouter } from 'next/router';
import { sortFiles } from '../../src/utils/sortFiles';

const GalleryImagePage: PageComponent<RoomPageProps> = ({ file, files }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { hash } = router.query;

    const appInfo: AppInfo = useSelector(selectApp);

    const [tempFile, setTempFile] = useState<FileInterface | undefined>(
        undefined
    );

    useEffect(() => {
        if (!isServer && appInfo.files && appInfo.files.length > 0) {
            const fFile = appInfo.files.find((f) => f.hash === hash);

            setTempFile(fFile);
        }
    }, [appInfo.files]);

    useEffect(() => {
        if (!appInfo.files && files.length > 0) {
            dispatch(setFiles(files));
        }
    }, []);

    return (
        <div className="page">
            <Head>
                <title>
                    Kidala upload |{' '}
                    {file?.name
                        ? file.name
                        : tempFile?.name
                        ? tempFile.name
                        : 'File'}
                </title>
                <meta
                    name="twitter:title"
                    content={`Kidala upload | ${
                        file?.name
                            ? file.name
                            : tempFile?.name
                            ? tempFile.name
                            : 'File'
                    }`}
                />
                <meta
                    property="og:title"
                    content={`Kidala upload | ${
                        file?.name
                            ? file.name
                            : tempFile?.name
                            ? tempFile.name
                            : 'File'
                    }`}
                />
                <meta name="twitter:site" content="kidala.life" />
                <meta
                    property="og:image"
                    content={
                        file?.hash && isImage(file.name)
                            ? `${BASE_URL}/${file.hash}`
                            : tempFile?.hash
                            ? `${BASE_URL}/${tempFile.hash}`
                            : '/images/janisbataragsuzliso.png'
                    }
                />
                <meta
                    name="description"
                    content={`View ${
                        file?.name
                            ? file.name
                            : tempFile?.name
                            ? tempFile.name
                            : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="og:description"
                    content={`View ${
                        file?.name
                            ? file.name
                            : tempFile?.name
                            ? tempFile.name
                            : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="twitter:description"
                    content={`View ${
                        file?.name
                            ? file.name
                            : tempFile?.name
                            ? tempFile.name
                            : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="twitter:image"
                    content={
                        file?.hash && isImage(file.name)
                            ? `${BASE_URL}/${file.hash}`
                            : tempFile?.hash
                            ? `${BASE_URL}/${tempFile.hash}`
                            : '/images/janisbataragsuzliso.png'
                    }
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="og:site_name" content="kidala.life" />
                <meta property="og:type" content="website" />
            </Head>

            <SingleFileContainer />

            <CheckAuth />

            <LanguageSelector />
        </div>
    );
};

GalleryImagePage.getInitialProps = async ({ query }) => {
    const { hash } = query;

    if (isServer && hash) {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch(LIST_FILES, requestOptions);
            const resJson: FileInterface[] = await res.json();

            const file = resJson.find((f) => f.hash === hash);

            const sortedFiles = sortFiles(resJson);

            return {
                files: sortedFiles,
                file: file,
            };
        } catch {}
    }

    return {
        files: [],
        file: undefined,
    };
};

export default GalleryImagePage;
