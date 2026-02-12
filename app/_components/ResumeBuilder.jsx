"use client";
import { dummyResumeData } from "@/public/assets";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import PersonalInfoForm from "./PersonalInfoForm";
import ResumePreview from "./ResumePreview";
import TemplateSelector from "./TemplateSelector";
import ColorPicker from "./ColorPicker";
import ProfessionalSummaryForm from "./ProfessionalSummaryForm";
import ProfessionalExperienceForm from "./ProfessionalExperienceForm";
import ProfessionalEducationForm from "./home/ProfessionalEducationForm";
import Projects from "./Projects";
import SkillsForm from "./SkillsForm";
import { useSelector } from "react-redux";
import api from "../_configs/api";
import toast from "react-hot-toast";


const ResumeBuilder = ({ resumeId }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);


    const token = useSelector(state => state.auth)

    const [resumeData, setResumeData] = useState({
        id: "",
        title: "",
        personal_info: {},
        professional_summarysummary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    });



    const sections = [
        { id: "personal_info", name: "Personal Info", icon: User },
        { id: "professional_summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "projects", title: "Projects", icon: FolderIcon },
        { id: "skills", title: "Skills", icon: Sparkles },
    ]
    const activeSection = sections[activeSectionIndex];


    useEffect(() => {

        const loadExistingResume = async () => {
            try {
                const { data } = await api.get("/api/resumes/get/" + resumeId, {
                    headers: { Authorization: token }
                })
                if (data.resume) {
                    setResumeData(data.resume)
                }

            } catch (error) {
                console.log(error.message)
            }
        }

        loadExistingResume()
    }, [resumeId, token])

    const changeVisibility = async () => {
        try {
            const formData = new FormData();
            formData.append("resumeId", resumeId)
            formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

            const { data } = await api.put("/api/resumes/update", formData, {
                headers: { Authorization: token }
            });
            setResumeData({ ...resumeData, public: !resumeData.public });
            toast.success(data.message)

        } catch (error) {
            console.error("error saving resume")
        }
    }



    const handleShare = () => {
        const frontendUrl = window.location.href.split("/app/")[0];
        const resumeUrl = frontendUrl + "/view/" + resumeId

        if (navigator.share) {
            navigator.share({
                url: resumeUrl,
                text: "My Resume"
            })
        } else {
            alert("Sharing not supported in this browser. Copy this link: " + resumeUrl);
        }
    }

    const downloadResume = () => {
        window.print()
    }

    // const saveResume = async () => {
    //     try {
    //         let updatedResumeData = structuredClone(resumeData)

    //         //remove image from updatedResumeData
    //         if (typeof resumeData.personal_info.image === "object") {
    //             delete updatedResumeData.personal_info.image
    //         };
    //         const formData = new FormData;
    //         formData.append("resumeId", resumeId);
    //         formData.append("resumeData", JSON.stringify(updatedResumeData));
    //         removeBackground && formData.append("removeBackground", "yes");;

    //         typeof resumeData.personal_info.image === "object" && formData.append("image", resumeData.personal_info.image);

    //         const { data } = await api.put("/api/resumes/update", formData, {
    //             headers: { Authorization: token }
    //         });

    //         setResumeData(data.resume);
    //         toast.success(data.message)
    //     } catch (error) {
    //         console.error("error saving resume", error)
    //     }
    // }


    return (
        <div >
            <div className="max-w-7xl mx-auto px-4 py-6 ">
                <Link href="/app" className="flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeftIcon className="size-4 " />
                    Back to Dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className=" grid lg:grid-cols-12 gap-8 ">


                    {/* left panel-form */}


                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden ">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1   ">
                            <ProgressBar activeSectionIndex={activeSectionIndex} sections={sections} />
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div className="flex justify-between items-center   border-gray-300 py-1 gap-3">
                                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
                                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} />
                                </div>
                                <div className="flex items-center">
                                    {activeSectionIndex !== 0 && (
                                        <button
                                            disabled={activeSectionIndex === 0}
                                            onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1, 0))}
                                            className="flex items-center gap-1 p-3 rounded-lg text-sm font-meduim text-gray hover:bg-gray-50 transition-all">
                                            <ChevronLeft className="size-4" /> Previous
                                        </button>
                                    )}
                                    <button
                                        disabled={activeSectionIndex === sections.length - 1}
                                        onClick={() => setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))}
                                        className={`flex items-center gap-1 p-3 rounded-lg text-sm font-meduim text-gray hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && `opacity-50 cursor-not-allowed`}`}>
                                        Next   <ChevronRight className="size-4" />
                                    </button>

                                </div>
                            </div>


                            {/* Form content */}
                            <div className="space-y-6">
                                {activeSection.id === "personal_info" && (
                                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => { setResumeData(prev => ({ ...prev, personal_info: data })) }} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                                )}
                                {activeSection.id === "professional_summary" && (
                                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => { setResumeData(prev => ({ ...prev, professional_summary: data })) }} setResumeData={setResumeData} />
                                )}
                                {activeSection.id === "experience" && (
                                    <ProfessionalExperienceForm data={resumeData.experience} onChange={(data) => { setResumeData(prev => ({ ...prev, experience: data })) }} />
                                )}
                                {activeSection.id === "education" && (
                                    <ProfessionalEducationForm data={resumeData.education} onChange={(data) => { setResumeData(prev => ({ ...prev, education: data })) }} />
                                )}
                                {activeSection.id === "projects" && (
                                    <Projects data={resumeData.project} onChange={(data) => { setResumeData(prev => ({ ...prev, project: data })) }} />
                                )}
                                {activeSection.id === "skills" && (
                                    <SkillsForm data={resumeData.skills} onChange={(data) => { setResumeData(prev => ({ ...prev, skills: data })) }} />
                                )}
                            </div>
                            <button
                                onClick={() => { }}
                                className="bg-linear-to-r from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">Save changes</button>
                        </div>
                    </div>

                    {/* Right panel- preview */}
                    <div className="lg:col-span-7   max-lg:mt-6 ">
                        <div className="relative w-full">
                            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                                {
                                    resumeData.public && (
                                        <button
                                            onClick={() => handleShare()}
                                            className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                                            <Share2Icon className="size-4" />
                                            Share
                                        </button>
                                    )
                                }
                                <button
                                    onClick={() => { setResumeData(prev => ({ ...prev, public: !prev.public })) }}
                                    className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors ">
                                    {resumeData.public ? <EyeIcon className="size-4" /> :
                                        <EyeOffIcon className="size-4" />}
                                    {resumeData.public ? 'Public' : 'Private'}
                                </button>
                                <button
                                    onClick={() => { downloadResume() }}
                                    className="flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-r from-green-200 to-green-300 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
                                    <Download className="size-4" /> Download
                                </button>
                            </div>
                        </div>
                        {  /* preview area */}

                        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />


                    </div>

                </div>
            </div>
        </div>
    )
};

export default ResumeBuilder;
