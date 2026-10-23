import { Component } from "react";

export default class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("App crashed:", error, info.componentStack);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="error-fallback" role="alert">
                <p className="error-fallback__title">
                    {this.props.name ? `${this.props.name} ran into a problem` : "Something went wrong"}
                </p>
                <p className="error-fallback__text">
                    Close this window and open it again to retry.
                </p>
                <button
                    type="button"
                    className="error-fallback__button"
                    onClick={() => this.setState({ hasError: false })}
                >
                    Try again
                </button>
            </div>
        );
    }
}