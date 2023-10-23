import DateTime from "./DateTime"
import Logo from "./Logo"
import Settings from "./Settings"
import Weather from "./Weather"
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

interface Props {
    handleThemeSwitch: () => void
}

const Topbar = ({ handleThemeSwitch }: Props) => {
    return (
        <div className="absolute inset-x-0 top-0 h-12 flex items-center justify-between px-2
        bg-slate-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 
        dark:bg-black dark:text-gray-100">
            <DateTime />
            <Logo />
            <div className="flex flex-row items-center justify-around w-96">
                <Weather />
                <Settings handleThemeSwitch={handleThemeSwitch} />
                <button type="submit" className=" flex flex-row items-center p-4  dark:bg-black dark:text-gray-100 rounded-2xl">
                    <HiOutlineArrowLeftOnRectangle size={'1.4em'}/>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Topbar