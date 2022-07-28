<template>
  <div>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchData.nickName" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="searchData.role"
          class="m-2"
          placeholder="请选择"
          size="large"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 展示用户列表的el表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <span class="role" v-for="item in scope.row.role" :key="item.role">{{
            item.roleName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            link
            size="small"
            @click="editorUser(scope.row)"
            >编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户的弹窗 -->
    <el-dialog v-model="isShow" title="编辑信息">
      <el-form :model="active">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="active.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <el-select v-model="active.role" placeholder="请选择" multiple>
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="updateUser">确定修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { getUserList, getRoleList } from "../request/api";
import { InitData, ListInt } from "../type/user";

export default defineComponent({
  name: "UserList",
  setup() {
    // 获取服务器数据
    onMounted(() => {
      getUser();
      getRole();
    });

    const data = reactive(new InitData());

    // 获取用户信息
    function getUser() {
      getUserList().then((res) => {
        // console.log(res);
        data.list = res.data;
      });
    }
    // 获取角色信息函数
    function getRole() {
      getRoleList().then((res) => {
        // console.log(res);
        data.roleList = res.data;
      });
    }
    // 搜索函数
    function onSearch() {
      let arr: ListInt[] = [];
      // console.log(data.searchData.nickName);
      if (data.searchData.nickName || data.searchData.role) {
        if (data.searchData.nickName) {
          arr = data.list.filter(
            (item) => item.nickName.indexOf(data.searchData.nickName) != -1
          );
        }
        if (data.searchData.role) {
          arr = (data.searchData.nickName ? arr : data.list).filter((item) =>
            item.role.find((val) => val.role === data.searchData.role)
          );
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
    }
    // 编辑角色函数
    function editorUser(row: ListInt) {
      data.isShow = true;
      data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value: any) => value.role || value.roleId),
      };
    }
    // 点击确认更新执行函数
    function updateUser() {
      // console.log(data.active);
      data.isShow = false;
      let obj: any = data.list.find((item) => item.id === data.active.id);
      obj.nickName = data.active.nickName;
      obj.userName = data.active.userName;
      obj.role = data.roleList.filter(
        (value) => data.active.role.indexOf(value.roleId) !== -1
      );
      // console.log(obj);
      data.list.forEach((value, i) => {
        if (value.id === obj.id) data.list[i] = obj;
      });
    }

    // 监听搜索框的为空为空重新获取数据渲染
    watch([() => data.searchData.nickName, () => data.searchData.role], () => {
      if (!data.searchData.nickName && data.searchData.role === 0) {
        getUser();
        getRole();
      }
    });

    return {
      ...toRefs(data),
      onSearch,
      editorUser,
      updateUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.role {
  color: var(--el-color-primary);
  margin: 0 4px;
}
</style>