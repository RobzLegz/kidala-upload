import { useEffect, useState } from 'react';

export function useForceUpdate() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(value + 1);

        return () => setValue((value) => value + 1);
    }, []);

    return value; // update state to force render
    // An function that increment 👆🏻 the previous state like here
}
