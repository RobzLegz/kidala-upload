import Head from 'next/head';
import React from 'react';
import { FileInterface } from '../interfaces/file';
import { BASE_URL } from '../requests/routes';
import { detectFileType } from '../utils/detectFileType';

export interface HeadParserProps {
    file?: FileInterface;
    title: string;
    description: string;
}

const HeadParser: React.FC<HeadParserProps> = ({ file, title, description }) => {
    if (!file) {
        return (
            <Head>
                <title>Kidala upload | {title}</title>
                <meta
                    name="twitter:title"
                    content={`Kidala upload | ${title}`}
                />
                <meta
                    property="og:title"
                    content={`Kidala upload | ${title}`}
                />
                <meta name="twitter:site" content="kidala.life" />
                <meta
                    property="og:image"
                    content="/images/janisbataragsuzliso.png"
                />
                <meta name="description" content={description} />
                <meta name="og:description" content={description} />
                <meta name="twitter:description" content={description} />
                <meta
                    name="twitter:image"
                    content="/images/janisbataragsuzliso.png"
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="og:site_name" content="kidala.life" />
                <meta property="og:type" content="website" />
            </Head>
        );
    }

    return (
        <Head>
            <title>Kidala upload | {title}</title>
            <meta name="twitter:title" content={`Kidala upload | ${title}`} />
            <meta property="og:title" content={`Kidala upload | ${title}`} />
            <meta name="twitter:site" content="kidala.life" />
            <meta
                property="og:image"
                content={
                    file.hash && detectFileType(file.name)
                        ? `${BASE_URL}/${file.hash}`
                        : '/images/janisbataragsuzliso.png'
                }
            />
            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content={
                    file.hash && detectFileType(file.name)
                        ? `${BASE_URL}/${file.hash}`
                        : '/images/janisbataragsuzliso.png'
                }
            />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="kidala.life" />
            <meta property="og:type" content="website" />
        </Head>
    );
};

export default HeadParser;
