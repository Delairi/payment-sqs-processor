import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Loader from "../components/Loader"
import useStore from "../store"

const MainLayout = () => {
    const { isLoading } = useStore()
    return (
        <div className="flex flex-col h-screen">
            {
                isLoading && <Loader />
            }
            <Header />
            <div className="h-[calc(100vh-42px)] bg-[#f7f7f7]">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
