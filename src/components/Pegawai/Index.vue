<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Pegawai</h1>
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
            :css="css.table"
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
            <vuetable-pagination 
                ref="pagination"
                :css="css.pagination"
                @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>

        <!-- Create/Edit form -->
        <div v-if="visiblePopup" class="app-popup app-popup-show">
            <div class="popup-content">
                <div class="popup-panel">
                    <div>
                        <h2 class="title">
                            <label v-if="typePopup === 'create'">
                                Tambah Pegawai
                            </label>
                            <label v-if="typePopup === 'edit'">
                                Edit Pegawai
                            </label>
                            <label v-if="typePopup === 'view'">
                                Detail Pegawai
                            </label>
                        </h2>
                    </div>
                    <div class="content-right">
                        <button class="btn btn-circle btn-grey" @click="openPopup()">
                            <i class="fa fa-lg fa-times" />
                        </button>
                    </div>
                </div>
                <div class="padding-15px grid grid-2x gap-15px">
                    <div class="col-1">
                        <div class="form-group">
                            <label>Nama lengkap</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.firstName" />
                        </div>
                        <div class="form-group">
                            <label>Tempat lahir</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.birthPlace" />
                        </div>
                        <div class="form-group">
                            <label>Tanggal lahir</label>
                            <input 
                                type="date" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.birthDate" />
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.username" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.password" />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Position</label>
                            <select class="slc slc-sekunder" v-model="form.position.id" :disabled="typePopup === 'view'">
                                <option 
                                    v-for="(dt, i) in dataPosition" 
                                    :key="i"
                                    :value="dt.id"
                                    :selected="form.position.id === dt.id">
                                    {{ dt.positionName }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Alamat</label>
                            <textarea 
                                class="txt txt-sekunder-color edit-text"
                                :readOnly="typePopup === 'view'"
                                v-model="form.address"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Nomor telpon</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.contactNumber" />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.email" />
                        </div>
                        <div class="form-group">
                            <label>NIK</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.nik" />
                        </div>
                    </div>
                </div>
                <div v-if="typePopup === 'edit'" class="padding-15px grid grid-2x gap-15px">
                    <div class="col-1">
                        <div class="form-group">
                            <label>Employee Foto URL</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="true"
                                v-model="form.employeePhotoURL" />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Upload Foto</label>
                            <div>
                                <input type="file" id="file" ref="file" @change="onFileChange" />
                            </div>
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
import Vuetable from "vuetable-2"
import VuetablePagination from "vuetable-2/src/components/VuetablePagination"
import FieldsDef from "./FieldsDef.js"
import axios from "axios"
import _ from "lodash"

import TableCss from '../modules/TableCss'

const defaultPayload = {
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
    "lastName": "",
    "nik": "",
    "password": "",
    "position": {
        "id": 1,
        "positionName": "ADMIN"
    },
    "role": "ROLE_USER",
    "username": ""
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
            dataPosition: [],
            data: [],
            form: defaultPayload,
            image: ''
        }
    },

    watch: {
        data(newVal, oldVal) {
            this.$refs.vuetable.refresh()
        }
    },

    mounted() {
        this.getDataPosition()
        this.getData()
    },

    methods: {
        openPopup(type = '', data = null) {
            this.visiblePopup = !this.visiblePopup
            this.typePopup = type

            if (this.typePopup === 'edit' || this.typePopup === 'view') {
                this.form = {
                    "id": data.id,
                    "accountNonExpired": data.accountNonExpired,
                    "accountNonLocked": data.accountNonLocked,
                    "address": data.address,
                    "birthDate": data.birthDate,
                    "birthPlace": data.birthPlace,
                    "contactNumber": data.contactNumber,
                    "credentialsNonExpired": data.credentialsNonExpired,
                    "email": data.email,
                    "employeePhotoURL": data.employeePhotoURL,
                    "enabled": data.enabled,
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "nik": data.nik,
                    "password": data.password,
                    "position": {
                        "id": 1,
                        "positionName": "ADMIN"
                    },
                    "role": data.role,
                    "username": data.username
                }
            }
            if (this.typePopup === 'create') {
                this.form = defaultPayload
            }
        },
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page)
        },
        dataManager(sortOrder, pagination) {
            if (this.data.length < 1) return

            let local = this.data

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                local = _.orderBy(
                local,
                sortOrder[0].sortField,
                sortOrder[0].direction
                )
            }

            pagination = this.$refs.vuetable.makePagination(
                local.length,
                this.perPage
            )
            let from = pagination.from - 1
            let to = from + this.perPage

            return {
                pagination: pagination,
                data: _.slice(local, from, to)
            }
        },
        onActionClicked(action, data) {
            if (action === 'delete-item') {
                this.remove(data.id)
            }
        },
        getDataPosition() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/position", { headers: HEADERS }).then(response => {
                this.dataPosition = response.data
                console.log('dataPosition', this.dataPosition)
            })
        },
        getData() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://52.15.191.178:8080/employee", { headers: HEADERS }).then(response => {
                this.data = response.data
            })
        },
        submit() {
            const payload = this.form
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            if (this.typePopup == 'edit') {
                axios.put("http://52.15.191.178:8080/employee/put", payload, { headers: HEADERS }).then(response => {
                    this.openPopup()
                    this.getData()
                })
            } else {
                axios.post("http://52.15.191.178:8080/employee/post", payload, { headers: HEADERS }).then(response => {
                    this.openPopup()
                    this.getData()
                })
            }
        },
        remove(id) {
            var a = confirm('hapus data ini ?')
            if (a) {
                const HEADERS = {
                    Authorization: `Bearer ${this.$cookie.get('token')}`
                }
                axios.delete("http://52.15.191.178:8080/employee/" + id, { headers: HEADERS }).then(response => {
                    this.getData()
                })
            }
        },
        onFileChange() {
            var files = this.$refs.file.files[0]
            this.createImage(files);
        },
        createImage(file) {
            let formData = new FormData()
            formData.append('file', file)
            formData.append('id', this.form.id)
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.post("http://52.15.191.178:8080/employee/uploadFoto", formData, { headers: HEADERS })
            .then(response => {
                if (response.data) {
                    alert('Foto berhasil di upload')
                    this.form.employeePhotoURL = response.data.fileDownloadUri
                } else {
                    alert('Foto gagal di upload')
                }
            })
            .catch(err => {
                alert('Foto gagal di upload')
                console.log('err', err)
            })
        },
        removeImage: function (e) {
            this.image = '';
        }
    }
}
</script>
