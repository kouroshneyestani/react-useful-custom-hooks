import { useState, useCallback, useRef, useEffect } from "react";

/**
 * useStateCallback - A custom hook that works like useState but allows a callback function to be executed after the state update.
 *
 * @param {any} initialState - The initial state value.
 * @returns {[any, function]} An array with the current state and a state updater function that accepts a callback.
 *
 * @example
 * const [state, setStateCallback] = useStateCallback(0);
 *
 * setStateCallback(1, (newState) => {
 *   console.log(newState); // Logs 1 after the state has been updated
 * });
 */
function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // Mutable ref to store the current callback

    /**
     * setStateCallback - Updates the state and registers a callback to be executed after the state has been updated.
     *
     * @param {any} newState - The new state value.
     * @param {function} callback - The callback function to execute after the state update.
     */
    const setStateCallback = useCallback((newState, callback) => {
        cbRef.current = callback; // Store the callback function in the ref
        setState(newState);
    }, []);

    useEffect(() => {
        // Execute the callback if it exists and then reset it
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null; // Reset callback after execution
        }
    }, [state]);

    return [state, setStateCallback];
}

export default useStateCallback;
