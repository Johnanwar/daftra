import { Component, type ReactNode } from 'react';

type Props = {
  fallback?: ReactNode;
  children: ReactNode;
  title?: string;
  message?: string;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { fallback, title, message } = this.props;

    if (this.state.hasError) {
      return (
        fallback ?? (
          <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center p-6">
            <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full">
              <div className="text-4xl mb-4">🚨</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                {title ?? 'Something went wrong.'}
              </h2>
              <p className="text-gray-700">{message ?? 'Please try again later or reload the page.'}</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
