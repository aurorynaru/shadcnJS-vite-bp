import React from 'react'
import { File, Folder } from 'lucide-react'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
const NonCollapse = React.memo(({ item }) => {
    return (
        <SidebarMenuItem key={item.id || item.name} className='list-none'>
            <SidebarMenuButton tooltip={item.name}>
                {item.type === 'file' ? <File /> : <Folder />}
                <span className='text-sm '>{item.name}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
})

export default NonCollapse
