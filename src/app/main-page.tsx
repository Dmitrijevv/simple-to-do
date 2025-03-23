"use client"

import React, { useState } from 'react'
import List from './components/todo/List'
import { IListName, useListName } from '../../store'
import { Button, useModalsStack } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

const MainPage = () => {
  const { listName, addList } = useListName()
  const stack = useModalsStack(['modal']);
  const { register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IListName>()

  const onSubmit: SubmitHandler<IListName> = (data) => {
    if(listName.find(item => item.name === data.name)){
      alert("Task with this name already exists in this list")
      return
    }
    addList({
      id: listName.length + 1,
      name: data.name,
      label: data.name
    })
    reset()
  }

  return (
    <div className=''>
      <div className='ml-10'>
          <form onSubmit={handleSubmit(onSubmit)} 
          className='flex mt-10 items-center'>
            <input type="text" placeholder='Enter list name' {...register("name", { required: true })} />
            <div>{errors.name && <p>Name is required</p>}</div>
            <button className=''  type="submit"><Plus color='white' size={16}/></button>
          </form>
      </div>
      <div className='p-5 overflow-x-auto '>
        {!listName.length
          ?
          ""
          :
          <div className='flex '>{listName.map((list) => (
            <div key={list.id} className='min-w-[300px] max-w-[300px] bg-[#183535] mt-5 ml-2 '>
                <List list={list}/>
                {list.id}
              <div>
                
                </div>
            </div>
          ))}</div>}

      </div>
      
    </div>
  )
}

export default MainPage
