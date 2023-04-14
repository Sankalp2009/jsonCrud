import React from 'react'
import { Box,FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
  FormErrorMessage,
  FormHelperText, } from '@chakra-ui/react'
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios'
const InitialStates = {
  title: '',
  price : '',
  image : '',
}

function Update() {
const Nav = useNavigate()
  const {id} = useParams()
  console.log(id);

  const [formdata, setFormData] = React.useState(InitialStates);
  const [data, setData] = React.useState("")

  React.useEffect(()=>{
    const loadData = async()=>{
      try {
        let Response = await axios.get(`http://localhost:8080/Products/${id}`)
        console.log(Response.data);
        setData(Response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData()
  },[])

  const handleChange = (e)=>{
     const { name} = e.target
     setFormData((oldState)=>{return{
      ...oldState,
      [name] : e.target.value
     }})
  }

   const {title, price,image} = formdata;

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let Response = await axios.put(`http://localhost:8080/Products/${id}`,{
        title, 
        price,
        image,
      })
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
    Nav('/')
  }

//   const handlePatchChange = (e)=>{
//     const { name} = e.target
//     setFormUpdate((oldState)=>{return{
//      ...oldState,
//      [name] : e.target.value
//     }})
//  }

// const handleUpdate = async(e)=>{
//     e.preventDefault();
//     try {
//       let res =  await axios.patch(`http://localhost:8080/Products/${id}`,{
//         title : formupdate.title, 
//         price : formupdate.price,
//         image : formupdate.image,
//       })
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   } 

const handleHome = ()=>{
    Nav('/');
  }
  
  return (
    <Box>
     <Flex justify="space-around" align="center" gap="10px">
      <Box boxShadow='lg' p='2' bg='white' rounded={10}  width="400px" height="auto" margin="auto" p={5} mt={10}>
      <Heading align="center" p={3}>UPDATE PRODUCTS</Heading>
      <form onSubmit={handleSubmit}>
      <FormControl>
          <FormLabel>Item name</FormLabel>
           <Input 
           type="text"
           name="title"
           onChange={handleChange}
           placeholder={data.title} />
          <br /><br />
      <FormLabel>Item Price</FormLabel>
          <Input
           type="number"
           name="price"
           onChange={handleChange} 
          placeholder={data.price} />
         <br /><br />
      <FormLabel>Item image</FormLabel>
        <Input
          type="text"
          name="image"
          onChange={handleChange}
        placeholder='Item image' />
         <br /><br />
         <Button type="submit" value="submit" colorScheme='blue' pl={5} pr={5}>PUT</Button>
      </FormControl>
      </form>
      </Box>
      {/* <Box boxShadow='lg' p='2' bg='white' rounded={10}  width="400px" height="auto" margin="auto" p={5} mt={10}>
      <Heading align="center" p={3}>UPDATE PRODUCTS</Heading>
      <form onSubmit={handleUpdate}>
      <FormControl>
          <FormLabel>Item name</FormLabel>
           <Input 
           type="text"
           name="title"
           onChange={handlePatchChange}
           placeholder={data.title} />
          <br /><br />
      <FormLabel>Item Price</FormLabel>
          <Input
           type="number"
           name="price"
           onChange={handlePatchChange} 
          placeholder={data.price} />
         <br /><br />
      <FormLabel>Item image</FormLabel>
        <Input
          type="text"
          name="image"
          onChange={handlePatchChange}
        placeholder='Item image' />
         <br /><br />
         <Button type="submit" value="submit" colorScheme='blue' pl={5} pr={5}>PATCH</Button>
      </FormControl>
      </form>
      </Box> */}
     </Flex>
    </Box>
  )
}
export default Update