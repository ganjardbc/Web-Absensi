<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Jabatan</h1>
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
            <vuetable-pagination 
                ref="pagination"
                :css="css.pagination"
                @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>

        <div v-if="visiblePopup" class="app-popup app-popup-show">
            <div class="popup-content-mikro">
                <div class="popup-panel">
                    <div>
                        <h2 class="title">
                            <label v-if="typePopup === 'create'">
                                Tambah Jabatan
                            </label>
                            <label v-if="typePopup === 'edit'">
                                Edit Jabatan
                            </label>
                            <label v-if="typePopup === 'view'">
                                Detail Jabatan
                            </label>
                        </h2>
                    </div>
                    <div class="content-right">
                        <button class="btn btn-circle btn-grey" @click="openPopup()">
                            <i class="fa fa-lg fa-times" />
                        </button>
                    </div>
                </div>
                <div class="padding-15px">
                    <div class="col-1">
                        <div class="form-group">
                            <label>Nama Jabatan</label>
                            <input 
                                type="text" 
                                class="txt txt-sekunder-color" 
                                :readOnly="typePopup === 'view'"
                                v-model="form.positionName" />
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
    positionName: ''
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
                    id: data.id,
                    positionName: data.positionName
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
        onActionClicked(action, data) {
            if (action === 'delete-item') {
                this.remove(data.id)
            }
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
        getData() {
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.get("http://34.133.101.69:10000/position", { headers: HEADERS }).then(response => {
                this.data = response.data
            })
        },
        submit() {
            const payload = this.form
            const HEADERS = {
                Authorization: `Bearer ${this.$cookie.get('token')}`
            }
            axios.post("http://34.133.101.69:10000/position", payload, { headers: HEADERS }).then(response => {
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
                axios.delete("http://34.133.101.69:10000/position/" + id, { headers: HEADERS }).then(response => {
                    this.getData()
                })
            }
        }
    }
}
</script>
