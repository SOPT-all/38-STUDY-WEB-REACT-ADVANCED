import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import './SuspenseCacheDemo.css';

// ---------------------------------------------
// 1. 가짜 API: 호출 횟수 + 시각 기록
// ---------------------------------------------
let fetchCount = 0;
async function fetchBookmarks() {
  fetchCount += 1;
  const id = fetchCount;
  await new Promise((r) => setTimeout(r, 1000));
  return { total: 3, fetchedAt: new Date().toLocaleTimeString(), callId: id };
}

const QUERY_KEY = ['bookmarks'];

const STALE_TIME = 0; 
const GC_TIME = 5000;

// ---------------------------------------------
// 2. Suspense 밖의 뱃지 (useQuery)
// ---------------------------------------------
function Badge() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchBookmarks,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
  return (
    <div className="scd-badge-row">
      뱃지:{' '}
      <span className="scd-badge">
        {isLoading ? '로딩중' : `총 ${data?.total}개`}
      </span>
    </div>
  );
}

// ---------------------------------------------
// 3. Suspense 안의 목록 (useSuspenseQuery)
// ---------------------------------------------
function List() {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchBookmarks,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
  return (
    <p className="scd-data">
      목록 데이터: fetchedAt=<b>{data.fetchedAt}</b> (call #{data.callId})
    </p>
  );
}

// ---------------------------------------------
// 4. 데모 본체: broken / fixed 토글
// ---------------------------------------------
function Demo() {
  const [showBadgeFirst, setShowBadgeFirst] = useState(true); // true=broken, false=fixed
  const [showList, setShowList] = useState(false);
  const queryClient = useQueryClient();

  function reset() {
    queryClient.removeQueries({ queryKey: QUERY_KEY });
    setShowList(false);
  }

  return (
    <div className="scd-card">
      <h1 className="scd-title">Suspense 캐시 함정 실습</h1>
      <p className="scd-sub">
        같은 쿼리를 Suspense 안/밖에서 같이 쓰면 fallback이 어떻게 사라지는지 확인합니다.
      </p>

      <label className="scd-toggle">
        <input
          type="checkbox"
          checked={showBadgeFirst}
          onChange={(e) => {
            setShowBadgeFirst(e.target.checked);
            reset();
          }}
        />
        뱃지를 목록보다 먼저 마운트
        <span className={`scd-mode-pill ${showBadgeFirst ? 'broken' : 'fixed'}`}>
          {showBadgeFirst ? 'broken' : 'fixed'}
        </span>
      </label>

      {/* broken 모드일 때만 뱃지를 먼저 렌더 → 캐시를 먼저 채움 */}
      {showBadgeFirst && <Badge />}

      <div className="scd-buttons">
        <button onClick={() => setShowList(true)}>목록 마운트</button>
        <button onClick={() => setShowList(false)}>언마운트만 (캐시 유지)</button>
        <button onClick={reset}>초기화 (캐시 강제 삭제)</button>
      </div>

      <div className="scd-result">
        {showList && (
          <ErrorBoundary fallback={<p className="scd-error">에러!</p>}>
            <Suspense
              fallback={
                <span className="scd-fallback">
                  <span className="scd-dot" />
                  Suspense fallback (보이면 정상)
                </span>
              }
            >
              {/* fixed 모드에서는 뱃지도 같은 컴포넌트 안에서 같이 그림 */}
              {!showBadgeFirst && <Badge />}
              <List />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

const client = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="scd-app">
        <Demo />
      </div>
    </QueryClientProvider>
  );
}
