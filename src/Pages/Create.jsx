import React from 'react'
import { Box,FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
  FormErrorMessage,
  FormHelperText, } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const InitialStates = {
  title: '',
  price : '',
  image : '',
}

function Create() {

  const Nav = useNavigate()

  const [formdata, setFormData] = React.useState(InitialStates);
  
  
  const handleChange = (e)=>{
     const { name} = e.target
     setFormData((oldState)=>{return{
      ...oldState,
      [name] : e.target.value
     }})
  }
   
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let Response = await axios.post('http://localhost:8080/Products',{
        title : formdata.title, 
        price : formdata.price,
        image : formdata.image,
      })
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
    Nav('/');
  }  

const handleHome = ()=>{
    Nav('/');
  }
  

  return (
    <Box boxShadow='lg' p='2' bg='white' rounded={10}  width="400px" height="auto" margin="auto" p={5} mt={10}>
      <Heading align="center" p={5}>ADD PRODUCTS</Heading>
      <form onSubmit={handleSubmit}>
      <FormControl isRequired>
          <FormLabel>Item name</FormLabel>
           <Input 
           type="text"
           name="title"
           onChange={handleChange}
           placeholder='Item name' />
          <br /><br />
      <FormLabel>Item Price</FormLabel>
          <Input
           type="number"
           name="price"
           onChange={handleChange} 
          placeholder='Item Price' />
         <br /><br />
      <FormLabel>Item image</FormLabel>
        <Input
          type="text"
          name="image"
          onChange={handleChange}
        placeholder='Item image' />
         <br /><br />
         <Flex justify="space-between" align="center" p={2} >
         <Button type="submit" value="submit" colorScheme='blue' pl={5} pr={5}>ADD</Button>
         <Button colorScheme='blue' pl={5} pr={5} onClick={handleHome} >HOME</Button>
         </Flex>
      </FormControl>
      </form>
    </Box>
  )
}

export default Create