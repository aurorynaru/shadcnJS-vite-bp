import React from 'react'

import { ChevronRight, File, Folder, MoveLeft } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub
} from '@/components/ui/sidebar'
import CollapseContent from './CollapseContent'
import { sortArr } from '../utils/utils'
import NonCollapse from './NonCollapse'

const SideBarMain = ({ items, name, open, removeProj }) => {
    return (
        <SidebarGroup className='text-xs'>
            <SidebarGroupLabel className='mb-2'>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-base'>{name}</span>
                    <button
                        onClick={() => {
                            removeProj({})
                            open(false)
                        }}
                        className='border-none focus:border-none focus-visible:border-none'
                    >
                        <MoveLeft className='text-sm  ' />
                    </button>
                </div>
            </SidebarGroupLabel>
            <SidebarMenu className='list-none '>
                {items.map((item) => {
                    if (item.type === 'dir') {
                        return <CollapseContent key={item.name} item={[item]} />
                    } else {
                        return <NonCollapse key={item.name} item={item} />
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default SideBarMain
