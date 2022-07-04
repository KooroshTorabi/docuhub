import { NextPage } from "next";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";

import Header from "@components/Header";
import BodyOfPage from "@components/BodyOfPage";
import TOCDrawer from "@components/TOCDrawer";
import TOC from "@components/TOC";
import { useAppSelector } from "@reduxtoolkit/hooks";

const Layout: NextPage = (props: any) => {
  // // const values = useSelector((state: any) => state.items);
  // // const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toclist = useAppSelector((state: any) => state.toc.items);
  return (
    <Box maxWidth="100%" width="100%" >

      <Header isOpen={isOpen} onOpen={onOpen} onClose={onClose}></Header>

      <Grid
        templateAreas={`"header header"
      "nav main"
      "nav footer"`}
        gridTemplateRows={'0px 1fr 0px'}
        gridTemplateColumns={['0vw 1fr', '0vw 1fr', '20vw 1fr 20vw', '20vw 1fr 20vw']}
        gap={0}
        h="90vh"
      >

        <GridItem w="20vw" area={'nav'} >
          <TOC />
        </GridItem>
        <GridItem area={'main'} >
          <BodyOfPage />
        </GridItem>
        <GridItem area={'toc'} >
        </GridItem>
      </Grid>

      <TOCDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

    </Box>
  );
};

export default Layout;
