import type { NextPage, NextPageContext } from 'next'
import { useAppSelector, useAppDispatch } from "@reduxtoolkit/hooks"
import { setTOC, setTOCHtml } from '@reduxtoolkit/tocSlice';
import { useEffect, useRef, useState } from 'react'
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import { addKebabIdToHTags, AddTitleCssToH1, addTitleOfImageFromAlt, ChangeLinks, getNodeTree, getTOCList, loadGitbookAssets } from '@components/Helpers/functions';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import Layout from '@components/Layout';
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { useRouter } from 'next/router';
// function Gfx() {

//   // Initializing useRouter() method
//   const router = useRouter()
//   return Home;
//   // return <h1>Path :- {router.asPath} </h1>
// }


export async function getServerSideProps(req: any) {
  var resolvedUrl = req?.resolvedUrl;
  let githubMarkDownContent = await (await fetch(`${githubURL}SUMMARY.md`)).text()
  var toc_html: string = ""
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
      (htmlfile) => {
        toc_html = AddTitleCssToH1(ChangeLinks(htmlfile.value.toString()));
        // tocList = htmlfile.value.toString();
      }
    )
    .catch((err) => { });

  resolvedUrl = resolvedUrl.replace(/^\/docs\//gm, '');
  resolvedUrl = resolvedUrl.replace(/\#(.*)/gm, '');
  const bodyUrl = `https://raw.githubusercontent.com/babyloniaapp/docs/main/` + resolvedUrl;

  let bodyContentMd = await (await fetch(`${bodyUrl}`)).text()

  let bodyContent = ""
  await unified()
    .use(remarkParse)
    // add any remark plugins here
    .use(remarkRehype, { allowDangerousHtml: true })
    // add any rehype plugins here
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(bodyContentMd)
    .then(
      (htmlfile: any) => {
        bodyContent = addKebabIdToHTags(addTitleOfImageFromAlt(loadGitbookAssets(htmlfile.value.toString())));
      }
    )
    .catch((err: any) => {
      console.log("Error in restPath", err)
    });
  return {
    props: {
      toc: getTOCList(toc_html),// AddTitleCssToH1(ChangeLinks(tocList)),
      tocHtml: toc_html,
      body: bodyContent,
      currentUrl: "/" + resolvedUrl
    },
  }
}


type TProps = {
  toc: [],
  tocHtml: string,
  body: string,
  currentUrl: string
};

type TTocItem = {
  address: string,
  title: string
}

const Home: NextPage<TProps> = ({ toc, tocHtml, body, currentUrl }) => {
  const dispatch = useAppDispatch()
  const [url, setUrl] = useState("");
  const router = useRouter()
  const ShallowUrl = router.asPath.replace(/\#(.*)/gm, '')
  useEffect(() => {
    if ("/docs" + currentUrl === ShallowUrl) {
      dispatch(setTOC(toc))
      dispatch(setTOCHtml(tocHtml))
      dispatch(setContent(body))
      dispatch(setCurrentUrl(currentUrl))
      setUrl(currentUrl)
    }
  }, [])

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
    >
      <Head>
        <title>Docs</title>
        <meta name="description" content="Documentation of Babylonia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />

    </Container>
  )
}

export default Home