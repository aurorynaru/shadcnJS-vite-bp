import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle
} from '@headlessui/react'
import CodeComponent from './CodeComponent'
import AppSidebar from './AppSidebar'

const ModalComponent = ({ ...props }, Children) => {
    // console.log(props.markdownContent)
    console.log(props.project)
    console.log(props.name)
    return (
        <>
            {/* <Button
                variant='secondary'
                onClick={() => {
                    props.setIsOpen(true)
                }}
            >
                Show code
            </Button> */}
            <Dialog
                open={props.isOpen}
                onClose={() => {
                    props.setSelectedProj({})
                    props.setIsOpen(false)
                }}
                className='relative z-50 w-max'
            >
                <div className='fixed flex-col inset-0 flex w-screen items-center justify-center  '>
                    <DialogPanel
                        className='w-full  space-y-4 border bg-current flex flex-col items-center justify-center  '
                        style={{
                            background: `#020818`
                        }}
                    >
                        <div className='w-full flex items-end justify-end'>
                            <span
                                className='w-7 h-7 rounded-full bg-inherit cursor-pointer text-center font-thin border-2 hover:border-slate-600'
                                onClick={() => {
                                    props.setSelectedProj({})
                                    props.setIsOpen(false)
                                }}
                            >
                                X
                            </span>
                        </div>
                        <ScrollArea className='h-full w-full rounded-md '>
                            {/* <DialogTitle className='font-bold'>
                                {props.name}
                            </DialogTitle> */}
                            {/* <Description>description</Description> */}
                            <div className='prose flex justify-center items-center'>
                                {props.project && (
                                    <div className='flex justify-center items-center w-full'>
                                        <div className='w-2/6'>
                                            <AppSidebar
                                                removeProj={
                                                    props.setSelectedProj
                                                }
                                                open={props.setIsOpen}
                                                project={props.project}
                                                name={props.name}
                                            />
                                        </div>

                                        <div className='w-4/6'></div>
                                        {/* <CodeComponent
                                            markdownContent={
                                                props.markdownContent
                                            }
                                        /> */}
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ModalComponent
