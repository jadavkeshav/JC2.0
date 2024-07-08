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
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
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