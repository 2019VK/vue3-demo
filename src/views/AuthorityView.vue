<template>
<!-- 展示权限的树 -->
  <el-tree
    ref="treeRef"
    :data="list"
    show-checkbox
    node-key="roleId"
    :default-checked-keys="authorityId"
    :props="defaultProps"
    check-strictly
  />
  <el-button type="primary" @click="confirmChange">确认修改</el-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getAuthorityList } from "../request/api";
import { InitData } from "../type/authority";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "AuthorityView",
  setup() {
    // 引入路由，路由器
    const route = useRoute();
    const router = useRouter();
    // 接收路由参数
    const params: any = route.params;
    const data = reactive(new InitData(params.id, params.authority));
    const defaultProps = reactive({
      children: "roleList",
      label: "name",
    });

    onMounted(() => {
      getAuthorityList().then((res) => {
        console.log(res);
        data.list = res.data;
      });
    });

    // 确认修改函数
    function confirmChange() {
      console.log(
        data.treeRef.getCheckedKeys().sort((a: number, b: number) => a - b)
      );
      router.push("/rolelist");
    }

    return {
      ...toRefs(data),
      defaultProps,
      confirmChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>