<template>
  <div>
    <!-- 添加角色的按钮 -->
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 展示角色的表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="changeRole(scope.row)"
            >修改权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getRoleList } from "../request/api";
import { InitData } from "../type/role";
import { ElMessage, ElMessageBox } from "element-plus";
import { RoleListInt } from "@/type/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserList",
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    onMounted(() => {
      getRoleList().then((res) => {
        // console.log(res);
        data.list = res.data;
      });
    });

    // 添加角色弹窗的配置函数
    function addRole() {
      ElMessageBox.prompt("请输入角色名", "添加", {
        confirmButtonText: "确认添加",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value) {
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "用户取消操作",
          });
        });
    }
    // 修改权限函数，传参数，并跳转
    function changeRole(row: RoleListInt) {
      console.log("row", row);
      router.push({
        name: "authority",
        params: {
          id: row.roleId,
          authority: row.authority,
        },
      });
    }

    return {
      ...toRefs(data),
      addRole,
      changeRole,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>