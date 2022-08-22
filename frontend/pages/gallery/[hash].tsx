import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';
import CheckAuth from '../../src/hooks/CheckAuth';
import { FileInterface } from '../../src/interfaces/file';
import { AppInfo, selectApp, setFiles } from '../../src/redux/slices/appSlice';
import { ADMIN_LIST_FILES, BASE_URL } from '../../src/requests/routes';
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
                    content={
                        props.file?.hash && isImage(props.file.name)
                            ? `${BASE_URL}/${props.file.hash}`
                            : '/images/janisbataragsuzliso.png'
                    }
                    property="og:image"
                />
                <meta
                    name="description"
                    content="View uploaded file 🔥 stafaars, max safe pacani only at kidala.life"
                />
            </Head>

            <SingleFileContainer />

            <CheckAuth />
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

    const res = await fetch(ADMIN_LIST_FILES, requestOptions);
    const resJson: FileInterface[] = await res.json();

    const file = resJson.find((f) => f.hash === hash);

    return {
        props: {
            files: resJson,
            file: file,
        },
    };
}
