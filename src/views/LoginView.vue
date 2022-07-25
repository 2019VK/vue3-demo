<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <h1 class="form-title">后台管理系统</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <div class="button-center">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="form-button"
            >登录</el-button
          >
          <el-button @click="resetForm(ruleFormRef)" class="form-button"
            >重置</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import { login } from '../request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "LoginView",
  setup() {
    const data = reactive(new LoginData());
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter(); // 相当于$router
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号的长度在3-10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码的长度在3-10之间",
          trigger: "blur",
        },
      ],
    };
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      // 对表单内容进行验证
      // valid是布尔值，为true则为验证成功，否则验证失败
      formEl.validate((valid) => {
        if (valid) {
          // 验证成功，发请求
          login(data.ruleForm).then((res) => {
            // 请求成功，储存token到本地
            localStorage.setItem('token',res.data.token)
            // 登录成功，跳转到首页
            router.push('/')
          })
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      submitForm,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.jpg");
  padding: 1px;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    // padding: 200px 0;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 40px;
    border-radius: 20px;

    .form-title {
      text-align: center;
      font-weight: 600;
      margin-bottom: 25px;
    }

    .button-center {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .form-button {
        margin-top: 20px;
        width: 180px;
        height: 32px;
      }
    }
  }
}
</style>