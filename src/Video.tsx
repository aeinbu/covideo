import React, { useRef, useEffect } from 'react'


type Props = {
	videoStream?: MediaStream
}

export const Video = ({ videoStream }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (videoRef.current && videoStream) {
			videoRef.current.srcObject = videoStream
		}
	}, [videoStream])

	return videoStream !== undefined
		? <video ref={videoRef} autoPlay playsInline controls={false} >
			No video support in this browser :(
	  </video>
		: <>Waiting for video...</>
}

