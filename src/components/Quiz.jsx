import Top from "./Top"
import questions from '../questions.js'
import { BsXCircle as Wrong, BsCheckCircle as Right } from "react-icons/bs"
import { useState, createRef, useEffect, useRef } from "react"

export default function Quiz({show, score}) {
  const [icko, setIcko] = useState(0)
  const [done, setDone] = useState(false)
  const [time, setTime] = useState(15)
  
  const slider = createRef()
  const ques = useRef([])
  ques.current = questions.map(el => el.current ?? createRef())
  let int

  const check = (res, e) => {
    if (done || time == 0) return
    if (res) {
      e.target.classList.add('right')
      e.target.children[0].classList.remove('hidden')
      score(s => s+1)
    } else {
      e.target.classList.add('wrong')
      e.target.children[0].classList.remove('hidden')
    }
    ques.current.forEach(q => {
      if (q.current?.innerText === questions[icko].find(q => q.res).answ) {
        q.current?.classList.add('right')
        q.current?.children[0].classList.remove('hidden')
      }
    })
    clearInterval(int)
    setDone(true)
  }

  useEffect(() => {
    int = setInterval(() => setTime(t => t-1), 1000)

    if (time == 0) {
      if (!done) {
        ques.current.forEach(q => {
          if (q.current?.innerText !== findRight(questions[icko])) {
            q.current?.classList.add('opacity-30')
          }
        })
      } 
      clearInterval(int)
      setDone(true)
    }

    return () => clearInterval(int)
  }, [time])

  useEffect(() => {
    if (done) {
      slider.current.style.animationPlayState = 'paused'
      clearInterval(int)
    } 
  }, [done])

  const next = () => {
    if (icko == 4) {
      show(false)
      return
    } 
    
    ques.current.forEach(q => {
      q.current?.classList.remove('right', 'wrong', 'opacity-30')
      q.current?.children[0].classList.add('hidden')
    })

    setTime(15)
    setDone(false)
    setIcko(icko+1)

    slider.current.style.animation = 'none'
    slider.current.offsetHeight
    slider.current.style.animation = null
  }

  return (
    <div className="rounded shadow-xl flex flex-col w-[35rem] bg-white animate-appear">
      <Top time={time} />
      <div className="h-1 bg-zinc-300">
        <div ref={slider} className="h-1 animate-slide bg-blue-500"></div>
      </div>
      <div className="p-8 space-y-3">
        <h2 className="font-bold text-2xl mb-4">{icko+1}. {questions[icko][0].question}</h2>
        {questions[icko].map((q, i) => {
          if (i != 0) 
            return (
              <div onClick={e => check(q.res, e)} key={i} ref={ques.current[i]} className="ans flex items-center justify-between">
                {q.answ}
                {q.res ? <Right size={20} className="text-green-400 hidden"/> : <Wrong size={20} className="text-red-400 hidden"/>}
              </div>
        )})}
      </div>
      <div className="h-[.15rem] mt-auto bg-zinc-300"></div>
      <div className="p-2 px-6 flex items-center justify-between">
        <div className="flex gap-1 py-[.4rem]"> <p className="font-bold">{icko+1}</p> of <p className="font-bold">5</p> Questions</div>
        {done && <button onClick={next} className="btn animate-appear">Next Que</button>}
      </div>
    </div>
  )
}