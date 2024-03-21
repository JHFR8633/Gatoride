"use client"

export const DateSelector = () => {

    const debug_response = (e) => {
        e.preventDefault();

        const formData = {
            "start_date": e.target.start_date.value,
            "end_date": e.target.end_date.value
        };

        console.log(formData)
    }

    return (
        <div className="rounded-lg border border-gray-200 p-4 flex items-center justify-center">
            <form className="flex flex-1" onSubmit={debug_response}>
                <Date className="flex flex-col mr-5" name="start_date"> Start Date </Date>
                <Date className="flex flex-col ml-5 mr-5" name="end_date"> End Date </Date>
                <button className="rounded-lg bg-gray-800 text-white px-4 py-2 hover:bg-gray-900 ml-5" type="submit">
                     Search
                </button>
            </form>
        </div>
    )
}

const Date = ({className, children, name}) => {
    return (
        <div className={className}>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400" htmlFor="start-date"> {children} </label>
                <input className="max-w-lg flex-1" placeholder="Start Date" type="date" name={name}/>
        </div>
    )
}
    