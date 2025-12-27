'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../atoms/Button';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-axiom-card border border-axiom-border rounded-md m-4">
                    <h2 className="text-axiom-red font-bold mb-2">Something went wrong.</h2>
                    <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
