
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export const loadGitbookAssets = (content: any) => {
    return content.replace(
        /(<img\s+(?:[^>]*?\s+)?src=["])((.*?)\.gitbook\/assets\/)(.*[\"]\s)/gm,
        `$1https://raw.githubusercontent.com/babyloniaapp/docs/main/.gitbook/assets/$4`
    )
        .replace(/\s+/g, " ")
        .trim()
}

export const addTitleOfImageFromAlt = (content: any) => {
    const regex = new RegExp('(<img\\s+(?:[^>]*?\\s+)?alt=(["\\\'](.*?)["\\\'].*?)>)', 'gm')
    const str = content + "";
    const subst = `$1<p class="image-alt">$3</p>`;

    return str.replace(regex, subst)
        .replace(/\s+/g, " ")
        .trim()
}

const getStrongTitleForId = (item: string) => {
    const regex = new RegExp('<strong(.*?)>(.*?)<\\/strong>.*', 'gm')
    let strongItem;
    const replace_string = `$2`;
    const id = item.replace(regex, replace_string);
    return toKebabCase(id.replace("&#x26;", "&").trim()) + "";
}

export const addKebabIdToHTags = (content: any) => {
    const regex = new RegExp('<h([1-6](.*?))>(.*?)<\\/h[1-6]>', 'gm')

    let hTag, strongItem;
    while ((hTag = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (hTag.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        strongItem = haveStrongItem(hTag[3]);
        let id = ""
        if (strongItem.length !== "") {
            id = getStrongTitleForId(hTag[3])
            content = content.replace(hTag[0], `<h${hTag[1]} id="${id}">${hTag[3]}</h${hTag[1]}>`);
        } else {
            id = toKebabCase(hTag[3].replace("&#x26;", "&").trim()) + "";
            if (id === "")
                id = "tag" + (Math.random() * 1000).toString().trim()
            content = content.replace(hTag[0], `<h${hTag[1]} id="${id}">${hTag[3]}</h${hTag[1]}>`);
        }

    }
    // const str = content + "";
    // const subst = `$1<p class="image-alt">$3</p>`;

    return content;
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
    // console.log(list)

    return list;

}

const toKebabCase = (str: string) => {
    if (str !== null)
        return str
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
}

const haveStrongItem = (item: string) => {
    //<h([1-6](.*?))>(<strong>)(.*?)(<\/strong>).*?<\/h[1-6]>
    const regex = new RegExp('<strong(.*?)>(.*?)<\\/strong>', 'gm')
    let list: any = [];
    let strongItem;
    while ((strongItem = regex.exec(item)) !== null) {
        if (strongItem.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        list = [...list, {
            title: strongItem[2].replace("&#x26;", "&"),
            level: "2",
            id: toKebabCase(strongItem[2].replace("&#x26;", "&").trim()),
            // items: []
        }]
    }
    return list;
}


export const getTOCOfBodyList = (tocHtml: string) => {
    const regex = new RegExp('<h([1-6].*?)>(.*?)<\\/h([1-6])>', 'gm')
    let list: any = [];
    let item, strongItem;
    while ((item = regex.exec(tocHtml)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (item.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        strongItem = haveStrongItem(item[2]);
        if (strongItem.length !== 0) {
            list = [...list, ...strongItem];
        } else {
            list = [...list, {
                title: item[2].replace("&#x26;", "&"),
                level: "1",
                id: toKebabCase(item[2].replace("&#x26;", "&").trim()),
                // items: []
            }]
        }

    }

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
                body = addKebabIdToHTags(addTitleOfImageFromAlt(loadGitbookAssets(htmlfile.value.toString())));
            }
        )
        .catch((err) => { return "dddd" });
    return body;
}
