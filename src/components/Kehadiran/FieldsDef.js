import VuetableFieldHandle from 'vuetable-2/src/components/VuetableFieldHandle.vue'

export default [
  {
    name: VuetableFieldHandle
  },
  {
    name: 'roomName',
    title: '<span class="orange glyphicon glyphicon-user"></span> Mata Pelajaran',
    sortField: 'roomName'
  },
  {
    name: 'employee.firstName',
    title: '<span class="orange glyphicon glyphicon-user"></span> Pegawai',
    sortField: 'employee.firstName'
  },
  {
    name: 'shift',
    title: '<span class="orange glyphicon glyphicon-user"></span> Jadwal',
    sortField: 'shift'
  },
  {
    name: 'checkin',
    title: '<span class="orange glyphicon glyphicon-user"></span> Check In',
    sortField: 'checkin'
  },
  {
    name: 'checkout',
    title: '<span class="orange glyphicon glyphicon-user"></span> Check Out',
    sortField: 'checkout'
  },
  {
    name: 'startTime',
    title: '<span class="orange glyphicon glyphicon-user"></span> Start Time',
    sortField: 'startTime'
  },
  {
    name: 'endTime',
    title: '<span class="orange glyphicon glyphicon-user"></span> End Time',
    sortField: 'endTime'
  },
  'actions'
]