<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Laporan</h1>
            </div>
            <div class="col-2 content-right"></div>
        </div>

        <div class="display-flex-normal">
            <div class="form-group">
                <label>Pilih mata pelajaran</label>
                <select 
                    class="slc slc-sekunder"
                    v-model="form.roomName" 
                    @change="onChangeRoom">
                    <option 
                        v-for="(dt, i) in dataRoom" 
                        :key="i"
                        :value="dt.roomName"
                        :selected="form.roomName === dt.roomName">
                        {{ dt.roomName }}
                    </option>
                </select>
            </div>
            <!-- <div class="form-group">
                <label>Pilih pegawai</label>
                <select 
                    class="slc slc-sekunder"
                    v-model="form.employeeName" 
                    @change="onChangeEmployee">
                    <option 
                        v-for="(dt, i) in dataEmployee" 
                        :key="i"
                        :value="dt.id"
                        :selected="form.employeeName === dt.id">
                        {{ dt.firstName }}
                    </option>
                </select>
            </div> -->
            <div class="form-group margin-left-15px margin-right-15px">
                <label>Dari tanggal</label>
                <input type="date" class="txt txt-sekunder-color" v-model="form.startDate"  />
            </div>
            <div class="form-group">
                <label>Sampai tanggal</label>
                <input type="date" class="txt txt-sekunder-color" v-model="form.currentDate"  />
            </div>
        </div>

        <div class="padding-15px content-right">
            <!-- <button type="button" class="btn btn-blue" @click="print()">
                Print
            </button> -->
            <button type="button" class="btn btn-blue" @click="download()">
                Download
            </button>
        </div>

        <div class="padding-20px"></div>
    </div>
</template>

<script>
import axios from "axios"

const defaultPayload = {
    "roomName": "",
    "employeeName": "",
    "startDate": "",
    "currentDate": "",
}

export default {
    components: {},
    data() {
        return {
            dataRoom: [],
            dataEmployee: [],
            form: defaultPayload
        }
    },
    mounted() {
        this.getDataRoom()
    },
    methods: {
        onChangeRoom(event) {
            const id = event.target.value
            const find = this.dataRoom.find((dt) => dt.id == id)
        },
        getDataRoom() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/room", { headers: HEADERS }).then(response => {
                this.dataRoom = response.data
            })
        },
        onChangeEmployee(event) {
            const id = event.target.value
            const find = this.dataEmployee.find((dt) => dt.id == id)
        },
        getDataEmployee() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/employee", { headers: HEADERS }).then(response => {
                this.dataEmployee = response.data
            })
        },
        print() {
            const payload = this.form
            if (payload.roomName && payload.startDate && payload.currentDate) {
                const HEADERS = {
                    Authorization: `Bearer ${this.$cookie.get('token')}`
                }
                axios.get(`http://52.15.191.178:8080/report/attendance/${payload.roomName}/${payload.startDate}/${payload.currentDate}`, { headers: HEADERS }).then(response => {
                    console.log('print', response)
                })
            } else {
                alert('please fill all the field !')
            }
        },
        download() {
            const payload = this.form
            if (payload.roomName && payload.startDate && payload.currentDate) {
                const HEADERS = {
                    Authorization: `Bearer ${this.$cookie.get('token')}`
                }
                axios.get(`http://52.15.191.178:8080/report/getpdf/${payload.roomName}/${payload.startDate}/${payload.currentDate}`, { headers: HEADERS, responseType: 'blob' }).then(response => {
                    window.open(URL.createObjectURL(response.data))
                })
            } else {
                alert('please fill all the field !')
            }
        },
    }
}
</script>
