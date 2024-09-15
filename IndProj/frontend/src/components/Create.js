import React from 'react'
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MySelect from './forms/MySelect'
import MyDatePicker from './forms/MyDatePicker'
import { useForm }  from 'react-hook-form'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()

  const defaultValues = {
    name: '',
    comments: '',
    status: '',
    start_date: null,
    end_date: null,
  }

  const { handleSubmit, control } = useForm({ defaultValues })

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");
    axios.post('http://localhost:8000/project/', {
      name: data.name,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    })
    .then((res) => {
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
    });
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
            Create Form
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField label='Name' name='name' control={control} placeholder='Provide Proj name' width='30%' />
            <MyDatePicker label='Start Date' name='start_date' control={control} width={'30%'} />
            <MyDatePicker label='End Date' name='end_date' control={control} width='30%' />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <MyMultilineField label='Comments' name='comments' control={control} placeholder='Provide Proj comments' width='30%' />
            <MySelect label='Status' name='status' control={control} width={'30%'} />
            <Box sx={{ width: '30%' }}>
              <Button variant='contained' type='submit' sx={{ width: '100%' }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default Create
