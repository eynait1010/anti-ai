'use client'
import "./globals.css";
import { useEffect, useState } from "react";

export function MessageWrong({ trigger }: { trigger: boolean }) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!trigger) {
            return
        }
        setShow(true)
    }, [trigger])
    if (!trigger) {
        return <></>
    }
    return (
        <>
            {show && <div className="message message-fail"><span className="wrong">Wrong</span></div>}
        </>
    )
}