
import { useEffect, useState } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import alarme from '../assets/alarme.mp3'
import ReactAudioPlayer from 'react-audio-player';

const Countdown_Initial_time_in_seconds = 25 * 60// 25 minutes
const Countdown_Initial_time_in_seconds_Rest = 5 * 60// 5 minutes

export function Timer() {
    const [rest, setRest] = useState(false)
    const [requestTimer, setRequestTimer] = useState(false);
    const [timer, setTimer] = useState<number>(Countdown_Initial_time_in_seconds)
    const [timerRest, setTimerRest] = useState<number>(Countdown_Initial_time_in_seconds_Rest)
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
        <main className="flex flex-col w-screen h-screen justify-start mt-20 items-center gap-6 ">
            <section>
                {rest === true ? (
                    <h1 className='text-5xl font-medium mb-5'>Time to Rest</h1>
                ) : (
                    <h1 className='text-5xl font-medium mb-5'>Time to Study</h1>
                )}
            </section>
            <section className=' flex flex-col text-zinc-900 '>
                {rest === true ? (
                    <>
                        <CircularProgress value={xis2} size="200px" thickness='5px' >
                            <CircularProgressLabel>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">{String(minutesRest).padStart(2, '0')}</span>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">:</span>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">{String(secondsRest).padStart(2, '0')}</span>
                            </CircularProgressLabel>
                        </CircularProgress>
                    </>
                )
                    : (

                        <CircularProgress value={xis1} size="200px" thickness='5px' >
                            <CircularProgressLabel>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">{String(minutes).padStart(2, '0')}</span>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">:</span>
                                <span className="text-5xl   font-medium text-blue-900 leading-relaxed">{String(seconds).padStart(2, '0')}</span>
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
                className='bg-blue-600 text-zinc-50 w-[15%] text-xl font-bold hover:scale-105 transition- py-4 rounded-lg hover:bg-blue-700 shadow-xl shadow-zinc-300'
                onClick={() => { setRequestTimer(!requestTimer) }}>
                {!requestTimer === true ? "Start" : "Stop"}
            </button>
            {!requestTimer === true ? (
                <div className='flex flex-row gap-40 items-center justify-evenly max-w-2/3 w-2/3 h-[25%]'>
                    <div className='flex flex-col items-center justify-center w-[30%] gap-4 bg-slate-200 pb-10 rounded-xl'>
                        <h1 className='text-zinc-800 font-semibold text-xl mt-10'>Study Timer Settings</h1>
                        <input
                            type="number"
                            className=" bg-slate-300 rounded-sm w-[90%] h-14 text-zinc-900 px-4 py-0 text-xl placeholder:text-zinc-700 font-bold placeholder:font-semibold"
                            placeholder="Minutos "
                            onChange={(e) => {
                                setTimer(Number(e.target.value) * 60)
                            }}
                        />

                    </div>
                    <div className='flex flex-col  items-center justify-center w-[30%] gap-4  bg-zinc-200 pb-10 rounded-xl'>
                        <h1 className='text-zinc-800 font-semibold text-xl mt-10'>Rest Timer Settings</h1>
                        <input
                            type="number"
                            onChange={(e) => {
                                setTimerRest(Number(e.target.value) * 60)
                            }}
                            className="bg-slate-300 rounded-sm w-[90%] h-14 text-zinc-900 px-4 py-0 text-xl placeholder:text-zinc-700 font-bold placeholder:font-semibold"
                            placeholder="Minutos " />

                    </div>
                </div>
            ) : (<></>)}
        </main>
    )
}
