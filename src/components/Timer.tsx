
import { useEffect, useState } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import alarme from '../assets/alarme.mp3'
import ReactAudioPlayer from 'react-audio-player';

const Countdown_Initial_time_in_seconds = 5// 25 minutes
const Countdown_Initial_time_in_seconds_Rest = 5 * 60// 5 minutes

export function Timer() {
    const [rest, setRest] = useState(false)
    const [requestTimer, setRequestTimer] = useState(false);
    const [timer, setTimer] = useState(Countdown_Initial_time_in_seconds)
    const [timerRest, setTimerRest] = useState(Countdown_Initial_time_in_seconds_Rest)
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const minutesRest = Math.floor(timerRest / 60)
    const secondsRest = timerRest % 60
    const xis1 = (timer * 100) / Countdown_Initial_time_in_seconds
    const xis2 = (timerRest * 100) / Countdown_Initial_time_in_seconds_Rest
    const audio = new Audio(alarme)
    const [flag, setFlag] = useState(true)


    useEffect(() => {

        if (rest === true) {
            if (requestTimer === true) {
                if (timerRest > 0) {
                    setFlag(true)
                    audio.currentTime = 0
                    setTimeout(() => {
                        setTimerRest(state => state - 1)
                    }, 1000)
                } else {
                    setFlag(false)
                    setRest(false);
                    setTimer(Countdown_Initial_time_in_seconds)
                    setTimerRest(Countdown_Initial_time_in_seconds_Rest)
                    setRequestTimer(false);
                }
            }
        } else {
            if (requestTimer === true) {
                if (timer > 0) {
                    setFlag(true)
                    setTimeout(() => {
                        setTimer(state => state - 1)
                    }, 1000)
                } else {
                    setFlag(false)
                    setRest(true);
                    setRequestTimer(false)
                }
            } else {
            }
        }
    }, [timer, timerRest, requestTimer])
    return (
        <main className="flex flex-col  justify-center items-center gap-6 ">
            <section>
                {rest === true ? (
                    <h1 className='text-3xl font-medium'>Time to Rest</h1>
                ) : (
                    <h1 className='text-3xl font-medium'>Time to Study</h1>
                )}
            </section>
            <section className=' flex flex-col text-zinc-900 '>
                {rest === true ? (
                    <>
                        <CircularProgress value={xis2} size="200px" thickness='5px' >
                            <CircularProgressLabel>
                                <span className="font-medium text-zinc-700 leading-relaxed">{String(minutesRest).padStart(2, '0')}</span>
                                <span className="font-medium text-zinc-700 leading-relaxed">:</span>
                                <span className="font-medium text-zinc-700 leading-relaxed">{String(secondsRest).padStart(2, '0')}</span>
                            </CircularProgressLabel>
                        </CircularProgress>
                    </>
                )
                    : (

                        <CircularProgress value={xis1} size="200px" thickness='5px' >
                            <CircularProgressLabel>
                                <span className="font-medium text-zinc-700 leading-relaxed">{String(minutes).padStart(2, '0')}</span>
                                <span className="font-medium text-zinc-700 leading-relaxed">:</span>
                                <span className="font-medium text-zinc-700 leading-relaxed">{String(seconds).padStart(2, '0')}</span>
                            </CircularProgressLabel>
                        </CircularProgress>
                    )
                }
                {requestTimer === false && flag === false && (
                    <ReactAudioPlayer
                        src={alarme}
                        autoPlay={true}
                        volume={1}
                    />
                )}
            </section>
            <button
                className='bg-blue-600 text-zinc-50 w-24 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                onClick={() => { setRequestTimer(!requestTimer) }}>
                {!requestTimer === true ? "Start" : "Stop"}
            </button>

        </main>
    )
}
