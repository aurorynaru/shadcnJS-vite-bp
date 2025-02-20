import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppSidebar from './AppSidebar'
import CodeComponent from './CodeComponent'

const ModalExecute = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <>
                    <AppSidebar project={props.project} name={props.name} />
                    <CodeComponent markdownContent={props.markdownContent} />
                </>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            props.setSelectedProj(null)
                            props.setIsOpen(false)
                        }}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalExecute
