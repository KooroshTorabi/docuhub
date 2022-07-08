import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from "@assets/Logo.png"

const Header = (props: any) => {
    const { isOpen, onOpen, onClose } = props;
    return (
        <HStack bg="gray.200" w="100%" h="100%" sx={{ gap: "0px" }} m="0">
            <IconButton
                display={["block", "block", "none", "none"]}
                m={3}
                aria-label="Open Menu"
                // size="lg"
                mr={2}
                icon={<HamburgerIcon />}
                onClick={
                    () => {
                        if (!isOpen) onOpen()
                        else onClose();
                    }
                }
            />
            <Box pl="30%" p={3}>
                <Image src={Logo.src} alt="Logo" width="64px" height="64px"></Image>
            </Box>
            <Text fontFamily={"Ropa Sans"} fontSize="32px"> Babylonia.app</Text>
        </HStack>
    )
}

export default Header