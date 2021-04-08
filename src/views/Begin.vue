<template>
    <div id="User">
      <section>
        <div class="container">
            <div class="user signinBx">
                <div class="imgBx"><img src="../assets/signin.jpg"></div>
                <div class="formBx">
                    <form>
                        <h2>Sign In</h2>
                        <el-input type="text" placeholder="Email" v-model="InEmail" style="margin-top: 20px;" maxlength="30" show-word-limit/>
                        <el-input type="password" placeholder="Password" v-model="InPassword" show-password maxlength="30" show-word-limit/>
                        <input type="submit" value="Login" @click="signIn"/>
                        <p class="signup">Don't have an account?
                          <a @click="toggleForm" style="cursor: pointer">Sign up.</a>
                        </p>
                    </form>
                </div>
            </div>
            <div class="user signupBx">
                <div class="formBx">
                    <form>
                        <h2>Create an account</h2>
                        <el-input type="text"
                                  placeholder="Username"
                                  v-model="UpUsername"
                                  style="margin-top: 20px"
                                  maxlength="10"
                                  show-word-limit/>
                        <el-input type="text" placeholder="Email Address" v-model="UpEmail" maxlength="30" show-word-limit/>
                        <el-input type="password" placeholder="Create Password" v-model="UpPassword" show-password maxlength="30" show-word-limit/>
                        <el-input type="password" placeholder="Confirm Password" v-model="ConfirmPassword" show-password maxlength="30" show-word-limit/>
                        <input type="submit" value="Sign Up" @click="signUp">
                        <p class="signup">Already have an account?
                          <a @click="toggleForm" style="cursor: pointer">Sign in.</a>
                        </p>
                    </form>
                </div>
                <div class="imgBx"><img src="../assets/signup.jpg"></div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
export default {
    name: 'User',
    data(){
      return{
        InEmail:"",
        InPassword:'',

        UpUsername:'',
        UpEmail:'',
        UpPassword:'',
        ConfirmPassword:'',
      }
    },
    methods:{
        toggleForm(){
          let section = document.querySelector('section');
          let container = document.querySelector('.container');
          container.classList.toggle('active');
          section.classList.toggle('active');
        },
        signIn(){
          if (this.InPassword===''||this.InEmail===''){
            this.$message({
              type:"error",
              message:"帐号或密码不能为空"
            })
          }else {
            this.axios
                .post("/user/login",
                    this.$qs.stringify({
                      userEmail:this.InEmail,
                      userPassword:this.InPassword,
                    }))
                .then((response)=>{
                  console.log(response.data)
                  let status = response.data["status"]
                  console.log(status)
                  if (status==="notExist"){
                    this.$message({
                      type:'error',
                      message:'用户不存在',
                    })
                  }else if(status==="error"){
                    this.$message({
                      type:"error",
                      message:"帐号或密码错误"
                    })
                  }else if(status==="inActivated"){
                    this.$message({
                      type:'error',
                      message:'用户未激活',
                    })
                  }else if (status==="loggedOut"){
                    this.$message({
                      type:'error',
                      message:'用户已注销',
                    })
                  }else if (status==="success"){
                    this.$message({
                      type:'success',
                      message:'登录成功',
                    })
                    this.$store.commit({
                      type:'edit',
                      userId:response.data["userId"],
                      userName:response.data["userName"],
                      position:response.data["position"],
                    })
                    this.$router.push("/main/home")
                  }else {
                    this.$message({
                      type:'error',
                      message:'密码错误',
                    })
                  }
                })
                .catch((response)=>{
                  console.log(response)
                })
          }
        },
        signUp(){
          console.log(this.UpUsername,this.UpPassword,this.UpPassword,this.ConfirmPassword);

          if (this.UpUsername===''||this.UpEmail===''||this.UpPassword===''||this.ConfirmPassword===""){
            this.$message({
              type:"error",
              message:"请输入完整用户信息"
            })
          }else if(this.UpPassword!==this.ConfirmPassword){
            this.$message({
              type:"error",
              message:"输入密码不一致",
            })
          }else{
            this.axios.post("/user/logUp",
                this.$qs.stringify({
                  userName:this.UpUsername,
                  userEmail:this.UpEmail,
                  userPassword:this.UpPassword
                }))
              .then((response)=>{
                console.log(response)
                let status = response.data["status"]
                  console.log(status)
                  if(status==="isExist"){
                      this.$message({
                        type:"error",
                        message:"用户已存在"
                      })
                  }else if (status==="success"){
                    this.$message({
                      type:"success",
                      message:"用户注册成功"
                    })
                    this.toggleForm()
                  }
                })
              .catch((response)=>{
                console.log(response)
              })
          }
        },
    },
}
</script>


<style scoped>

 body,html,div{ padding:0; margin:0;} 

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
}
section{
    position: relative;
    min-height: 100vh;
    background: #557085;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: 0.5s;
}
section.active{
    background: #3e3f39;
}
section .container{
    position: relative;
    width: 800px;
    height: 500px;
    background: #fff;
    box-shadow: 0 15px 50px rgba(0,0,0,0.1);
    overflow: hidden;
}
section .container .user{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}
section .container .user .imgBx{
    position: relative;
    width: 50%;
    height: 100%;
    transition: 0.5s;
}
section .container .user .imgBx img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

section .container .user .formBx{
    position: relative;
    width: 50%;
    height: 100%;
    background: #90c8e0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    transition: 0.5s;
}
section .container .user .formBx h2{
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    color: #555;
}
section .container .user .formBx input{
    width: 100%;
    padding: 10px;
    background: #f5f5f5;
    color: #333;
    border: none;
    outline: none;
    font-size: 14px;
    margin: 8px 0;
    letter-spacing: 1px;
    font-weight: 300;
}
section .container .user .formBx input[type="submit"]{
    max-width: 100px;
    background: #677eff;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: 0.5s;
}
section .container .user.signupBx .formBx input[type="submit"]{
    background: #e73e49;
}
section .container .user .formBx .signup{
    position: relative;
    margin-top: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #555;
    text-transform: uppercase;
    font-weight: 300;
}
section .container .user .formBx .signup a{
    font-weight: 600;
    text-decoration: none;
    color: #577eff;
}
section .container .signupBx{
    pointer-events: none;
}
section .container.active .signupBx{
    pointer-events: initial;
}
section .container .signupBx .formBx{
    top: 100%;
}
section .container.active .signupBx .formBx{
    top: 0;
}
section .container .signupBx .imgBx{
    top: -100%;
    transition: 0.5s;
}
section .container.active .signupBx .imgBx{
    top: 0;
}
section .container .signinBx{
    top: 0;
}
section .container.active .signinBx .formBx{
    top: 100%;
}
section .container .imgBx{
    top: 0;
    transition: 0.5s;
}
section .container.active .signinBx .imgBx{
    top: -100%;
}
@media (max-width: 991px){
    section .container{
        max-width: 400px;
    }
    section .container .imgBx{
        display: none;
    }
    section .container .user .formBx{
        width: 100%;
    }
    section .container.active .signinBx .formBx{
        top: -100%;
    }
}
</style>