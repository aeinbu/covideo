declare module 'lib-jitsi-meet' {
    function init(options?: JitsiMeetJsOptions): void
    function setLogLevel(loglevel: logLevels): void
    function createLocalTracks(options?: JitsiLocalTrackoptions, firePermissionPromptIsShownEvent?: boolean): Promise<JitsiTrack[]>

    declare class JitsiConnection {
        constructor(appId: null, token: unknown, options: JitsiConnectionOptions)
        connect(options: {id: string, password?: string})
        disconnect(options: {id: string, password?: string})
        initJitsiConference(roomname: string, options: JitsiConferenceOptions): JitsiConference
        addEventListener(eventname: events.connection, callback: (connection: JitsiConnection) => void): void
        removeEventListener(eventname: events.connection, callback: (connection: JitsiConnection) => void): void
        addFeature(feature: string, submit: boolean)
        removeFeature(feature: string, submit: boolean)
    }

    declare class JitsiConference {
        join(password?: string) : unknown
        leave() : Promise<unknown>
        myUserId() : unknown
        getLocalTracks() : JitsiTrack[]
        addEventListener(eventname: event.conference, callback: (room: JitsiConference) => void): void
        removeEventListener(eventname: event.conference, callback: (room: JitsiConference) => void): void
        on(eventname: event.conference, callback: (room: JitsiConference) => void): void
        off(eventname: event.conference, callback: (room: JitsiConference) => void): void
        sendTextMessage(text: string) : unknown
        setDisplayName(name: string) : unknow
        selectParticipant(participantId: unknown)
        sendCommand(name: string, values: JitsiConferenceCommand)
        sendCommandOnce(name: string, values: JitsiConferenceCommand)
        removeCommand(name: string)
        // addCommandListener(command: string, handler)
        removeCommandListener(command: string)
        addTrack(track: JitsiTrack) : Promise<unknown>
        removeTrack(track: JitsiTrack) : Promise<uknown>
        isDTMFSupported() : unknown
        getRole(): "moderator" | "none"
        isModerator(): boolean
        lock(password: string): Promise<unknown> // Note: available only for moderator
        unlock(): Promise<unknown> // Note: available only for moderator
        kick(id: string)
        setStartMutedPolicy(policy: JitsiConferencePolicy) // Note: available only for moderator
        getStartMutedPolicy() : JitsiConferencePolicy
        isStartAudioMuted()
        isStartVideoMuted()
        sendFeedback(overallFeedback: 1|2|3|4|5, detailedFeedback: unknown)
        setSubject(subject: string) // Note: available only for moderator
        sendEndpointMessage(to: string, payload: any)
        broadcastEndpointMessage(payload: any)
        pinParticipant(participantId: unkown)
        setReceiverVideoConstraint(resolution: unknown) // set the desired resolution to get from JVB (180, 360, 720, 1080, etc). You should use that method if you are using simulcast.
        // isHidden // Checks if local user has joined as a "hidden" user. This is a specialized role used for integrations.
    }

    declare class JitsiTrack {
        track: {kind: "audio" | "video", stream: MediaStream}
        stream: MediaStream
    }

    enum TrackKind { Audio = "audio", Video = "video"}

    declare class JitsiTrackError {
    }

    declare namespace events {
        enum connection {
            CONNECTION_ESTABLISHED,
            CONNECTION_FAILED,
            CONNECTION_DISCONNECTED
        }

        enum conference {
            TRACK_ADDED,
            CONFERENCE_JOINED
        }
    }

    enum logLevels {
        DEBUG = 0,
        INFO = 1,
        WARN = 2,
        ERROR = 3,
        FATAL = 4 
    }

    declare type JitsiConferenceCommand = {
        value: unknown,
        attributes: unknown, // map with keys the name of the attribute and values - the values of the attributes.
        children: unknown[] // array with JS object with the same structure.
    }

    declare type JitsiConferencePolicy = {
        /**
         * if audio stream should be muted
         */
        audio: boolean

        /**
         * if video stream should be muted
         */
        video: boolean
    }

    declare type JitsiMeetJsOptions = {
        useIPv6: boolean

        /**
         * The ID of the jidesha extension for Chrome. Example: 'mbocklcggfhnbahlnepmldehdhpjfcjp'
         */
        desktopSharingChromeExtId?: string

        /**
         * Whether desktop sharing should be disabled on Chrome. Example: false.
         */
        desktopSharingChromeDisabled: boolean

        /**
         * The media sources to use when using screen sharing with the Chrome extension. Example: ['screen', 'window']
         */
        desktopSharingChromeSources?: string[]

        /**
         * Required version of Chrome extension. Example: '0.1'
         */
        desktopSharingChromeMinExtVersion: string

        /**
         * Whether desktop sharing should be disabled on Firefox. Example: false.
         */
        desktopSharingFirefoxDisabled: boolean

        /**
         * Enables/disables audio levels.
         */
        disableAudioLevels: boolean

        /**
         * Enables/disables simulcast.
         */
        disableSimulcast: boolean

        /**
         * Enables/disables attaching global onerror handler (window.onerror).
         * (defaults to false)
         */
        enableWindowOnErrorHandler?: boolean

        /**
         * If true - callstats will be disabled and the callstats API won't be included.
         */
        disableThirdPartyRequests: boolean

        /**
         * Enables/disables analytics logging.
         * (optional, defaults to false). 
         */
        enableAnalyticsLogging?: boolean

        /**
         * custom url to access callstats client script
         * (optional)
         */
        callStatsCustomScriptUrl?: string

        /**
         * a namespace to prepend the callstats conference ID with
         * (optional, defaults to the window.location.hostname)
         */
        callStatsConfIDNamespace?: string

        /**
         * Enables/disable the use of RTX.
         * (optional, defaults to false). 
         */
        disableRtx?: boolean

        /**
         * If enabled, strips the H.264 codec from the local SDP.
         * (optional, defaults to false)
         */
        disableH264?: boolean
        /**
         * Enables/disable preferring the first instance of an h264 codec in an offer by moving it to the front of the codec list.
         * (optional, defaults to false)
         */
        preferH264?: boolean
    }

    declare type JitsiConnectionOptions = {
        serviceUrl: unknown // - XMPP service URL. For example 'wss://server.com/xmpp-websocket' for Websocket or '//server.com/http-bind' for BOSH.
        hosts: any // JS Object
        domain: unknown //
        muc: unknown //
        anonymousdomain: unknown
        useStunTurn: boolean
        enableLipSync?: unknown // (optional, default to enabled) Enables the lipsync feature. Currently works only in Chrome and is enabled by default.
    }

    declare type JitsiConferenceOptions = {
        openBridgeChannel?: "datachannel" | "websocket" // (Fallback is "datachannel") Enables/disables bridge channel. Values can be "datachannel", "websocket", true (treat it as "datachannel"), undefined (treat it as "datachannel") and false (don't open any channel). NOTE: we recommend to set that option to true
        recordingType: unknown                          //the type of recording to be used
        callStatsID: unknown                            //callstats credentials
        callStatsSecret: unknown                        //callstats credentials
        enableTalkWhileMuted: boolean                   // (Defaults to false) Enables/disables talk while muted detection, by default the value is false/disabled.
        ignoreStartMuted: unknown                       //ignores start muted events coming from jicofo.
        startSilent: unknown                            //enables silent mode, will mark audio as inactive will not send/receive audio
        confID: unknown                                 //Used for statistics to identify conference, if tenants are supported will contain tenant and the non lower case variant for the room name.
        statisticsId: unknown                           //The id to be used as stats instead of default callStatsUsername.
        statisticsDisplayName: unknown                  //The display name to be used for stats, used for callstats.
    }

    declare type JitsiLocalTrackoptions = {
        devices: ("desktop" | "video" | "audio")[]      // array with the devices - "desktop", "video" and "audio" that will be passed to GUM. If that property is not set GUM will try to get all available devices.
        resolution: any                                 // the prefered resolution for the local video.
        constraints: any                                // the prefered encoding properties for the created track (replaces 'resolution' in newer releases of browsers)
        cameraDeviceId: string                          // the deviceID for the video device that is going to be used
        micDeviceId: string                             // the deviceID for the audio device that is going to be used
        minFps: any                                     // the minimum frame rate for the video stream (passed to GUM)
        maxFps: any                                     // the maximum frame rate for the video stream (passed to GUM)
        facingMode: "user" | "environment"              // facing mode for a camera (possible values - 'user', 'environment')
    }
}


