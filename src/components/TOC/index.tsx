import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'src/reduxtoolkit/hooks';
import parse, { HTMLReactParserOptions, Element, attributesToProps } from 'html-react-parser';
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { getBody } from '@components/Helpers/functions';



const TOC = () => {
    const toc = useAppSelector((state: any) => state.toc.tocHtml);
    const dispatch = useAppDispatch()
    const options: HTMLReactParserOptions = {
        replace: domNode => {
            if (domNode instanceof Element && domNode.attribs) {
                if (domNode.attribs && domNode.name === 'a') {
                    const props = attributesToProps(domNode.attribs);
                    // var ddd: any = domNode.children[0]?.data
                    var node: any = domNode.children[0];
                    return <Text cursor="pointer" {...props} onClick={async () => {
                        dispatch(setContent(""))
                        let content = await getBody(props.href)
                        dispatch(setContent(content + ""))
                        dispatch(setCurrentUrl(props.href))
                    }}> {node?.data}</Text>;
                }
            }
        }
    };

    return (
        <VStack>

            <Flex h="92vh" overflow={"scroll"}
                overflowX={"hidden"}
                display={["none", "none", "block", "block"]}
                pb="50px"
            >

                <Box className={"toc"}>
                    {parse(toc, options)}

                </Box>
                {/* <Box className={"toc"}
                w="20vw"
                px={"20px"}
                pb={"50px"}
                h="50vh"
                dangerouslySetInnerHTML={{ __html: toc }}
            /> */}
                <Box h="150px"></Box>
            </Flex>

        </VStack>
    )
}

export default TOC