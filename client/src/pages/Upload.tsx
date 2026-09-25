
import {  useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";

import {
    FiUploadCloud,
    FiFolder,
    FiShield,
    FiZap,
    FiLink,
    FiX,
} from "react-icons/fi";
import api from '../api/callApi.ts';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.tsx";


const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const Upload = () => {
    // const {loading,setLoading} = useContext(CommonContext)
    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [maxDownloadCounts, setMaxDownloadCounts] = useState("")

    // Validate and store the selected file
    const handleFile = async (selectedFile?: File) => {
        if (!selectedFile) return;

        if (selectedFile.size > MAX_FILE_SIZE) {
            alert("File size must be 20 MB or less.");
            return;
        }

        setFile(selectedFile);

    };

    // Handle file selection through the file picker
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        handleFile(selectedFile);
    };

    // Handle dragging a file over the upload area
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    // Handle leaving the upload area
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    // Handle dropping a file into the upload area
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files?.[0];
        handleFile(droppedFile);
    };

    // Open the native file picker
    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    // Remove the selected file
    const removeFile = () => {
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Convert bytes into a readable file size
    const formatSize = (bytes: number): string => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const uploadFile = async () => {
        try {
            // if(!conetxt) throw new Error("no conetxt")
            setLoading(true)
            if (!file) {
                alert("Please provide a file first")
                return
            }

            if(!maxDownloadCounts){
                toast.error("Download count is not provided")
                return
            }
            const formData = new FormData()
            // console.log(file)
            formData.append("file", file)
            formData.append("maxDownloads", maxDownloadCounts)
            const res = await api.post('/api/v1/upload', formData)
            // console.log(res)
            if (res.data?.success) {
                toast.success(res.data?.message)
                navigate(`/download/${res.data?.uploadedSaveFile?.transferId}`)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (

        <>
        {loading && <Loading/>}
            <div className="pt-20 min-h-screen bg-linear-to-br from-indigo-50 via-white to-violet-50 px-4 py-12 text-slate-900">
                <div className="mx-auto max-w-5xl">

                    {/* Header */}
                    <header className="mb-12 text-center">
                        {/* <div className="mb-12 flex items-center justify-center gap-3">
                        <FiUploadCloud className="text-4xl text-indigo-600" />

                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Drop<span className="text-indigo-600">Vault</span>
                        </h1>
                    </div> */}

                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Upload your file
                        </h2>

                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-500">
                            Securely share your files with a link.
                            Simple, fast, and protected.
                        </p>
                    </header>

                    {/* Upload card */}
                    <div className="rounded-4xl border border-white bg-white/80 p-4 shadow-xl shadow-indigo-100/60 backdrop-blur sm:p-6">
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex min-h-85 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-12 text-center transition ${isDragging
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/40"
                                }`}
                        >
                            {file ? (
                                <>
                                    {/* Selected file */}
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                        <FiFolder className="text-3xl" />
                                    </div>

                                    <h3 className="max-w-full break-all text-xl font-bold">
                                        {file.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        {formatSize(file.size)}
                                    </p>

                                    <label

                                        className="block text-sm font-semibold text-gray-700"
                                    >
                                        Download limit
                                    </label>

                                    <select
                                        name="downloadCount"
                                        id="downloadCount"
                                        value={maxDownloadCounts}
                                        onChange={(e) => setMaxDownloadCounts(e.target.value)}
                                        className="w-50 text-center appearance-none rounded-xl border border-gray-300
                                            bg-white px-4 py-3 pr-10 text-sm text-gray-700 shadow-sm
                                            outline-none transition duration-200
                                            hover:border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    >
                                        <option value="">
                                            Select download count
                                        </option>
                                        <option value="3">3 downloads</option>
                                        <option value="5">5 downloads</option>
                                        <option value="10">10 downloads</option>
                                    </select>

                                    <p className="text-xs text-gray-500">
                                        Choose how many times recipients can download your file.
                                    </p>


                                    <div className="flex gap-20">
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                        >
                                            <FiX />
                                            Remove file
                                        </button>

                                        <button
                                            type="button"
                                            onClick={uploadFile}
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
                                        >
                                            <FiUploadCloud />
                                            upload file
                                        </button>
                                    </div>


                                </>
                            ) : (
                                <>
                                    {/* Empty upload state */}
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                        <FiUploadCloud className="text-5xl" />
                                    </div>

                                    <h3 className="text-2xl font-bold">
                                        Drag &amp; drop your file here
                                    </h3>

                                    <p className="mt-3 text-slate-500">
                                        or click below to browse your files
                                    </p>

                                    <button
                                        type="button"
                                        onClick={openFilePicker}
                                        className="mt-7 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
                                    >
                                        <FiFolder className="text-xl" />
                                        Choose File
                                    </button>

                                    <p className="mt-5 text-sm text-slate-400">
                                        Supports all file types · Max file size: 20 MB
                                    </p>
                                </>
                            )}

                            {/* Hidden native file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="flex items-center justify-center gap-3">
                            <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                                <FiShield className="text-xl" />
                            </div>

                            <div>
                                <h4 className="font-semibold">Secure</h4>
                                <p className="text-sm text-slate-500">
                                    Protected file access
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                                <FiZap className="text-xl" />
                            </div>

                            <div>
                                <h4 className="font-semibold">Fast</h4>
                                <p className="text-sm text-slate-500">
                                    Direct file transfer
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                                <FiLink className="text-xl" />
                            </div>

                            <div>
                                <h4 className="font-semibold">Simple</h4>
                                <p className="text-sm text-slate-500">
                                    Share with a link
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mx-auto mt-12 max-w-2xl space-y-4 text-center text-base italic leading-8 text-slate-500">
                        <p>
                            DropVault is designed to make sharing files simple.
                            Choose a file, set your sharing options, and share
                            the generated link with the recipient.
                        </p>

                        <p>
                            Our mission is to help people share files while
                            keeping control over access and expiration.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;