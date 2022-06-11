import VuetableFieldHandle from 'vuetable-2/src/components/VuetableFieldHandle.vue'

export default [
  // {
  //   name: VuetableFieldHandle
  // },
  {
    name: 'nik',
    title: '<span class="orange glyphicon glyphicon-user"></span> NIK',
    sortField: 'nik'
  },
  {
    name: 'firstName',
    title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
    sortField: 'firstName'
  },
  {
    name: 'email',
    sortField: 'email'
  },
  {
    name: 'birthDate',
    sortField: 'birthDate'
  },
  {
    name: 'username',
    sortField: 'username'
  },
  {
    name: 'position',
    formatter: (value) => {
      return value.positionName
    }
  },
  'actions'
]