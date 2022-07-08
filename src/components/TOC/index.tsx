import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@reduxtoolkit/hooks';
import parse, { HTMLReactParserOptions, Element, attributesToProps } from 'html-react-parser';
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { getBody } from '@components/Helpers/functions';
import { useRouter } from 'next/router';



const TOC = (props: any) => {
    const toc = useAppSelector((state: any) => state.toc.tocHtml);
    const dispatch = useAppDispatch()
    const router = useRouter()
    const options: HTMLReactParserOptions = {
        replace: domNode => {
            if (domNode instanceof Element && domNode.attribs) {
                if (domNode.attribs && domNode.name === 'a') {
                    const props = attributesToProps(domNode.attribs);
                    // var ddd: any = domNode.children[0]?.data
                    var node: any = domNode.children[0];
                    return <Text cursor="pointer" {...props} onClick={async () => {
                        router.push("/docs" + props.href, undefined, { shallow: true })
                        dispatch(setCurrentUrl(""))
                        dispatch(setContent(""))
                        let content = await getBody(props.href)
                        dispatch(setCurrentUrl(props.href))
                        dispatch(setContent(content + ""))
                    }}> {node?.data}</Text>;
                }
            }
        }
    };
    return (
        <VStack h="100%" display={["none", "none", "block", "block"]}>
            <Flex
                mx="4px"
                h="100%" 
                overflow={"hidden"}
                overflowX={"hidden"}
                overflowY={"visible"}
                display={["none", "none", "block", "block"]}
                pb="10px"
                w={props.w}
            >
                <Box className={"tocbody toc"}>
                    {toc && parse(toc, options)}
                </Box>
            </Flex>

        </VStack>
    )
}

export default TOC