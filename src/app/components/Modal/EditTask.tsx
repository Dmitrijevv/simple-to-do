"use client"
import { Button, Drawer, Group, Input, Loader, Modal, Select, Textarea, useModalsStack } from '@mantine/core'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ITasks, useListName, useTasks } from '../../../../store'
import { modals } from '@mantine/modals';
import { Edit } from 'lucide-react'

interface Iid {
  task: ITasks
}
const EditTask = ({ task }: Iid) => {
  const { updateTask } = useTasks()
  const { listName } = useListName()
  const [value, setValue] = useState<string | null>('');
  const [priority, setPriority] = useState<string | null>('');
  const stack = useModalsStack(["modal", "confirm-action"])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITasks>()

  const onSubmit: SubmitHandler<ITasks> = (data) => {
    console.log(data, "submit")
    updateTask(task.id as number, {
      ...data,
      id: task.id,
      title: data.title,
      description: data.description,
      listName: value as string || task.listName,
      priority: priority as string || task.priority,
      updatedAt: new Date(),
      idList: listName.find(item => item.name === value)?.id as number || task.idList
    })
    reset()
    stack.closeAll()
  }
  
  const selectData = listName.map(item => ({
    value: item.name as string,   // Або використовуйте item.name, якщо хочете використовувати назву як значення
    label: item.name as string  // Назва елемента
  }))

  const priorityData = ["low", "medium", "high"]
  
  if(selectData == undefined) return <div><Loader/></div>
  if(!task) return <div>Loading...</div>

  return (


    <div>

      <Drawer {...stack.register('modal')} title="Edit task">
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className='text-md text-gray-800 font-bold'>Title</p>
            <Input
              {...register('title', { required: true })}
              placeholder="Task title"
              defaultValue={task?.title || ''}
            />
            {errors.title && <p>Title is required</p>}
          </div>

          <div className='mt-2'>
            <p className='text-md text-gray-800 font-bold'>Description</p>
            <Textarea
              {...register('description', { required: true })}
              placeholder="Task description"
              defaultValue={task?.description}
            />
            {errors.description && <p>Description is required</p>}
          </div>
          <Select
            label="Priority"
            placeholder="Select priority"
            data={priorityData}
            onChange={setPriority}
            defaultValue={task?.priority}
          />
          <Select
            label="Collomn"
            placeholder="Select collomn"
            data={selectData}
            onChange={setValue}
            defaultValue={task?.listName}
          />
          <Button disabled={task.priority == "" && task.listName == "" } variant='filled' className='cursor-pointer mt-5' type='submit'>Save</Button>
        </form>
      </Drawer>
      <button
        className='px-1'
        onClick={() => stack.open('modal')}
      >
        <Edit color='grey' size={16} />
      </button>
    </div>
  )
}

export default EditTask
