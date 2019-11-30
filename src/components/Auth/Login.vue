<template>
    <div class="app-login gradient-blue">
        <div class="login-small">
        	<h1 class="txt-site txt-main txt-center">
        		LOGO
        	</h1>
        	<div>
                <div class="fs-text" v-if="frameErr">
                    <div class="txt-site txt-11 txt-danger txt-center">
                        {{ message }}
                    </div>
                </div>
        		<form @submit.prevent="doLogin()">
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            v-model="user.Email"
                            class="txt txt-sekunder-color" />
                        <div class="padding-top-10px" v-if="frameErrEmail">
		                    <div class="txt-site txt-11 txt-danger">
		                        {{ messageEmail }}
		                    </div>
		                </div>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input 
                            type="Password" 
                            v-model="user.Password"
                            class="txt txt-sekunder-color" />
                        <div class="padding-top-10px" v-if="frameErrPass">
		                    <div class="txt-site txt-11 txt-danger">
		                        {{ messagePass }}
		                    </div>
		                </div>
                    </div>

	        		<div class="margin-15px">
	        			<input 
	                        type="submit" 
	                        :value="valLogin" 
	                        :disabled="disLogin"
	                        class="btn btn-blue btn-width-all">
	        		</div>
	        	</form>
        	</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            url: 'https://cors-anywhere.herokuapp.com/http://apikem.asmilahotel.space/login',
            message: '',
            messageEmail: '',
            messagePass: '',
            valLogin: 'Login',
            disLogin: false,
            frameErr: false,
            frameErrEmail: false,
            frameErrPass: false,
            user: {
                Email: '',
                Password: ''
            }
        }
    },
    methods: {
        doLogin () {
            var vm = this
            this.frameErr = false
            this.frameErrEmail = false
            this.frameErrPass = false

            if (this.user.Email !== '' && this.user.Password !== '') 
            {
                this.valLogin = 'Please Wait...'
                this.disLogin = true
                // this.$router.go({name: 'beranda'})
                this.$router.push('/beranda')
                // axios.post(this.url, {
                //     'email': this.user.Email,
                //     'password': this.user.Password
                // })
                // .then(response => {
                //     console.log(response)
                //     if (response.data.status === 'F') 
                //     {
                //         vm.frameErr = true
                //         vm.message = response.data.message
                //         vm.valLogin = 'Try Again'
                //         vm.disLogin = false
                //     }
                //     if (response.data.status === 'S') 
                //     {
                //         vm.valLogin = 'Success'
                //         vm.disLogin = true
                //         this.$cookie.set('id', response.data.data.id, 2)
                //         this.$cookie.set('id_avatar', response.data.data.id_avatar, 2)
                //         this.$cookie.set('nama', response.data.data.nama, 2)
                //         this.$cookie.set('Email', response.data.data.Email, 2)
                //         // window.location = vm.initUrl
                //         this.$router.go({name: 'home'})
                        
                //     }
                // })
                // .catch(e => {
                //     //main error
                //     if (e.response.status == 405) 
                //     {
                //         var msg = e.response.statusText
                //     }
                //     vm.frameErr = true
                //     vm.message = msg
                //     vm.valLogin = 'Try Again'
                //     vm.disLogin = false
                //     // console.log(e)
                // })
            } 
            else 
            {
                vm.frameErr = true
                vm.message = 'Email dan password harus diisi'
            }
        }
    },
    beforeCreate: function () {
        if (this.$cookie.get('id')) 
        {
            this.$router.push('/')
        }
    }
}
</script>
