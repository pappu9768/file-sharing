import { FiLink, FiCopy, FiDownload, FiAlertTriangle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/callApi.ts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Download = () => {

    const navigate = useNavigate()
    const { transferId } = useParams<{ transferId: string }>()
    const [url, setUrl] = useState<string>('')
    useEffect(() => {

        const getUrl = async () => {
            try {
                console.log(transferId)
                const result = await api.get(`/api/v1/download/${transferId}`)
                console.log(result)
                setUrl(result.data.getUrl)
            } catch (error) {
                console.error("Download API error:", error);

                const message =
                    error?.response?.data?.message ||
                    "Unable to generate download link";

                toast.error(message);

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        }
        getUrl()
    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Copied!!")
        } catch (error) {
            console.log(error)
            toast.error("Error")
        }

    };

    const handleDownload = () => {
        // Connect your download API here
        console.log("Download clicked");
        try {
            if (!url) return toast.error("Please provide link first")

            window.location.href = url
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>

            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-violet-50 px-4 pt-20 pb-12">

                <div className="mx-auto flex min-h-150 max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row">

                    {/* Left side */}
                    <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-12">

                        <div className="w-full max-w-lg text-center">

                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                <FiLink size={32} />
                            </div>

                            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                                Download link
                            </h1>

                            {/* Share URL */}
                            <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">

                                <span className="flex-1 truncate text-left text-sm text-slate-500">
                                    {url}
                                </span>

                                <button
                                    onClick={handleCopy}
                                    className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-100"
                                    title="Copy link"
                                >
                                    <FiCopy size={20} />
                                </button>

                            </div>

                            {/* Download button */}
                            <button
                                onClick={handleDownload}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                <FiDownload size={20} />
                                Download
                            </button>

                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex w-full items-center bg-indigo-50 p-6 md:w-1/2 md:p-12">

                        <div className="w-full">

                            <h2 className="mb-8 text-3xl font-bold leading-snug text-slate-900">
                                Now sharing your files directly from your device
                            </h2>

                            {/* Warning message */}
                            <div className="flex gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">

                                <FiAlertTriangle
                                    size={24}
                                    className="mt-1 shrink-0 text-amber-500"
                                />

                                <div>
                                    <h3 className="mb-2 font-semibold text-slate-900">
                                        Please note:
                                    </h3>

                                    <p className="text-sm leading-6 text-slate-600">
                                        Closing this page means you stop sharing! Simply keep this
                                        page open in the background to keep sharing.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Download;