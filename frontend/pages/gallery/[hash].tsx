import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';
import CheckAuth from '../../src/hooks/CheckAuth';
import { FileInterface } from '../../src/interfaces/file';
import { ADMIN_LIST_FILES } from '../../src/requests/routes';

export default function Home(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <div className="page">
            <Head>
                <title>
                    Kidala upload |{' '}
                    {props.file?.name ? props.file?.name : 'File'}
                </title>
                <meta
                    content="/images/janisbataragsuzliso.png"
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

    const url = `${ADMIN_LIST_FILES}`;
    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = await fetch(url, requestOptions);
    const resJson: FileInterface[] = await res.json();

    const file = resJson.find((f) => f.hash === hash);

    return {
        props: {
            files: resJson,
            file: file,
        },
    };
}
