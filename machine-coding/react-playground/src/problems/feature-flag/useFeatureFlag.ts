import { useFeatureFlagContext } from "./providers/FeatureFlagProvider";

export const useFeatureFlag = (featureName: string) => {
  const { flags } = useFeatureFlagContext();
  return flags[featureName] ?? false;
};
