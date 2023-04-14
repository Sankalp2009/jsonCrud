import React, { useCallback, useMemo, useState, useEffect } from 'react';
import useSwr from 'swr';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Spinner,
  Stack,
  Heading,
  Text,
  Image,
  Grid,
  Divider,
  Button,
  ButtonGroup,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@chakra-ui/react';

function Home() 
{
  const Nav = useNavigate();

  const fetcher = useMemo(() => (...args) => {
    return fetch(...args).then(res => res.json());
  }, []);

  const { data, isLoading } = useSwr(`http://localhost:8080/Products`, fetcher);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleUpdate = useCallback((id) => {
    Nav(`/edit/${id}`);
  }, [Nav]);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:8080/Products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  }, [products]);

  if (isLoading) {
    return (
      <Box>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='red.500'
          size='xl'
        />
      </Box>
    );
  }
  return (
    <Box m="auto" p={20} >
      <Grid templateColumns='repeat(4, 2fr)' templateRows="auto"  gap={6}>
          {
            products?.map((el)=>
            <Box key={el.id} >
               <Card boxShadow='md' p='2' bg='whitesmoke' height="400px" >
            <CardBody>
              <Image
                src={el.image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                width={"200px"}
                height={"150px"}
              />
              <Stack mt='6' spacing='3'>
                <Heading size='sm'>{el.title}</Heading>
                <Text color='blue.600' fontSize='2xl'>
                  ${el.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button onClick={()=>handleUpdate(el.id)} variant='solid' colorScheme='teal'>
                  Edit
                </Button>
                <Button onClick={()=>handleDelete(el.id)} variant='solid' colorScheme='red'>
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
            </Box>
            )
          }  
      </Grid>
    </Box>
  )
}

export default Home