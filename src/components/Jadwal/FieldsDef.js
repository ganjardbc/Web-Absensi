import VuetableFieldHandle from 'vuetable-2/src/components/VuetableFieldHandle.vue'

export default [
  {
    name: VuetableFieldHandle
  },
  {
    name: 'room.roomName',
    title: '<span class="orange glyphicon glyphicon-user"></span> Mata Pelajaran',
    sortField: 'room.roomName'
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
    name: 'description',
    title: '<span class="orange glyphicon glyphicon-user"></span> Deskripsi',
    sortField: 'description'
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