import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { githubURL } from "@components/Helpers/GlobalVariables.js";
import { NextPageContext } from 'next';



const BodyOfPageL1 = (props: any) => {
    const [originalContent, setOriginalContent] = useState("");
    const [content, setContent] = useState(props.content);
    const router = useRouter()
    // const { l1, l2, l3 } = router.query
    // console.log(`l1 = ${l1}, l2= ${l2}, l3= ${l3}, ${router.query}`, router.query, typeof l2);

    return (
        <HStack overflow={"scroll"} overflowX={"hidden"} >

            <Box
                px={"20px"}
                className={"inject"}
                h="92vh"
                w="full"
                fontFamily={"Ropa Sans"}
                fontSize={"24px"}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <Box h="50px"><Text></Text></Box>
        </HStack>
    )
}




export default BodyOfPageL1