"use client"

import React, { useState } from 'react'
import { Badge, Button, Card, Drawer, Input, Loader, Modal, useModalsStack } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'

import { IListName, ITaskList, useListName, useTasks } from '../../../../store'
import { cn } from '../../../../lib/utils'
import { CalendarIcon, CheckCircle2, Circle, Edit, Edit2, Plus, Trash2 } from "lucide-react"
import CreateNewTask from '../Modal/CreateNewTask'
import { SubmitHandler, useForm } from 'react-hook-form'
import EditTask from '../Modal/EditTask'
import DeleteTask from '../Modal/DeleteTask'

// {list.list.name}
//         <p>Total tasks: {tasks.length}</p>
//       <p>Completed tasks: {tasks.filter(task => task.completed).length}</p>
//       <p>Not complete tasks: {tasks.filter(task =>!task.completed).length}</p>

interface ListProps {
  list: IListName
}

const List = (list: ListProps) => {
  const { tasks } = useTasks()
  const { updateList } = useListName()
  const [edit, setEdit] = useState<number | null>()

  const filter = tasks.filter(task => task.idList === list.list.id)
  console.log(filter, "filter")


  const priorityColors = {
    low: "green",
    medium: "yellow",
    high: "red",

  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IListName>()
  const onSubmit: SubmitHandler<IListName> = (data) => {
      updateList(list.list.id as number, { ...data, id: list.list.id })
      reset()
      setEdit(null)
    }

    if(!filter) return <Loader/>
  return (
    <div className='h-screen overflow-auto '>
      <CreateNewTask />
      <div>

        {!edit
          ?
          <div className='flex text-center p-2 '>
            <div className='w-full'>{list.list.name}</div>
            <button className='cursor-pointer' onClick={() => setEdit(list.list.id)}><Edit2 color='grey' size={16} /></button></div>
          :
          <div>
            {edit === list.list.id ? <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex'>
                <input 
                defaultValue={list.list.name} 
                className=' ml-2 p-1 w-full bg-[#424242]'
                {...register('name', { required: true })}
                />
                <button className='cursor-pointer' type='submit'><Plus color='white' size={16} /></button>
              </form>
            </div> :

              <div className=''>



              </div>

            }
          </div>}

      </div>
      <div className='p-2 w-full min-h-[70px] bg-[]'>
        {filter.map((task) => (<div className='mt-2' key={task.id}>
          <Card className="w-full transition-all">
            <Card.Section className="p-4 pb-0">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-1">
                  <h3>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                </div>
                <Badge color={priorityColors[task.priority as keyof typeof priorityColors ?? "low"]}>{(task.priority ?? "low").charAt(0).toUpperCase() + (task.priority ?? "low").slice(1)}</Badge>
              </div>
            </Card.Section>
            <div className='flex mt-5 items-center'>
              <div className=" w-full ">
                {task.createdAt && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon size={16} className="mr-1 h-3.5 w-3.5" />
                    <span>Due {formatDate(task.createdAt)}</span>
                  </div>
                )}
                {task.updatedAt && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon size={16} className="mr-1 h-3.5 w-3.5" />
                    <span>Updated {formatDate(task.updatedAt)}</span> 
                  </div>
                )}
              </div>
              <div className="flex  justify-end items-center gap-2 ">
                <div className='mt-1 cursor-pointer'><EditTask task={task}/></div>
                <div><DeleteTask id={task.id as number}/></div>
              </div>
            </div>
          </Card>
        </div>))}

      </div>

    </div>
  )
}

export default List
