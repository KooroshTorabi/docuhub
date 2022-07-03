import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack } from '@chakra-ui/react';
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



const getContent = async () => {
    // get Table Of README.md from root of github repository
    console.log(githubURL);
    let githubMarkDownContent = await (await fetch(`${githubURL}SUMMARY.md`)).text()
    var readmeContent = "";
    // http://localhost:3000/docs/games/docs/games/blockchain-roulette.md
    // https://github.com/babyloniaapp/docs/blob/main/games/blockchain-roulette.md

    // https://raw.githubusercontent.com/babyloniaapp/docs/main/games/README.md

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



const TOCDrawer = (props: any) => {
    const { isOpen, onOpen, onClose } = props;
    const btnRef: any = useRef<HTMLHeadingElement>(null)
    const [toc, setToc] = useState(``);

    const getContentAwait = async () => {
        setToc(await getContent());
        console.log(toc + "aaaaaa");
    }

    useEffect(() => {
        getContentAwait();
        setToc(AddTitleCssToH1(ChangeLinks(toc)));

    }, []);

    return (
        <Drawer isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
            isFullHeight={true}
            size="lg"
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Babylonia.app</DrawerHeader>

                <DrawerBody>
                    <>
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                            }}>
                            <div className="logo-wrapper-drawer  m-3 !ml-4  flex gap-5 !items-center !justify-center">
                                <SearchIcon id="myBtn" />
                            </div>
                        </div>
                        <Divider />
                        <Box className={"toc"}
                            // w="20vw"
                            dangerouslySetInnerHTML={{ __html: toc }}
                        />
                        <div className="inject overflow-y-auto overflow-x-hidden">
                        </div>
                    </>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}




export default TOCDrawer