import React from 'react'
import { File, Folder, ChevronRight } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '@/components/ui/sidebar'
import SideBarMain from './SideBarMain'
import NonCollapse from './NonCollapse'
import { sortArr } from '../utils/utils'

const CollapseContent = ({ ...props }) => {
    const collapseMenu = (data) => {
        if (data.type === 'dir') {
            return (
                <Collapsible
                    key={data.name}
                    asChild
                    className='group/collapsible list-none '
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={data.name}>
                                {data.type === 'file' ? <File /> : <Folder />}
                                <span>{data.name}</span>
                                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {sortArr(data.content).map((item) => {
                                    if (item.type === 'dir') {
                                        return collapseMenu(item)
                                    } else {
                                        return (
                                            <NonCollapse
                                                key={item.id || item.name}
                                                item={item}
                                            />
                                        )
                                    }
                                })}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            )
        } else {
            return <NonCollapse key={data.name} item={data} />
        }
    }
    return (
        <>
            {sortArr(props.item).map((item) => {
                return collapseMenu(item)
            })}
        </>
    )
}

export default CollapseContent
