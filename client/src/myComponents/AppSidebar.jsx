import React from 'react'

import {
    BookOpen,
    Bot,
    Settings2,
    SquareTerminal,
    File,
    Folder
} from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    SidebarRail
} from '@/components/ui/sidebar'
import SideBarMain from './SideBarMain'
import { sortArr } from '../utils/utils'

const AppSidebar = ({ removeProj, open, project, name }) => {
    return (
        <div>
            <SidebarProvider>
                <Sidebar collapsible='icon'>
                    <SidebarHeader></SidebarHeader>
                    <SidebarContent>
                        <SideBarMain
                            removeProj={removeProj}
                            open={open}
                            items={sortArr(project.contents)}
                            name={name}
                        />
                    </SidebarContent>
                    <SidebarFooter></SidebarFooter>
                </Sidebar>
            </SidebarProvider>
        </div>
    )
}

export default AppSidebar
