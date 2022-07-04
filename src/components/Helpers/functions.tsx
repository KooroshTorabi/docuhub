
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
// import { AddTitleCssToH1, addTitleOfImageFromAlt, ChangeLinks, loadGitbookAssets } from '@components/Helpers/functions';


export const loadGitbookAssets = (content: any) => {
    return content.replace(
        /(<img\s+(?:[^>]*?\s+)?src=["])((.*?)\.gitbook\/assets\/)(.*[\"]\s)/gm,
        `$1https://raw.githubusercontent.com/babyloniaapp/docs/main/.gitbook/assets/$4`
    )
        .replace(/\s+/g, " ")
        .trim()
}

export const addTitleOfImageFromAlt = (content: any) => {
    // const regex = /<img.*?alt=\"([^"]*)\".*?>/gm;
    //     Alternative syntax using RegExp constructor
    const regex = new RegExp('(<img\\s+(?:[^>]*?\\s+)?alt=(["\\\'](.*?)["\\\'].*?)>)', 'gm')
    const str = content + "";
    const subst = `$1<p class="image-alt">$3</p>`;

    return str.replace(regex, subst)
        .replace(/\s+/g, " ")
        .trim()
}

export const ChangeLinks = (content: any) => {
    // if ( pid === null)
    return content.replace(
        /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1>(.*)<\/a>/gm,
        "<a href=\"/$2\"> $3 </a>"
        // "<a onclick={loadcontent(\"$2\")}> $3 </a>"
    )
        .replace(/\s+/g, " ")
        .trim()
}

export const AddTitleCssToH1 = (content: any) => {
    return content.replace(
        /<h1>(.*?)\1/gm,
        `<h1 class="title">`
    )
        .replace(/\s+/g, " ")
        .trim()
}


export function getNodeTree(node: any) {
    if (node.hasChildNodes()) {
        var children: any = [];
        for (var j = 0; j < node.childNodes.length; j++) {
            children.push(getNodeTree(node.childNodes[j]));
        }

        return {
            nodeName: node.nodeName,
            parentName: node.parentNode.nodeName,
            children: children,
            content: node.innerText || "",
        };
    }

    return false;
}


export const getTOCList = (tocHtml: string) => {
    const regex = new RegExp('<a.*?href=["\\\'](.*?)["\\\']>(.*?)<\\/a>', 'gm')
    let list: any = [];
    let m;
    while ((m = regex.exec(tocHtml)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        list = [...list, {
            address: m[1],
            title: m[2]
        }]
        //   console.log(" address ---- >", m[1])
        //   console.log(" title ---- >", m[2])
        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
        //   console.log(`Found match, group ${groupIndex}: ${match}`);
        // });
    }
    console.log(list)

    return list;

}


export async function getBody(url: string) {
    const fileName = url === "/" ? "README.md" : url;
    const bodyUrl = `https://raw.githubusercontent.com/babyloniaapp/docs/main/${fileName}`;
    let githubMarkDownContent = await (await fetch(`${bodyUrl}`)).text()
    let body = ""
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
                body = addTitleOfImageFromAlt(loadGitbookAssets(htmlfile.value.toString()));
            }
        )
        .catch((err) => { return "dddd" });
    return body;
}
