import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { githubURL } from "@components/Helpers/GlobalVariables.js";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { AddTitleCssToH1, ChangeLinks } from '@components/Helpers/functions';
import Link from 'next/link';


const getContent = async () => {
    // get Table Of README.md from root of github repository
    let githubMarkDownContent = await (await fetch(`${githubURL}/SUMMARY.md`)).text()
    // console.log("githubMarkDownContent = ", githubMarkDownContent);
    var readmeContent = "";
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
                readmeContent = file.value.toString();
            }
        )
        .catch((err) => { });
    return readmeContent;
}

const TOC = () => {
    const [originalToc, setOriginalToc] = useState(``);
    const [toc, setToc] = useState(``);

    const getContentAwait = async () => {
        const tocContent = await getContent()
        setOriginalToc(tocContent);
        return tocContent;
    }

    useEffect(() => {
        if (originalToc === "")
            getContentAwait();
    }, []);
    useEffect(() => {
        if (toc === "")
            setToc(AddTitleCssToH1(ChangeLinks(originalToc)));
        // setToc(AddTitleCssToH1(ChangeLinks(originalToc)));
    }, [originalToc])

    return (
        <Flex h="92vh" overflow={"scroll"}
            overflowX={"hidden"}
            display={["none", "none", "block", "block"]}
            pb="50px"
        >
            <Box className={"toc"}
                w="20vw"
                px={"20px"}
                pb={"50px"}
                h="50vh"
                dangerouslySetInnerHTML={{ __html: toc }}
            />
            <Box h="150px"></Box>
        </Flex>

    )
}

export default TOC