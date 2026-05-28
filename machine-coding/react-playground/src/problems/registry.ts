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
    id: "modal",
    title: "Modal",
    description: "A modal component with basic functionalites",
    difficulty: "Easy",
    tags: ["UI", "UX", "Alerts", "Modal"],
  },
  {
    id: "auto-complete-search",
    title: "Auto complete search",
    description: "A simple autocomplete search with debouncing",
    difficulty: "Medium",
    tags: ["Search", "Debouncing", "UI"],
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    description: "Simple infinite scroll component for a list",
    difficulty: "Medium",
    tags: [],
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Simple tabs component using Compund Component Pattern",
    difficulty: "Medium",
    tags: [],
  },
  {
    id: "toast",
    title: "Toast",
    description: "Basic toast notification component",
    difficulty: "Medium",
    tags: [],
  },
  {
    id: "pagination",
    title: "pagination",
    description: "Pagination component",
    difficulty: "Medium",
    tags: [],
  },
  {
    id: "scroll-indicator",
    title: "Scroll Indicator",
    description: "Scroll Indicator component",
    difficulty: "Easy",
    tags: [],
  },
  {
    id: 'carousel',
    title: 'Carousel',
    description: 'Carousel component',
    difficulty: 'Easy',
    tags: [],
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Accordion component',
    difficulty: 'Easy',
    tags: [],
  },
  {
    id: 'draggable-todos',
    title: 'Draggable Todos',
    description: 'Draggable Todos order + multi-column',
    difficulty: 'Hard',
    tags: [],
  }
];
