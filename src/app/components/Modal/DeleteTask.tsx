"use client"
import { Button, Drawer, Group, Input, Modal, Select, Textarea, useModalsStack } from '@mantine/core'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ITasks, useListName, useTasks } from '../../../../store'
import { modals } from '@mantine/modals';
import { Edit, Trash2 } from 'lucide-react'

interface Iid {
  id: number
}
const DeleteTask = ({ id }: Iid) => {
  const { removeTask } = useTasks()
  const stack = useModalsStack(["confirm-action"])
  return (
    <div>
      <Modal {...stack.register('confirm-action')} title="Delete this task?">
          Are you sure you want to delete this task? This action cannot be undone.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => removeTask(id)} color="red">
              Delete
            </Button>
          </Group>
        </Modal>
      <button
        className='px-1'
        onClick={() => stack.open('confirm-action')}
      >
        <Trash2 color='red' size={16} />
      </button>
    </div>
  )
}

export default DeleteTask
