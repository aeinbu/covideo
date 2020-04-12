import React, { useState, useEffect } from "react"
import { Video } from "src/Video"
import { doSomeJitsi } from "./doSomeJitsi"


export const App = () => {
    const [videoStream, setVideoStream] = useState<MediaStream | undefined>(undefined)

    // navigator.mediaDevices.enumerateDevices()
    //   .then(res => console.log("*** enumerate devices", res.map(x => ({ kind: x.kind, label: x.label }))))
    //   .catch(err => console.log("*** failed enumerate devices", err))

    useEffect(() => {
        doSomeJitsi()
            .then(res => {
                // console.log("*** got user media", res)
                setVideoStream(res)
            })
            .catch(err => console.log("*** failed to get user media", err))
    }, [])

    return (
        <div>
            doing som jitsi - see console!
            <header>
                Here comes video from own device!
            </header>

            <Video videoStream={videoStream} />

            <footer>
                ABOVE HERE!
            </footer>
        </div>
    )
}
