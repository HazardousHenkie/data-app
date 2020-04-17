import { createContext } from 'react'

interface DrawerContextInterface {
    openDrawer: boolean
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerContext = createContext<DrawerContextInterface>({
    openDrawer: false,
    setOpenDrawer: (): void => {}
})

export default DrawerContext
