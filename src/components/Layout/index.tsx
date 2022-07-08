import { NextPage } from "next";
import { Box, Grid, GridItem, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";

import Header from "@components/Header";
import BodyOfPage from "@components/BodyOfPage";
import TOCDrawer from "@components/TOCDrawer";
import TOC from "@components/TOC";
import TocOfBody from "../TocOfBody";


const Layout: NextPage = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const bodyRef = useRef();
  return (
    <Box maxWidth="100%" width="100%"
      overflow={"hidden"}
      overflowX={"hidden"}
      overflowY={"hidden"}
    >

      <VStack
        overflow={"hidden"}
        overflowX={"hidden"}
        overflowY={"hidden"}


        h="100vh" spacing={0}>
        <HStack
          overflow={"hidden"}
          overflowX={"hidden"}
          overflowY={"hidden"}

          w="100%" h={["100px", "100px", "8vh", "8vh"]} sx={{ gap: "0px" }} bg="blueviolet" spacing={0}>
          <Header isOpen={isOpen} onOpen={onOpen} onClose={onClose}></Header>
        </HStack>
        <HStack w="100%" h={["full", "full", "92vh", "92vh"]} spacing={0}>
          <TOC w="20vw" />
          <BodyOfPage w={["", "", "80vw", "80vw"]} h={["90vh", "90vh", "92vh", "92vh"]} mt="200px" />
        </HStack>
      </VStack>

      <TOCDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

    </Box>
  );
};

export default Layout;
