"use client"
import { Button, Drawer, Input, Loader, Select, Textarea, useModalsStack } from '@mantine/core'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ITasks, useListName, useTasks } from '../../../../store'
import { modals } from '@mantine/modals';

const CreateNewTask = () => {
  const { tasks, addTask } = useTasks()
  const { listName } = useListName()
  const [value, setValue] = useState<string | null>('');
  console.log(value, "value")
  const [priority, setPriority] = useState<string | null>('');
  const stack = useModalsStack(["modal"])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITasks>()


  const onSubmit: SubmitHandler<ITasks> = (data) => {
    
    addTask({
      id: tasks.length + 1,
      title: data.title,
      completed: false,
      listName: value as string,
      createdAt: new Date(),
      priority: priority === "" ? "low" : priority as string,
      description: data.description,
      idList: listName.find(item => item.name === value)?.id as number
    })
    reset()
    stack.closeAll()
  }
  const selectData = listName.map(item => ({
    id: item.id,
    value: item.name as string,   // Або використовуйте item.name, якщо хочете використовувати назву як значення
    label: item.label as string  // Назва елемента
  }))

    if(selectData == undefined) return <div><Loader/></div>
  return (

    <div>

      <Drawer {...stack.register('modal')} title="Create new task">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className='text-md text-gray-800 font-bold'>Title</p>
            <Input
              {...register('title', { required: true })}
              placeholder="Task title"
            />
            {errors.title && <p>Title is required</p>}
          </div>

          <div className='mt-2'>
            <p className='text-md text-gray-800 font-bold'>Description</p>
            <Textarea
              {...register('description', { required: true })}
              placeholder="Task description"
            />
            {errors.description && <p>Description is required</p>}
          </div>
          <Select
            label="Priority"
            placeholder="Select priority"
            data={["low", "medium", "high"]}
            onChange={setPriority}
          />
          <Select
            label="Collomn"
            placeholder="Select collomn"
            data={selectData}
            onChange={setValue}
          />
          <Button disabled={value == "" && priority == ""} variant='filled' className='cursor-pointer mt-5' type='submit'>Add task</Button>
        </form>
      </Drawer>
      <Button fullWidth variant='transparent' color='while' onClick={() => stack.open('modal')} className='cursor-pointer bg-[#454545]'>
        Add task
      </Button>
    </div>
  )
}

export default CreateNewTask
