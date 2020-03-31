import React, { useState, useEffect } from 'react'
import { Video } from "src/Video"

export const App = () => {
  const [videoStream, setVideoStream] = useState<MediaStream | undefined>(undefined)

  // navigator.mediaDevices.enumerateDevices()
  //   .then(res => console.log("*** enumerate devices", res.map(x => ({ kind: x.kind, label: x.label }))))
  //   .catch(err => console.log("*** failed enumerate devices", err))


  //TODO: Checkout https://github.com/jitsi/lib-jitsi-meet.git for stream connection to server...

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(res => {
        console.log("*** get user media", res)
        setVideoStream(res)
      })
      .catch(err => console.log("*** failed to get user media", err))
  }, [])

  return (
    <div>
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
