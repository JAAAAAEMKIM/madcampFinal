import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/signin/SignIn'
import Signup from '@/components/signin/SignUp'
import CatchMindRooms from '@/components/catchmind/CatchMindRooms'
import CatchMindPaint from '@/components/catchmind/CatchMindPaint'
import About from '@/components/About'
import Exhibition from '@/components/exhibition/ExhibitionMain'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // Main
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    // Signup
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },

    // /catchmind/:username
    {
      path: '/catchmind/:username',
      name: 'CatchMindRooms',
      component: CatchMindRooms,
    },
    {
      // /catchmind/:username/paint/:roomName
      path: '/catchmind/:username/paint/:roomName',
      name: 'CatchMindPaint',
      component: CatchMindPaint,
      props: true

    },
    {
      // /exhibition
      path: '/exhibition',
      name: 'Exhibition',
      component: Exhibition
    }
  ]
})

export default router;
