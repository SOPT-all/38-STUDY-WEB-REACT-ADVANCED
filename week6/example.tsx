import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import type { ChangeEvent, CSSProperties } from "react";

// ────────────────────────────
// 1. Bailout + 2. React.memo
// props 참조를 고정해서 Bailout이 정상 작동하게 함
type ChildProps = {
  onClick: () => void;
  style: CSSProperties;
};

const Child = memo(function Child({ onClick, style }: ChildProps) {
  console.log("Child 렌더링");
  return (
    <button onClick={onClick} style={style}>
      Child 버튼
    </button>
  );
});

// ────────────────────────────
// 3. React.lazy
const HeavyChart = lazy(() => import("./HeavyChart"));

// ────────────────────────────
export default function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [showChart, setShowChart] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Bailout이 깨지지 않도록 참조 고정 (실제로는 useCallback/useMemo 사용)
  const handleClick = useCallback(() => console.log("click!"), []);
  const style = useMemo<CSSProperties>(() => ({ color: "crimson" }), []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value); // 긴급: 즉시 반영

    // 4. useTransition: 무거운 연산은 낮은 우선순위로
    startTransition(() => {
      const filtered = heavySearch(value);
      setResults(filtered);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>1. Bailout / 2. React.memo</h3>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
      <Child onClick={handleClick} style={style} />

      <h3>3. React.lazy</h3>
      <button onClick={() => setShowChart(true)}>차트 보여주기</button>
      {showChart && (
        <Suspense fallback={<p>로딩 중...</p>}>
          <HeavyChart />
        </Suspense>
      )}

      <h3>4. useTransition</h3>
      <input value={query} onChange={handleChange} placeholder="검색" />
      {isPending && <p>검색 중...</p>}
      <ul>
        {results.slice(0, 10).map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

function heavySearch(query: string): string[] {
  const list = Array.from({ length: 10000 }, (_, i) => `항목-${i}`);
  return list.filter((item) => item.includes(query));
}
