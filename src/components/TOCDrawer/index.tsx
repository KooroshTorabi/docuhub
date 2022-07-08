import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '@reduxtoolkit/hooks';
import parse, { HTMLReactParserOptions, Element, attributesToProps } from 'html-react-parser';
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { getBody } from '@components/Helpers/functions';
import { useRouter } from 'next/router';

const TOCDrawer = (props: any) => {
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
                        onClose();
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

    const { isOpen, onOpen, onClose } = props;
    const btnRef: any = useRef<HTMLHeadingElement>(null)
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
                        <Box className={"tocbody toc"}>
                            {toc && parse(toc, options)}
                        </Box>
                        {/* <Box className={"tocbody toc"}
                            // w="20vw"
                            dangerouslySetInnerHTML={{ __html: toc }}
                        /> */}
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