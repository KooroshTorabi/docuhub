import { Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@reduxtoolkit/hooks';
import { InsideSpinner, Spinner } from '@components/UI/Spinner';
import { LinkPrevious, LinkNext } from "grommet-icons";
import { setContent, setCurrentUrl } from '@reduxtoolkit/bodySlice';
import { getBody } from '@components/Helpers/functions';


const BodyOfPage = () => {
    const [originalContent, setOriginalContent] = useState("");
    const content = useAppSelector((state: any) => state.body.content);
    const tocItems = useAppSelector((state: any) => state.toc.items);
    const currentUrl = useAppSelector((state: any) => state.body.currentUrl);
    console.log("current URL=", currentUrl)
    const router = useRouter()
    const dispatch = useAppDispatch()

    return (
        <>
            {!content && (<Spinner></Spinner>)
            }
            {
                content && (

                    <VStack>
                        <HStack w="full" overflow={"scroll"} overflowX={"hidden"} >
                            <Box
                                h="86vh"
                                px={"20px"}
                                className={"inject"}
                                // h="92vh"
                                w="full"
                                fontFamily={"Ropa Sans"}
                                fontSize={"24px"}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </HStack>
                        <HStack w="full" >
                            <Flex w="full">
                                {tocItems.findIndex((item: any) => item.address === currentUrl) > 0 &&
                                    <Flex h="50px" w="full" border="2px" borderRadius={5}
                                        alignItems={"center"} justifyContent="left" pl="15px" mr="10px"
                                        cursor="pointer"
                                        onClick={
                                            async () => {
                                                var url = tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) - 1].address
                                                dispatch(setContent(""))
                                                let content = await getBody(url)
                                                dispatch(setContent(content + ""))
                                                dispatch(setCurrentUrl(url))
                                            }
                                        }
                                    >
                                        <LinkPrevious />
                                        <Text fontFamily={"Ropa Sans"} fontSize={"24px"} ml="10px">
                                            {tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) - 1].title.replace("&#x26;", "&")}
                                        </Text>
                                    </Flex>
                                }
                                {tocItems.findIndex((item: any) => item.address === currentUrl) < tocItems.length-1 &&
                                    <Flex h="50px" w="full" border="2px" borderRadius={5}
                                        alignItems={"center"} justifyContent="right" pr="15px" ml="10px"
                                        cursor="pointer"
                                        onClick={
                                            async () => {
                                                var url = tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) + 1].address
                                                dispatch(setContent(""))
                                                let content = await getBody(url)
                                                dispatch(setContent(content + ""))
                                                dispatch(setCurrentUrl(url))
                                            }
                                        }
                                    >
                                        <Text
                                            fontFamily={"Ropa Sans"} fontSize={"24px"} mr="10px">
                                            {(tocItems[tocItems.findIndex((item: any) => item.address === currentUrl) + 1].title.replace("&#x26;", "&"))}
                                        </Text>
                                        <LinkNext />
                                    </Flex>
                                }
                            </Flex>
                        </HStack>
                    </VStack>
                )
            }
        </>
    )
}

export default BodyOfPage