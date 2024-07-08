"use client";

import { Category } from "@prisma/client";
import { 
    FcGlobe, FcGraduationCap, FcIdea, FcShipped, FcEngineering, FcDocument, FcManager, 
    FcAndroidOs, FcDataConfiguration, FcFlowChart, FcComboChart, FcStatistics, FcPrivacy, 
    FcLock, FcElectronics, FcCollaboration, FcCommandLine, FcMultipleDevices, FcServices, 
    FcLandscape, FcOrgUnit, FcWorkflow, FcMindMap, FcSmartphoneTablet 
} from 'react-icons/fc';

import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";



interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Web Development": FcGlobe,
    "UPSC": FcGraduationCap,
    "UI/UX": FcIdea,
    "Software Testing": FcShipped,
    "Software Development": FcEngineering,
    "Programming Languages": FcDocument,
    "Operating Systems": FcManager,
    "Operating System": FcManager,
    "Machine Learning": FcAndroidOs,
    "Full Stack": FcDataConfiguration,
    "Data Structures": FcFlowChart,
    "Data Science": FcComboChart,
    "Data Analytics": FcStatistics,
    "Cyber Security": FcPrivacy,
    "Computer Security": FcLock,
    "Computer Science": FcElectronics,
    "Computer Networks": FcCollaboration,
    "Computer Hardware": FcCommandLine,
    "Computer Graphics": FcMultipleDevices,
    "Computer Architecture": FcWorkflow,
    "Cloud Computing": FcServices,
    "Artificial Intelligence": FcMindMap,
    "Android Development": FcSmartphoneTablet,
};

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="categories-container flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}

const styles = `
..categories-container {
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #0ea5e9 transparent; /* Thumb color (sky-700) and track color */
}

.categories-container::-webkit-scrollbar {
    height: 4px; /* Adjust the height to make the scrollbar thinner */
}

.categories-container::-webkit-scrollbar-thumb {
    background: #0ea5e9; /* Scrollbar thumb color (sky-700) */
    border-radius: 10px; /* Rounded corners */
}

.categories-container::-webkit-scrollbar-thumb:hover {
    background: #0284c7; /* Thumb color on hover (darker sky-700) */
}

.categories-container::-webkit-scrollbar-track {
    background: transparent; /* Track color (transparent) */
}

.categories-container::-webkit-scrollbar-button {
    display: none; /* Remove the arrows from both ends */
}

.categories-container::-webkit-scrollbar-corner {
    background: transparent; /* Make scrollbar corner transparent */
}
`;

// Injecting the styles into the document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}