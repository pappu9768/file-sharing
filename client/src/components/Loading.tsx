

const Loading = () => {
    return (
        <>
            <div className="fixed inset-0 bg-black/60 blackdrop-blur-sm flex items-center justify-center z-50">

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl font-semibold mt-4">Please wait...</p>
                </div>

            </div>
        </>
    )
}

export default Loading