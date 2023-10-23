
const Actions = () => {
    return (
        <div className="w-72 h-96  flex flex-row flex-wrap gap-2 p-2 items-start justify-start rounded-md overflow-hidden
    bg-slate-100 dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <h1 className="text-xl font-semibold h-8">Actions</h1>

            <div className="flex flex-row flex-wrap gap-2 justify-between">
                <button className="grid basis-full h-8 rounded-md overflow-hidden items-center justify-center text-xl
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    Emergency Events
                </button>
                <button className="grid flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-xl
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    Sensors
                </button>
                <button className="grid flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-lg
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    Safety Points
                </button>
                <button className="grid flex-2 h-8 w-32 rounded-md overflow-hidden items-center justify-center text-md
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    Evacuation Plan
                </button>
                <button className="grid flex-2 h-8 w-32  rounded-md overflow-hidden items-center justify-center text-lg
            bg-white dark:bg-blue-950 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    Fleet Control
                </button>
            </div>

            <div className="overflow-y-hidden hover:overflow-y-scroll w-full max-h-48">
                <table className="table-auto text-left w-64">
                    <thead className="sticky top-0">
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Severity</th>
                            <th>ETA</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-hidden hover:overflow-y-scroll mt-10">
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Event 1</td>
                            <td className="text-sm">Malcolm </td>
                            <td className="text-sm">1961</td>
                            <td className="text-sm">1961</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Event 2</td>
                            <td className="text-sm">Eagles</td>
                            <td className="text-sm">1972</td>
                            <td className="text-sm">1972</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Event 3</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                        <tr className="border-b-2 border-slate-300 hover:border-slate-500">
                            <td className="text-sm">Shining</td>
                            <td className="text-sm">Earth </td>
                            <td className="text-sm">1975</td>
                            <td className="text-sm">1975</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Actions