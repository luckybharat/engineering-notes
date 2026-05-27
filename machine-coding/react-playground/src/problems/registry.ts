export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export const problems: Problem[] = [
  {
    id: "capture-visible-items",
    title: "Capture Visible Items",
    description:
      "Track which list items are currently visible in the viewport using IntersectionObserver.",
    difficulty: "Medium",
    tags: ["IntersectionObserver", "DOM", "Scroll"],
  },
  {
    id: "multi-step-form",
    title: "Multi Step Form",
    description:
      "A wizard-style form with multiple steps, validation, and progress tracking.",
    difficulty: "Medium",
    tags: ["Forms", "State", "UX"],
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'A modal component with basic functionalites',
    difficulty: "Easy",
    tags: ['UI', 'UX', 'Alerts', 'Modal']
  },
  {
    id: 'auto-complete-search',
    title: 'Auto complete search',
    description: 'A simple autocomplete search with debouncing',
    difficulty: 'Medium',
    tags: ['Search', 'Debouncing', 'UI']
  }
];
