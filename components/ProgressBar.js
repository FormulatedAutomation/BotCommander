import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'

const BAR_COLOR = '#ffcc00'

Router.ready(() => {
  Router.router.events.on('routeChangeStart', () => NProgress.start())
  Router.router.events.on('routeChangeComplete', () => NProgress.done())
  Router.router.events.on('routeChangeError', () => NProgress.done())
})

const ProgressBar = () => (
  <style jsx global>{`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${BAR_COLOR};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${BAR_COLOR}, 0 0 5px ${BAR_COLOR};
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
  `}</style>
)

export default ProgressBar
