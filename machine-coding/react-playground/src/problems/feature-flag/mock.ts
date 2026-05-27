import { randomResponseTimer } from "../../utils";
import type { FeatureFlags } from "./providers/FeatureFlagProvider";

export const mockFeatureFlags = {
  'new-dashboard': true,
  'beta-profile-page': false,
  'dark-mode': true,
  'advanced-search': true,
  'multi-language-support': false,
  'enable-notifications': true,
  'chat-system-v2': false,
  'recommendation-engine': true,
  'experimental-sidebar': false,
  'ai-assistant': true,
  'admin-analytics': true,
  'payments-v2': false,
  'infinite-scroll-feed': true,
  'voice-search': false,
  'video-upload': true,
  'live-collaboration': false,
  'autosave-drafts': true,
  'new-auth-flow': false,
  'referral-program': true,
  'feature-flag-debugger': true,
};

export function fetchMockFeatureFlags(): Promise<{ flags: FeatureFlags }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ flags: mockFeatureFlags });
        }, randomResponseTimer())
    })
}
