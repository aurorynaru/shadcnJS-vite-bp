import { ThemeProvider } from '@/components/Theme-provider'
import Home from './Pages/Home'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-20'>
                <Home />
            </div>
        </ThemeProvider>
    )
}

export default App
