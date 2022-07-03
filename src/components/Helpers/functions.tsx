export const loadGitbookAssets = (content: any) => {
    // console.log("content : ", content)
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
        "<a href=\"/docs/$2\"> $3 </a>"
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