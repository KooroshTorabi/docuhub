import Layout from '@components/Layout'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { addTitleOfImageFromAlt, loadGitbookAssets } from '@components/Helpers/functions';

export async function getServerSideProps({ req }: NextPageContext) {

    const regex = /(http:\/\/|.*\/docs)(\/.*)/gm;
    let str: any = req?.url;
    const subst = `https://raw.githubusercontent.com/babyloniaapp/docs/main/$2`;

    // The substituted value will be contained in the result variable
    const url = str.replace(regex, subst);

    const githubMarkDownContent = await (await fetch(`${url}`)).text()
    var content = "";

    await unified()
        .use(remarkParse)
        // add any remark plugins here
        .use(remarkRehype, { allowDangerousHtml: true })
        // add any rehype plugins here
        .use(rehypeRaw)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(githubMarkDownContent)
        .then(
            (file) => {
                content = file.value.toString();
            }
        )
        .catch((err) => { });

    // setContent();
    // console.log(content);
    return {
        props: {
            content: addTitleOfImageFromAlt(loadGitbookAssets(content)),
            req: JSON.stringify(req?.rawHeaders)
        },
    }

}


type TProps = {
    content: string;
}


const Docs: NextPage<TProps> = ({ content }) => {
    const router = useRouter()
    const [readmeContent, setReadmeContent] = useState("");
    const { pid, p2 } = router.query
    // console.log(pid, p2, router.query);
    // const getContentAwait = async () => {
    //     setReadmeContent(await getContent(pid, p2));
    //     console.log(readmeContent + "aaaaaa");
    // }

    // useEffect(() => {
    //     getContentAwait();
    // }, [])

    return (
        <Container
            maxW=".xl"
            bg="black.900"
            pt="0"
            pb="0"
            pl="0"
            pr="0"
            w="100vw"
            h="100vh"
        // mt={["88px", "88px", "124px"]}
        // h="80vh"
        >
            <Head>
                <title>Docs</title>
                <meta name="description" content="Documentation of Babylonia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <h1>p3333</h1> */}
            <Layout content={content}></Layout>

        </Container>
    )
}




export default Docs;