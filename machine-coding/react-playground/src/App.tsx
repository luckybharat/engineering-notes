import { lazy, Suspense } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { problems } from "./problems/registry";

const problemModules: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  "capture-visible-items": lazy(() => import("./problems/capture-visible-items")),
  "multi-step-form": lazy(() => import("./problems/multi-step-form")),
  "modal": lazy(() => import("./problems/modal")),
  "auto-complete-search": lazy(() => import("./problems/autocomplete-search")),
  "infinite-scroll": lazy(() => import("./problems/infinite-scroll")),
  "tabs": lazy(() => import("./problems/tabs")),
  "toast": lazy(() => import('./problems/toast')),
  "pagination": lazy(() => import('./problems/pagination')),
};

const difficultyColor: Record<string, string> = {
  Easy: "#d1fae5",
  Medium: "#fef3c7",
  Hard: "#fee2e2",
};

// ── Home ──────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div className="container">
      <h1 className="page-title">⚙️ Machine Coding Playground</h1>
      <p className="page-description">
        React problems — click a card to open the problem.
      </p>

      <div
        className="problems-grid"
      >
        {problems.map((p) => (
          <Link
            key={p.id}
            to={`/problem/${p.id}`}
          >
            <div
              className="problem"
            >
              <div
                className="detail"
              >
                <h2 className="title">{p.title}</h2>
                <span
                  className={`level ${difficultyColor[p.difficulty]}`}
                >
                  {p.difficulty}
                </span>
              </div>
              <p className="description">
                {p.description}
              </p>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Problem view ──────────────────────────────────────────────────────────────
function ProblemView() {
  const { id } = useParams<{ id: string }>();
  const problem = problems.find((p) => p.id === id);
  const Component = id ? problemModules[id] : null;

  if (!problem || !Component) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link to="/">← Back</Link>
        <p>Problem not found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <Link to="/" style={{ fontSize: "0.875rem", color: "#6b7280" }}>
        ← All Problems
      </Link>
      <h1 style={{ margin: "0.5rem 0 0.25rem" }}>{problem.title}</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>{problem.description}</p>
      <hr style={{ marginBottom: "1.5rem", borderColor: "#e5e7eb" }} />

      <Suspense fallback={<p>Loading…</p>}>
        <Component />
      </Suspense>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problem/:id" element={<ProblemView />} />
    </Routes>
  );
}
