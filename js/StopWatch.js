'use strict'
$(document).ready(function () {
  let setTimeoutId = undefined
  let startTime = 0
  let currentTime = 0

  // 経過時間
  let elapsedTime = 0

  // １０ミリ秒でタイマー更新
  function runTimer() {
    currentTime = Date.now()
    showTime()
    setTimeoutId = setTimeout(() => {
      runTimer()
    }, 10)
  }

  // 時刻表示処理
  function showTime() {
    let d = new Date(currentTime - startTime + elapsedTime)
    const getHours = d.getHours() - 9
    const getMin = d.getMinutes()
    const getSec = d.getSeconds()
    const getMillisec = Math.floor(d.getMilliseconds() / 10)
    $('#timer').text(
      `${String(getHours).padStart(2, '0')}:
      ${String(getMin).padStart(2, '0')}:
      ${String(getSec).padStart(2, '0')}:
      ${String(getMillisec).padStart(2, '0')}`
    )
  }

  // ボタン状態制御(スタート)
  function classReplacementStart() {
    $('#start').addClass('disabled')
    $('#stop').removeClass('disabled')
    $('#reset').addClass('disabled')
  }

  // ボタン状態制御(ストップ)
  function classReplacementStop() {
    $('#start').removeClass('disabled')
    $('#stop').addClass('disabled')
    $('#reset').removeClass('disabled')
  }

  // ボタン状態制御(リセット)
  function classReplacementReset() {
    $('#start').removeClass('disabled')
    $('#stop').addClass('disabled')
    $('#reset').addClass('disabled')
  }

  // スタートボタン押下
  $('#start').click(function () {
    if ($(this).hasClass('disabled')) {
      return
    }
    classReplacementStart()
    startTime = Date.now()
    runTimer()
  })

  // ストップボタン押下
  $('#stop').click(function () {
    if ($(this).hasClass('disabled')) {
      return
    }
    classReplacementStop()
    elapsedTime += currentTime - startTime
    clearTimeout(setTimeoutId)
  })

  // リセットボタン押下
  $('#reset').click(function () {
    if ($(this).hasClass('disabled')) {
      return
    }
    classReplacementReset()
    clearTimeout(setTimeoutId)
    elapsedTime = 0
    $('#timer').text('00:00:00:00')
  })
})
