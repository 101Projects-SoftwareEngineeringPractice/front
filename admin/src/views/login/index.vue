<template>
  <div class="login-container">
    <div class="bg"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎登陆</h3>
      </div>

      <el-form-item prop="username">

        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <div class="bottom" @click="handleLogin">
        登陆
      </div>

     
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import request from '@/utils/request'
import {setToken} from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          request({
              url: '/user/managerLogin',
              method: "post",
              data:{
                identity_card:'123456789098765432',
                password:'123456',
              }
            }).then(res=>{
              setToken(res.data)
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            }).catch(res=>{
              this.loading = false;
            })
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 30px;
    width: 85%;
    


    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 30px;
      caret-color: $cursor;

    

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    height: 40px;
    opacity: 1;
    border-radius: 27.5px;
    background: rgba(219, 237, 255, 1);
    margin-top: 20px;
  }
}
.bg{
  background: url('../../assets/bg.png');
  position: absolute;
  top: 150px;
  left: 100px;
  height: 350px;
  width: 500px;
  background-size:auto 100%;
  background-repeat: no-repeat;
}
.bottom{
  left: 0px;
  top: 0px;
  // width: 200px;
  height: 40px;
  opacity: 1;
  border-radius: 27.5px;
  background: linear-gradient(182.83deg, #4B7BF8 0%, #3991FF 100%);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4.8px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: center;
  margin: 50px auto 30px;
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  min-width: 1080px;
  // background-color: $bg;
  overflow: hidden;
  background: url('../../assets/loginbg.png');

  .login-form {
    position: relative;
    padding: 30px 35px 0;
    // margin: 100px 70% 0 0;
    left: 60%;
    top: 100px;
    overflow: hidden;
    background-color: #fff;
    height: 300px;
    width: 350px;
    height: 400px;
    opacity: 1;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.7);

    border: 2px solid rgba(255, 255, 255, 1);


  }

  .tips {
    font-size: 14px;
    color: #4583FA;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      margin: 0px auto 30px;
      text-align: center;
      opacity: 1;
      /** 文本1 */
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 43.44px;
      color: rgba(0, 0, 0, 1);
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
