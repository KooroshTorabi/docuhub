import { Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@reduxtoolkit/hooks';
import { InsideSpinner, Spinner } from '@components/UI/Spinner';
import { LinkPrevious, LinkNext } from "grommet-icons";
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { getBody } from '@components/Helpers/functions';
import TocOfBody from '../TocOfBody';


const BodyOfPage = (props: any) => {
    const content = useAppSelector((state: any) => state.body.content);
    const tocItems = useAppSelector((state: any) => state.toc.items);
    const currentUrl = useAppSelector((state: any) => state.body.currentUrl);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const ref: any = useRef();
    return (
        <>
            {!content && (<Spinner></Spinner>)
            }
            {
                content && (

                    <VStack
                        overflow={"hidden"}
                        overflowX={"hidden"}
                        overflowY={"hidden"}

                        h={props.h} spacing={0} w={props.w} m={props.m}>
                        <HStack
                            overflow={"hidden"}
                            overflowX={"hidden"}
                            overflowY={"hidden"}

                            w="100%" h="100vh">
                            <Box
                                ref={ref}
                                h="100%"
                                px={"20px"}
                                className={"body-scroll-box docbody"}
                                // h="92vh"
                                // w="full"
                                w="100vw"
                                fontFamily={"Ropa Sans"}
                                fontSize={"24px"}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </HStack>
                        <HStack
                            // h={["140px", "140px", "100px", "100px"]}
                            w={["90vw", "90vw", "78vw", "78vw"]}
                            position={"sticky"} bottom="0"
                        >
                            <Flex
                                py="10px"
                                px="0px"
                                h="full"
                                alignItems={"center"}
                                w="full" mt={"2px"} mb={"5px"} direction={["column", "column", "row", "row"]}>
                                {tocItems.findIndex((item: any) => item.address === currentUrl) > 0 &&
                                    <Flex h="50px" w="full" border="2px" borderRadius={5} bg="-moz-initial"
                                        alignItems={"center"} justifyContent="left" pl="15px" mx={["0px", "0px", "10px", "10px"]}
                                        mt={["5px", "5px", "5px", "5px"]}
                                        cursor="pointer"
                                        onClick={
                                            async () => {
                                                var url = tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) - 1].address
                                                dispatch(setContent(""))
                                                let content = await getBody(url)
                                                dispatch(setContent(content + ""))
                                                dispatch(setCurrentUrl(url))
                                                router.push("/docs" + url, undefined, { shallow: true })
                                            }
                                        }
                                    >
                                        <LinkPrevious />
                                        <Text fontFamily={"Ropa Sans"} fontSize={["16px", "16px", "24px", "24px"]} mx={["0px", "0px", "10px", "10px"]}>
                                            {tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) - 1].title.replace("&#x26;", "&")}
                                        </Text>
                                    </Flex>
                                }
                                {tocItems.findIndex((item: any) => item.address === currentUrl) < tocItems.length-1 &&
                                    <Flex h="50px" w="full" border="2px" borderRadius={5}
                                        mt={["5px", "10px", "5px", "5px"]}

                                        alignItems={"center"} justifyContent="right" pr="15px" mx={["0px", "0px", "10px", "10px"]}
                                        cursor="pointer"
                                        onClick={
                                            async () => {
                                                var url = tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) + 1].address
                                                dispatch(setContent(""))
                                                let content = await getBody(url)
                                                dispatch(setContent(content + ""))
                                                dispatch(setCurrentUrl(url))
                                                router.push("/docs" + url, undefined, { shallow: true })
                                            }
                                        }
                                    >
                                        <Text
                                            fontFamily={"Ropa Sans"} fontSize={["16px", "16px", "24px", "24px"]} mx={["0px", "0px", "10px", "10px"]}>
                                            {(tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) + 1].title.replace("&#x26;", "&"))}
                                        </Text>
                                        <LinkNext />
                                    </Flex>
                                }
                            </Flex>
                        </HStack>
                        <Box h="0px" display={["none", "none", "block", "block"]} >
                            <TocOfBody headingSelector="h1, h2, h3, h4, h5, h6" Ref={ref} ></TocOfBody>
                        </Box>

                    </VStack>
                )
            }
        </>
    )
}

export default BodyOfPage