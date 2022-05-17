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
                            @click="openPopup('edit', props.rowData)"
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

        <div class="padding-20px"></div>

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
                            <label>Nama depan</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.firstName" />
                        </div>
                        <div class="form-group">
                            <label>Nama belakang</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color"
                                :readOnly="typePopup === 'view'"
                                v-model="form.lastName" />
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
                            <label>Role</label>
                            <select class="slc slc-sekunder">
                                <option>opsi 1</option>
                                <option>opsi 2</option>
                                <option>opsi 3</option>
                                <option>opsi 4</option>
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
                        <!-- for edit -->
                        <div v-if="typePopup === 'edit'" class="form-group">
                            <label>Upload foto</label>
                            <div>
                                <input type="file" />
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
        "id": 0,
        "positionName": ""
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
            data: [],
            form: defaultPayload
        }
    },

    watch: {
        data(newVal, oldVal) {
            this.$refs.vuetable.refresh()
        }
    },

    mounted() {
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
                        "id": 0,
                        "positionName": ""
                    },
                    "role": "ROLE_USER",
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
                console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction)
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
            console.log('pagination:', pagination)
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
        getData() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://35.192.37.30:10000/employee", { headers: HEADERS }).then(response => {
                this.data = response.data
                console.log(this.data)
            })
        },
        submit() {
            const payload = this.form
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.post("http://35.192.37.30:10000/employee", payload, { headers: HEADERS }).then(response => {
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
                axios.delete("http://35.192.37.30:10000/employee/" + id, { headers: HEADERS }).then(response => {
                    this.getData()
                })
            }
        }
    }
}
</script>
