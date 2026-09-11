/**
 * TOPIC REGISTRY
 * --------------
 * Central catalog of every runnable topic demo, grouped by area. App.tsx reads this
 * to render the navigation sidebar and the selected demo. Add a topic here to make
 * it appear in the UI.
 */

import type { ComponentType } from "react";

// Core
import { Components } from "./core/01-components/Components";
import { Jsx } from "./core/02-jsx/Jsx";
import { Props } from "./core/03-props/Props";
import { Rendering } from "./core/04-rendering/Rendering";
import { Events } from "./core/05-events/Events";

// Hooks
import { UseStateDemo } from "./hooks/useState/UseStateDemo";
import { UseEffectDemo } from "./hooks/useEffect/UseEffectDemo";
import { UseRefDemo } from "./hooks/useRef/UseRefDemo";
import { UseContextDemo } from "./hooks/useContext/UseContextDemo";
import { UseReducerDemo } from "./hooks/useReducer/UseReducerDemo";
import { MemoizationHooks } from "./hooks/useMemo-useCallback/MemoizationHooks";
import { CustomHookDemo } from "./hooks/custom-hooks/CustomHookDemo";
import { UseIdDemo } from "./hooks/useId/UseIdDemo";
import { UseLayoutEffectDemo } from "./hooks/useLayoutEffect/UseLayoutEffectDemo";
import { UseImperativeHandleDemo } from "./hooks/useImperativeHandle/UseImperativeHandleDemo";
import { UseSyncExternalStoreDemo } from "./hooks/useSyncExternalStore/UseSyncExternalStoreDemo";

// React 19
import { Actions } from "./react19/actions/Actions";
import { UseActionStateDemo } from "./react19/useActionState/UseActionState";
import { UseFormStatusDemo } from "./react19/useFormStatus/UseFormStatus";
import { UseOptimisticDemo } from "./react19/useOptimistic/UseOptimistic";
import { UseApiDemo } from "./react19/use-api/UseApi";
import { RefAsPropDemo } from "./react19/ref-as-prop/RefAsProp";
import { DocumentMetadataDemo } from "./react19/document-metadata/DocumentMetadata";
import { ContextAsProviderDemo } from "./react19/context-provider/ContextAsProvider";
import { TransitionsDemo } from "./react19/transitions/Transitions";
import { UsePromiseDemo } from "./react19/use-promise/UsePromise";

// Advanced
import { ErrorBoundaryDemo } from "./advanced/error-boundaries/ErrorBoundary";
import { LazySuspenseDemo } from "./advanced/lazy-suspense/LazySuspense";
import { PortalsDemo } from "./advanced/portals/Portals";
import { FormsDemo } from "./advanced/forms/Forms";
import { PatternsDemo } from "./advanced/patterns/Patterns";
import { ReactHookFormDemo } from "./advanced/react-hook-form/ReactHookFormDemo";
import { ZodFormDemo } from "./advanced/zod-validation/ZodFormDemo";
import { ErrorObservabilityDemo } from "./advanced/error-observability/ErrorObservability";

// State management
import { ZustandDemo } from "./state-management/zustand/ZustandDemo";
import { ReduxDemo } from "./state-management/redux-toolkit/ReduxDemo";

// Routing
import { RoutingDemo } from "./routing/RoutingDemo";

// Performance
import { MemoReconciliationDemo } from "./performance/memo/MemoReconciliation";
import { VirtualizationDemo } from "./performance/virtualization/Virtualization";

// TypeScript & Testing
import { TypeScriptPatternsDemo } from "./typescript/TypeScriptPatterns";
import { TestingDemo } from "./testing/Testing";

// Data — React Query
import { BasicQuery } from "./react-query/basic-query/BasicQuery";
import { DependentQuery } from "./react-query/dependent/DependentQuery";
import { Pagination } from "./react-query/pagination/Pagination";
import { InfiniteQuery } from "./react-query/infinite/InfiniteQuery";
import { Mutation } from "./react-query/mutation/Mutation";
import { OptimisticMutation } from "./react-query/optimistic/OptimisticMutation";

export interface Topic {
  id: string;
  title: string;
  Component: ComponentType;
}

export interface TopicGroup {
  group: string;
  topics: Topic[];
}

export const registry: TopicGroup[] = [
  {
    group: "Core",
    topics: [
      { id: "components", title: "Components", Component: Components },
      { id: "jsx", title: "JSX", Component: Jsx },
      { id: "props", title: "Props & children", Component: Props },
      { id: "rendering", title: "Conditional & lists", Component: Rendering },
      { id: "events", title: "Event handling", Component: Events },
    ],
  },
  {
    group: "Hooks",
    topics: [
      { id: "useState", title: "useState", Component: UseStateDemo },
      { id: "useEffect", title: "useEffect", Component: UseEffectDemo },
      { id: "useRef", title: "useRef", Component: UseRefDemo },
      { id: "useContext", title: "useContext", Component: UseContextDemo },
      { id: "useReducer", title: "useReducer", Component: UseReducerDemo },
      { id: "memo", title: "useMemo / useCallback", Component: MemoizationHooks },
      { id: "useId", title: "useId", Component: UseIdDemo },
      { id: "useLayoutEffect", title: "useLayoutEffect", Component: UseLayoutEffectDemo },
      { id: "useImperativeHandle", title: "useImperativeHandle", Component: UseImperativeHandleDemo },
      { id: "useSyncExternalStore", title: "useSyncExternalStore", Component: UseSyncExternalStoreDemo },
      { id: "custom", title: "Custom hooks (4)", Component: CustomHookDemo },
    ],
  },
  {
    group: "React 19",
    topics: [
      { id: "actions", title: "Actions (form action)", Component: Actions },
      { id: "useActionState", title: "useActionState", Component: UseActionStateDemo },
      { id: "useFormStatus", title: "useFormStatus", Component: UseFormStatusDemo },
      { id: "useOptimistic", title: "useOptimistic", Component: UseOptimisticDemo },
      { id: "use", title: "use() API", Component: UseApiDemo },
      { id: "refProp", title: "ref as a prop", Component: RefAsPropDemo },
      { id: "metadata", title: "Document metadata", Component: DocumentMetadataDemo },
      { id: "ctxProvider", title: "<Context> as provider", Component: ContextAsProviderDemo },
      { id: "transitions", title: "Transitions / deferred", Component: TransitionsDemo },
      { id: "usePromise", title: "use(promise) + Suspense", Component: UsePromiseDemo },
    ],
  },
  {
    group: "Advanced",
    topics: [
      { id: "errorBoundary", title: "Error boundaries", Component: ErrorBoundaryDemo },
      { id: "errorObs", title: "Error handling + observability", Component: ErrorObservabilityDemo },
      { id: "lazy", title: "lazy + Suspense", Component: LazySuspenseDemo },
      { id: "portals", title: "Portals", Component: PortalsDemo },
      { id: "forms", title: "Controlled/uncontrolled forms", Component: FormsDemo },
      { id: "rhf", title: "React Hook Form", Component: ReactHookFormDemo },
      { id: "zod", title: "Zod + RHF validation", Component: ZodFormDemo },
      { id: "patterns", title: "HOC / render props / compound", Component: PatternsDemo },
    ],
  },
  {
    group: "Routing",
    topics: [
      { id: "routing", title: "React Router (data router)", Component: RoutingDemo },
    ],
  },
  {
    group: "State Management",
    topics: [
      { id: "zustand", title: "Zustand", Component: ZustandDemo },
      { id: "redux", title: "Redux Toolkit + RTK Query", Component: ReduxDemo },
    ],
  },
  {
    group: "Performance",
    topics: [
      { id: "memoReconcile", title: "React.memo + reconciliation", Component: MemoReconciliationDemo },
      { id: "virtualization", title: "List virtualization", Component: VirtualizationDemo },
    ],
  },
  {
    group: "TypeScript & Testing",
    topics: [
      { id: "tsPatterns", title: "TypeScript patterns", Component: TypeScriptPatternsDemo },
      { id: "testing", title: "Testing (Vitest + RTL)", Component: TestingDemo },
    ],
  },
  {
    group: "Data (React Query)",
    topics: [
      { id: "rqBasic", title: "useQuery (basic)", Component: BasicQuery },
      { id: "rqDependent", title: "Dependent query (enabled)", Component: DependentQuery },
      { id: "rqPagination", title: "Pagination (keepPreviousData)", Component: Pagination },
      { id: "rqInfinite", title: "Infinite query", Component: InfiniteQuery },
      { id: "rqMutation", title: "Mutation + invalidation", Component: Mutation },
      { id: "rqOptimistic", title: "Optimistic update + rollback", Component: OptimisticMutation },
    ],
  },
];
