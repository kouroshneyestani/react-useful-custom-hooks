import React from "react";
import useStateCallback from "../hooks/useStateCallback";

function Counter() {
    const [count, setCount] = useStateCallback(0);

    const increment = () => {
        setCount(count + 1, (newCount) => {
            console.log("Count after update:", newCount);
        });
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Counter;
