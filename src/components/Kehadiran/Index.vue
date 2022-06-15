<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Kehadiran</h1>
            </div>
            <div class="col-2 content-right">
                <button class="btn btn-circle btn-blue" @click="openPopup('create')">
                    <i class="fa fa-lg fa-plus" />
                </button>
            </div>
        </div>
        <vuetable ref="vuetable"
			:api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
                >
                    <div slot="actions" slot-scope="props">
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="openPopup('view', props.rowData)"
                        >
                            <i class="fa fa-lw fa-search-plus"></i>
                        </button>
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="openPopup('edit', props.rowData)"
                        >
                            <i class="fa fa-lw fa-pencil-alt"></i>
                        </button>
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="onActionClicked('delete-item', props.rowData)"
                        >
                            <i class="fa fa-lw fa-trash-alt"></i>
                        </button>
                    </div>
        </vuetable>
        <div style="padding-top:10px">
            <vuetable-pagination ref="pagination"
                :css="css.pagination"
                @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>

        <!-- Create/Edit form -->
        <div v-if="visiblePopup" class="app-popup app-popup-show">
            <div class="popup-content-small">
                <div class="popup-panel">
                    <div>
                        <h2 class="title">
                            <label v-if="typePopup === 'create'">
                                Tambah Kehadiran
                            </label>
                            <label v-if="typePopup === 'edit'">
                                Edit Kehadiran
                            </label>
                            <label v-if="typePopup === 'view'">
                                Detail Kehadiran
                            </label>
                        </h2>
                    </div>
                    <div class="content-right">
                        <button class="btn btn-circle btn-grey" @click="openPopup()">
                            <i class="fa fa-lg fa-times" />
                        </button>
                    </div>
                </div>
                <div class="grid grid-2x gap-20px padding-15px">
                    <div class="col-1">
                        <div class="form-group">
                            <label>Pilih mata pelajaran</label>
                            <select 
                                class="slc slc-sekunder"
                                v-model="form.roomName" 
                                :disabled="typePopup === 'view'">
                                <option 
                                    v-for="(dt, i) in dataRoom" 
                                    :key="i"
                                    :value="dt.roomName"
                                    :selected="form.roomName === dt.roomName">
                                    {{ dt.roomName }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Pilih pegawai</label>
                             <select 
                                class="slc slc-sekunder"
                                v-model="form.employee.id" 
                                :disabled="typePopup === 'view'"
                                @change="onChangeEmployee">
                                <option 
                                    v-for="(dt, i) in dataEmployee" 
                                    :key="i"
                                    :value="dt.id"
                                    :selected="form.employee.id === dt.id">
                                    {{ dt.firstName }} {{ dt.lastName }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Check In</label>
                            <input 
                                type="time" 
                                class="txt txt-sekunder-color"
                                v-model="form.checkin" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Check Out</label>
                            <input 
                                type="time" 
                                class="txt txt-sekunder-color"
                                v-model="form.checkout" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Shift</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.shift" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Tanggal</label>
                            <input 
                                type="date" 
                                class="txt txt-sekunder-color"
                                v-model="form.attendanceDate" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Start time</label>
                            <input 
                                type="time" 
                                class="txt txt-sekunder-color"
                                v-model="form.startTime" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>End time</label>
                            <input 
                                type="time" 
                                class="txt txt-sekunder-color"
                                v-model="form.endTime" 
                                :disabled="typePopup === 'view'" />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Latitude</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.latitude" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Longitude</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.longitude" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Maximum Tollerance</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.maxTollerance" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Minimum Tollerance</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.minTollerance" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                v-model="form.attendanceStatus" 
                                :disabled="typePopup === 'view'" />
                        </div>
                        <div class="form-group">
                            <label>Deskripsi</label>
                            <textarea 
                                class="txt txt-sekunder-color edit-text"
                                :readOnly="typePopup === 'view'"
                                v-model="form.description"></textarea>
                        </div>
                    </div>
                </div>
                <div class="padding-15px content-right border-top">
                    <button type="button" class="btn btn-grey" @click="openPopup()">
                        Cancel
                    </button>
                    <button v-if="typePopup !== 'view'" type="button" class="btn btn-blue" @click="submit()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "./FieldsDef.js";
import axios from "axios";
import _ from "lodash";

import TableCss from '../modules/TableCss'

const defaultPayload = {
    "attendanceDate": "dd-MM-yyyy",
    "attendanceStatus": "",
    "checkin": "HH:mm:ss",
    "checkout": "HH:mm:ss",
    "description": "",
    "employee": {
        "accountNonExpired": true,
        "accountNonLocked": true,
        "address": "",
        "birthDate": "yyyy-MM-dd",
        "birthPlace": "",
        "contactNumber": "",
        "credentialsNonExpired": true,
        "email": "",
        "employeePhotoURL": "",
        "enabled": true,
        "firstName": "",
        "id": 0,
        "lastName": "",
        "nik": "",
        "password": "",
        "position": {
            "id": 0,
            "positionName": ""
        },
        "role": "",
        "username": ""
    },
    "endTime": "HH:mm:ss",
    "latitude": 0,
    "longitude": 0,
    "maxTollerance": 0,
    "minTollerance": 0,
    "roomName": "",
    "shift": "",
    "startTime": "HH:mm:ss"
}

export default {
    components: {
        Vuetable,
        VuetablePagination
    },

    data() {
        return {
            fields: FieldsDef,
            perPage: 7,
            css: TableCss,
            typePopup: '',
            visiblePopup: false,
            data: [],
            dataRoom: [],
            dataEmployee: [],
            form: defaultPayload,
        };
    },

    watch: {
        data(newVal, oldVal) {
            this.$refs.vuetable.refresh();
        }
    },

    mounted() {
        this.getData()
        this.getDataRoom()
        this.getDataEmployee()
    },

    methods: {
        onChangeEmployee(event) {
            const id = event.target.value
            const find = this.dataEmployee.find((dt) => dt.id == id)
            this.form.employee = find
        },
        openPopup(type = '', data = null) {
            this.visiblePopup = !this.visiblePopup
            this.typePopup = type

            if (this.typePopup === 'edit' || this.typePopup === 'view') {
                this.form = {
                    "id": data.id,
                    "attendanceDate": data.attendanceDate,
                    "attendanceStatus": data.attendanceStatus,
                    "checkin": data.checkin,
                    "checkout": data.checkout,
                    "description": data.description,
                    "employee": data.employee,
                    "endTime": data.endTime,
                    "latitude": data.latitude,
                    "longitude": data.longitude,
                    "maxTollerance": data.maxTollerance,
                    "minTollerance": data.minTollerance,
                    "roomName": data.roomName,
                    "shift": data.shift,
                    "startTime": data.startTime
                }
            }
            if (this.typePopup === 'create') {
                this.form = defaultPayload
            }
        },
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page);
        },
        dataManager(sortOrder, pagination) {
            if (this.data.length < 1) return;

            let local = this.data;

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                local = _.orderBy(
                local,
                sortOrder[0].sortField,
                sortOrder[0].direction
                );
            }

            pagination = this.$refs.vuetable.makePagination(
                local.length,
                this.perPage
            );
            let from = pagination.from - 1;
            let to = from + this.perPage;

            return {
                pagination: pagination,
                data: _.slice(local, from, to)
            };
        },
        onActionClicked(action, data) {
            if (action === 'delete-item') {
                this.remove(data.id)
            }
        },
        getDataRoom() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/room", { headers: HEADERS }).then(response => {
                this.dataRoom = response.data
            })
        },
        getDataEmployee() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/employee", { headers: HEADERS }).then(response => {
                this.dataEmployee = response.data
            })
        },
        getData() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/attendance", { headers: HEADERS }).then(response => {
                this.data = response.data;
            });
        },
        submit() {
            const payload = {
                ...this.form,
                "startTime": `${this.form.startTime}:00`,
                "endTime": `${this.form.endTime}:00`,
                "checkin": `${this.form.checkin}:00`,
                "checkout": `${this.form.checkout}:00`,
            }
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.post("http://52.15.191.178:8080/attendance", payload, { headers: HEADERS }).then(response => {
                this.openPopup()
                this.getData()
            })
        },
        remove(id) {
            var a = confirm('hapus data ini ?')
            if (a) {
                const HEADERS = {
                    Authorization: `Bearer ${this.$cookie.get('token')}`
                }
                axios.delete("http://52.15.191.178:8080/attendance/" + id, { headers: HEADERS }).then(response => {
                    this.getData()
                })
            }
        },
    }
}
</script>
