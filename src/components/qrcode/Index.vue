<template>
    <div class="app-login gradient-blue">
        <div class="login-content background-white">
            <div class="padding-20px">
                <h1 class="txt-site txt-20 txt-center txt-main txt-bold">
                    Scan This QR For Absence
                </h1>
                <div class="padding-10px"></div>
                <div style="position: relative; width:300px; margin: auto;">
                    <qr-code :text="uuid" size="300"></qr-code>
                </div>
                <div class="padding-10px"></div>
                <div class="txt-site txt-13 txt-center txt-main txt-bold">
                    QR code will change on : {{ times }} s
                </div>
                <div style="text-align: center; margin-top: 20px">
                    <button type="button" class="btn btn-primary" @click="refreshQRCode()">
                        Refresh QR Code Manual
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid'

export default {
    data () {
        return {
            uuid: 'RSUD#' + uuid.v4(),
            times: 15,
        }
    },
    mounted() {
        setInterval(() => {
            this.times -= 1
            if (this.times === 0) {
                this.times = 15
                this.refreshQRCode()
            }
        }, 1000)
    },
    methods: {
        refreshQRCode() {
            this.uuid = 'RSUD#' + uuid.v4()
            this.times = 15
        }
    },
}
</script>