import type { NextPage, NextPageContext } from 'next'
// import Head from 'next/head'
import { useAppSelector, useAppDispatch } from "../../src/reduxtoolkit/hooks"
import { setTOC } from 'src/reduxtoolkit/tocSlice';
import { useEffect } from 'react'
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import { AddTitleCssToH1, ChangeLinks } from '@components/Helpers/functions';

export async function getServerSideProps({ req }: NextPageContext) {
  let githubMarkDownContent = await (await fetch(`${githubURL}SUMMARY.md`)).text()
  var tocList: any = [];
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
        tocList = htmlfile.value.toString();

      }
    )
    .catch((err) => { });
  return {
    props: {
      toc: AddTitleCssToH1(ChangeLinks(tocList)),
    },
  }
}



type TProps = {
  toc: [];
};

const Home: NextPage<TProps> = ({ toc }) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: setTOC,
      payload: toc,
    })
  }, [toc, dispatch])

  return (
    <div>
      <h1>Hello</h1>

    </div>
  )
}

export default Home