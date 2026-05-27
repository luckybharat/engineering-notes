import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchMockFeatureFlags, mockFeatureFlags } from "../mock";

export type FeatureFlags = Record<string, boolean>;

type FeatureFlagProviderType = {
    flags: FeatureFlags,
    updateFeatureFlags: (flags: FeatureFlags) => void;
}

const FeatureFlagContext = createContext<FeatureFlagProviderType | null>(null);
export const useFeatureFlagContext = () => {
    const context = useContext(FeatureFlagContext);
    if (!context) {
        throw 'Feature flag context is used outside of FeaturFlagProvider';
    }
    return context;
}

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
    const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

    useEffect(() => {
        fetchMockFeatureFlags().then(response => {
            setFeatureFlags(response.flags);
        })
    }, []);

    const updateFeatureFlags = (flags: FeatureFlags) => {
        setFeatureFlags(flags);
    }

    return <FeatureFlagContext.Provider value={{ flags: featureFlags, updateFeatureFlags }}>
        {children}
    </FeatureFlagContext.Provider>
}
