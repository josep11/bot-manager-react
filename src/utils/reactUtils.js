import { useEffect } from 'react';

import process from "process";

export function useTitle(title) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title
        return () => {
            document.title = prevTitle
        }
    })
}
