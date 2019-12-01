import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Home from '@/components/Home/Index'
import Pegawai from '@/components/Pegawai/Index'
import Jabatan from '@/components/Jabatan/Index'
import Ruangan from '@/components/Ruangan/Index'
import Jadwal from '@/components/Jadwal/Index'
import Kehadiran from '@/components/Kehadiran/Index'
import Laporan from '@/components/Laporan/Index'
import Absensi from '@/components/qrcode/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/beranda',
      name: 'beranda',
      component: Home
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: Pegawai
    },
    {
      path: '/jabatan',
      name: 'jabatan',
      component: Jabatan
    },
    {
      path: '/ruangan',
      name: 'ruangan',
      component: Ruangan
    },
    {
      path: '/jadwal',
      name: 'jadwal',
      component: Jadwal
    },
    {
      path: '/kehadiran',
      name: 'kehadiran',
      component: Kehadiran
    },
    {
      path: '/laporan',
      name: 'laporan',
      component: Laporan
    },
    {
      path: '/absensi',
      name: 'absesnsi',
      components: {
        absensi: Absensi
      }
    }
  ]
})
