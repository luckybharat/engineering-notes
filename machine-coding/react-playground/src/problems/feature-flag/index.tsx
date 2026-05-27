import type { ReactNode } from "react";
import { useFeatureFlag } from "./useFeatureFlag";

export const FeatureFlag = ({ feature, fallback, children }: { feature: string, fallback: ReactNode, children: ReactNode }) => {
    const isFeatureEnabled = useFeatureFlag(feature);
    return isFeatureEnabled ? children : fallback;
};
