;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  class StopWatch {
    constructor(element){
      this.timer = element
      this.interval = null
      this.defaultTime = '00:00.00'
      this.startTime = 0
      this.pasteTime = 0 //경과된 시간
    }

    addZero(number){
      if(number < 10){
        return '0' + number
      }if ( number> 99){
        return number.toString().slice(0, -1)
      }
      return number
    }
    
    timeToString(time){
      const date = new Date(time)
      const minute = date.getUTCMinutes()
      const seconds = date.getUTCSeconds()
      const mill = date.getUTCMilliseconds()
      return `${this.addZero(minute)} : ${this.addZero(seconds)} . ${this.addZero(mill)}`
    }


    print(text){
      this.timer.innerHTML = text
    }

    startTimer() {
      this.pasteTime = Date.now() - this.startTime
      const time = this.timeToString(this.pasteTime)
      this.print(time)
    }

    start() {
      clearInterval(this.interval)
      this.startTime = Date.now() - this.pasteTime
      this.interval = setInterval(this.startTimer.bind(this), 10)
    }
    stop()  {
      clearInterval(this.interval)
    }
    reset() {
      clearInterval(this.interval)
      this.print(this.defaultTime)
      this.interval = null
      this.defaultTime = '00:00.00'
      this.startTime = 0
      this.pasteTime = 0 //경과된 시간
    }
  }

  const $startButton = get(".timer_button.start")
  const $stopButton = get(".timer_button.stop")
  const $resetButton = get(".timer_button.reset")

  const $timer = get('.timer')

  const stopWatch = new StopWatch($timer)

  $startButton.addEventListener('click', () => {
    stopWatch.start()  
  })
  $stopButton.addEventListener('click', () => {
    stopWatch.stop()  
  })
  $resetButton.addEventListener('click', () => {
    stopWatch.reset()  
  })
  
  
})()
