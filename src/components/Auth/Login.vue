<template>
    <div class="app-login gradient-blue">
        <div class="login-small">
            <div class="padding-10px"></div>
        	<div class="image image-100px image-center">
                <img src="@/assets/Logo2.jpg" />
            </div>
            <div class="padding-10px"></div>
        	<div>
                <!--<h1 class="txt-site txt-18 txt-center txt-bold txt-main">LOGIN</h1>-->
                <div class="fs-text" v-if="frameErr">
                    <div class="txt-site txt-11 txt-danger txt-center">
                        {{ message }}
                    </div>
                </div>
        		<form @submit.prevent="doLogin()">
                    <div class="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            v-model="user.Username"
                            class="txt txt-sekunder-color" />
                        <div class="padding-top-10px" v-if="frameErrUsername">
		                    <div class="txt-site txt-11 txt-danger">
		                        {{ messageUsername }}
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
            url: 'http://35.192.37.30:10000/employee/login',
            message: '',
            messageUsername: '',
            messagePass: '',
            valLogin: 'Login',
            disLogin: false,
            frameErr: false,
            frameErrUsername: false,
            frameErrPass: false,
            user: {
                Username: '',
                Password: ''
            }
        }
    },
    methods: {
        doLogin () {
            var vm = this
            this.frameErr = false
            this.frameErrUsername = false
            this.frameErrPass = false

            if (this.user.Username !== '' && this.user.Password !== '') 
            {
                this.valLogin = 'Please Wait...'
                this.disLogin = true
                // this.$router.go({name: 'beranda'})
                // this.$router.push('/beranda')
                axios.post(this.url, {
                    'username': this.user.Username,
                    'password': this.user.Password
                })
                .then(response => {
                    console.log(response)

                    if (response.status === 200) 
                    {
                        vm.valLogin = 'Success'
                        vm.disLogin = true
                        this.$cookie.set('token', response.data.token, 2)
                        this.$cookie.set('Username', response.config.data.Username, 2)
                        // window.location = vm.initUrl
                        // this.$router.go({name: 'beranda'})
                        this.$router.push('/beranda')
                    }
                    else 
                    {
                        vm.frameErr = true
                        vm.message = response.data.message
                        vm.valLogin = 'Try Again'
                        vm.disLogin = false
                    }
                })
                .catch(e => {
                    //main error
                    if (e.response.status == 401) 
                    {
                        var msg = 'Username atau password anda salah.'
                    }
                    vm.frameErr = true
                    vm.message = msg
                    vm.valLogin = 'Try Again'
                    vm.disLogin = false
                    console.log(e)
                })
            } 
            else 
            {
                vm.frameErr = true
                vm.message = 'Username dan password harus diisi'
            }
        }
    },
    beforeCreate: function () {
        if (this.$cookie.get('token')) 
        {
            this.$router.push('/')
        }
    }
}
</script>
