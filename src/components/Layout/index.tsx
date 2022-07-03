import React, { useEffect, useState } from "react";
import { action } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";

import Header from "@components/Header";
import BodyOfPageL1 from "@components/BodyOfPage";
import TOCDrawer from "@components/TOCDrawer";
import { useRouter } from "next/router.js";
import TOC from "@components/TOC";
const drawerWidth = 300;

type TProps = {
  content: string;
}

const Layout: NextPage<TProps> = (props: any) => {
  // // const values = useSelector((state: any) => state.items);
  // // const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box maxWidth="100%" width="100%" >

      <Header isOpen={isOpen} onOpen={onOpen} onClose={onClose}></Header>

      <Grid
        templateAreas={`"header header header"
      "nav main toc"
      "nav footer footer"`}
        gridTemplateRows={'0px 1fr 0px'}
        gridTemplateColumns={['0vw 1fr', '0vw 1fr', '20vw 1fr 20vw', '20vw 1fr 20vw']}
        gap={0}
      >

        <GridItem w="20vw" area={'nav'} >
          <TOC />
        </GridItem>
        <GridItem area={'main'} h="90vh">
          <BodyOfPageL1 content={props.content} ></BodyOfPageL1>
        </GridItem>
        <GridItem area={'toc'} h="90vh">
        </GridItem>
      </Grid>

      <TOCDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

    </Box>
  );
};

export default Layout;
