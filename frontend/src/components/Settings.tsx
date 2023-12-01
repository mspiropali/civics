import { useState, Fragment } from 'react';
import { HiCog } from "react-icons/hi2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

interface Props {
    handleThemeSwitch: () => void
}
const Settings = ({ handleThemeSwitch }: Props) => {


    return (
        <>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-row justify-center items-center'>
                        
                    </div>
                </DialogContent>
            </Dialog>
            {/* <div className="inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="flex flex-row items-center"
                >
                    <HiCog size={'1.5em'}/>
                    Settings
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="relative flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl
                                 bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border-slate-300 border-2
                                 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Settings
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <button type="submit" className=" p-4  dark:bg-black dark:text-gray-100 rounded-2xl"
                                            onClick={handleThemeSwitch}>
                                            Toggle Dark Mode
                                        </button>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </>
    )
}

export default Settings



