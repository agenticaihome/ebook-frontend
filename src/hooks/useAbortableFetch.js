/**
 * useAbortableFetch - Hook for making API calls with automatic cleanup
 * 
 * Prevents memory leaks and setState on unmounted components by
 * automatically aborting requests when component unmounts.
 * 
 * @usage
 * const { data, loading, error, refetch } = useAbortableFetch(
 *   () => api.getCurrentUser(),
 *   { immediate: true }
 * );
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Create an AbortController that's safe to use
 */
const createAbortController = () => {
    if (typeof AbortController !== 'undefined') {
        return new AbortController();
    }
    // Fallback for older browsers
    return {
        signal: { aborted: false },
        abort: () => { }
    };
};

/**
 * Hook for making abortable API calls
 * @param {Function} fetchFn - Async function that returns a promise
 * @param {Object} options - Configuration options
 * @param {boolean} options.immediate - Whether to fetch immediately on mount
 * @param {Array} options.deps - Dependencies that trigger refetch
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 */
export function useAbortableFetch(fetchFn, options = {}) {
    const {
        immediate = false,
        deps = [],
        onSuccess,
        onError,
        retryCount = 0,
        retryDelay = 1000
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const mountedRef = useRef(true);
    const abortControllerRef = useRef(null);
    const retryCountRef = useRef(0);

    const execute = useCallback(async (...args) => {
        // Abort any in-flight request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = createAbortController();
        const signal = abortControllerRef.current.signal;

        setLoading(true);
        setError(null);

        try {
            const result = await fetchFn(...args, { signal });

            // Only update state if still mounted and not aborted
            if (mountedRef.current && !signal.aborted) {
                setData(result);
                setLoading(false);
                onSuccess?.(result);
                retryCountRef.current = 0;
            }

            return result;
        } catch (err) {
            // Don't update state for abort errors
            if (err.name === 'AbortError') {
                return;
            }

            // Only update state if still mounted
            if (mountedRef.current) {
                // Retry logic
                if (retryCountRef.current < retryCount) {
                    retryCountRef.current++;
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    return execute(...args);
                }

                setError(err);
                setLoading(false);
                onError?.(err);
            }

            throw err;
        }
    }, [fetchFn, onSuccess, onError, retryCount, retryDelay]);

    // Immediate fetch on mount
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cleanup on unmount
    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const refetch = useCallback((...args) => {
        return execute(...args);
    }, [execute]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, refetch, reset, execute };
}

/**
 * Hook for tracking mounted state
 * Useful for checking if component is still mounted before setState
 */
export function useMounted() {
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return mountedRef;
}

/**
 * Create a safe setState that only updates if mounted
 * @param {Function} setState - The setState function from useState
 * @param {Object} mountedRef - Ref tracking mounted state
 */
export function createSafeSetState(setState, mountedRef) {
    return (value) => {
        if (mountedRef.current) {
            setState(value);
        }
    };
}

export default useAbortableFetch;
