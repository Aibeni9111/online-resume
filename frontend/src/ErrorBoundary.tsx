import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: any };

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    componentDidCatch(error: any, info: any) {
        console.error("React error:", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-red-700">
                    <h1 className="text-xl font-bold mb-2">Ошибка в UI</h1>
                    <pre className="whitespace-pre-wrap text-sm">
            {String(this.state.error)}
          </pre>
                </div>
            );
        }
        return this.props.children;
    }
}
