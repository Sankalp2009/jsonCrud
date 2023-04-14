import React from 'react'
import {Link} from 'react-router-dom'
import { Box,Flex,Heading,Button,Spacer } from '@chakra-ui/react'

function Header() {
  return (
    <Box boxShadow='lg' p='2' bg='#0b1120'h="60px">
       <Flex justify="space-between" alignItems={"center"}>
          <Box color="#e0e6ee">
            <Heading>CRUD</Heading>
          </Box>
          <Box>
           <Link to={"/add"}><Button bgGradient='linear(to-l, #7928CA, #FF0080)' size='md' pl="8" pr="8" >Add</Button></Link> 
          </Box>
       </Flex>
    </Box>
  )
}
export default Header