import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="h-[calc(100vh-42px)]">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
