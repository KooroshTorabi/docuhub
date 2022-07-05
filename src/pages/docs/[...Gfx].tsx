// Importing useRouter() method
import { NextPageContext } from 'next';
import { useRouter } from 'next/router'
import Home from './index';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import { AddTitleCssToH1, addTitleOfImageFromAlt, ChangeLinks, getNodeTree, getTOCList, loadGitbookAssets } from '@components/Helpers/functions';
// function Gfx() {

//   // Initializing useRouter() method
//   const router = useRouter()
//   return Home;
//   // return <h1>Path :- {router.asPath} </h1>
// }


export async function getServerSideProps(req: any) {
  var resolvedUrl = req?.resolvedUrl;
  console.log(resolvedUrl)
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
  console.log(resolvedUrl)
  const bodyUrl = `https://raw.githubusercontent.com/babyloniaapp/docs/main/` + resolvedUrl;
  console.log(bodyUrl)

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
        bodyContent = addTitleOfImageFromAlt(loadGitbookAssets(htmlfile.value.toString()));
      }
    )
    .catch((err: any) => {
      // bodyContent = "xxxxxxx = ";
      console.log(err)
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


export default Home;