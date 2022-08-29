import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';
import LanguageSelector from '../../src/components/language/LanguageSelector';
import CheckAuth from '../../src/hooks/CheckAuth';
import { FileInterface } from '../../src/interfaces/file';
import { AppInfo, selectApp, setFiles } from '../../src/redux/slices/appSlice';
import { BASE_URL, LIST_FILES } from '../../src/requests/routes';
import { isImage } from '../../src/utils/isImage';

export default function Home(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            dispatch(setFiles(props.files));
        }
    }, []);

    return (
        <div className="page">
            <Head>
                <title>
                    Kidala upload |{' '}
                    {props.file?.name ? props.file.name : 'File'}
                </title>
                <meta
                    name="twitter:title"
                    content={`Kidala upload | ${
                        props.file?.name ? props.file.name : 'File'
                    }`}
                />
                <meta
                    property="og:title"
                    content={`Kidala upload | ${
                        props.file?.name ? props.file.name : 'File'
                    }`}
                />
                <meta name="twitter:site" content="kidala.life" />
                <meta
                    property="og:image"
                    content={
                        props.file?.hash && isImage(props.file.name)
                            ? `${BASE_URL}/${props.file.hash}`
                            : '/images/janisbataragsuzliso.png'
                    }
                />
                <meta
                    name="description"
                    content={`View ${
                        props.file?.name ? props.file.name : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="og:description"
                    content={`View ${
                        props.file?.name ? props.file.name : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="twitter:description"
                    content={`View ${
                        props.file?.name ? props.file.name : 'uploaded file'
                    } 🔥 stafaars, max safe pacani only at www.kidala.life`}
                />
                <meta
                    name="twitter:image"
                    content={
                        props.file?.hash && isImage(props.file.name)
                            ? `${BASE_URL}/${props.file.hash}`
                            : '/images/janisbataragsuzliso.png'
                    }
                />
                <meta property="twitter:card" content="summary" />
                {/* <meta property="og:image:width" content="4608" /> */}
                {/* <meta property="og:image:height" content="3456" /> */}
                <meta property="og:site_name" content="kidala.life" />
                <meta property="og:type" content="website" />
            </Head>

            <SingleFileContainer />

            <CheckAuth />

            <LanguageSelector />
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { hash } = context.query;

    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = await fetch(LIST_FILES, requestOptions);
    const resJson: FileInterface[] = await res.json();

    const file = resJson.find((f) => f.hash === hash);

    return {
        props: {
            files: resJson,
            file: file,
        },
    };
}
