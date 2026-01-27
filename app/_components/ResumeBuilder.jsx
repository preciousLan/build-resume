"use client";
import { dummyResumeData } from "@/public/assets";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import PersonalInfoForm from "./PersonalInfoForm";
import ResumePreview from "./ResumePreview";
import TemplateSelector from "./TemplateSelector";
import ColorPicker from "./ColorPicker";
import ProfessionalSummaryForm from "./ProfessionalSummaryForm";
import ProfessionalExperienceForm from "./ProfessionalExperienceForm";


const ResumeBuilder = ({ resumeId }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);

    const [resumeData, setResumeData] = useState({
        id: "",
        title: "",
        personal_info: {},
        summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    });

    useEffect(() => { console.log(resumeData) }, [resumeData]);


    const sections = [
        { id: "personal_info", name: "Personal Info", icon: User },
        { id: "professional_summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "projects", title: "Projects", icon: FolderIcon },
        { id: "skills", title: "Skills", icon: Sparkles },
    ]
    const activeSection = sections[activeSectionIndex];

    // const loadExistingResume = () => {
    //     const resume = dummyResumeData.find(
    //         (res) => res._id === resumeId
    //     );

    //     if (resume) {
    //         setResumeData(resume);
    //     }
    // };
    // useEffect(() => {
    //     if (resumeId) {
    //         loadExistingResume();
    //     }
    // }, [resumeId]);







    return (
        <div >
            <div className="max-w-7xl mx-auto px-4 py-6 ">
                <Link href="/app" className="flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeftIcon className="size-4 " />
                    Back to Dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8 ">


                    {/* left panel-form */}


                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden ">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 ">
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
                                    <p>education</p>
                                )}
                                {activeSection.id === "projects" && (
                                    <p>projects</p>
                                )}
                                {activeSection.id === "skills" && (
                                    <p>skills</p>
                                )}
                                <button>Save changes</button>
                            </div>
                        </div>
                    </div>

                    {/* Right panel- preview */}
                    <div className="lg:col-span-7   max-lg:mt-6 ">
                        <div>
                            {/* buttons*/}

                        </div>
                        {  /* preview area */}
                        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
