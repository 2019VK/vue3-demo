<template>
  <div>
    <!-- 顶部搜索框 -->
    <div class="search-box">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="searchData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="searchData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 商品列表 -->
    <div class="goodsList">
      <el-table :data="computList" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180" />
        <el-table-column prop="title" label="商品名称" width="180" />
        <el-table-column prop="introduce" label="商品介绍" />
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="searchData.pageSize"
        :total="searchData.count"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { getGoodsList } from "../request/api";
import { InitgoodsList, ListInt } from "../type/goodsList";

export default defineComponent({
  name: "goodsList",
  setup() {
    // 生命周期中先获取一下数据
    onMounted(() => {
      getList();
    });

    const data = reactive(new InitgoodsList());
    // 计算要展示的数据
    const computList = computed(() => {
      const start = (data.searchData.page - 1) * data.searchData.pageSize;
      const end = data.searchData.page * data.searchData.pageSize;
      return data.list.slice(start, end);
    });

    // 发起请求获取数据
    function getList() {
      getGoodsList().then((res) => {
        data.list = res.data;
        data.searchData.count = res.data.length;
      });
    }

    // 改变当前页码的函数
    function currentChange(page: number) {
      data.searchData.page = page;
    }
    // 改变一页显示多少数据
    function sizeChange(pageSize: number) {
      data.searchData.pageSize = pageSize;
    }
    // 搜索啊含糊
    function onSearch() {
      let arr: ListInt[] = [];  // arr来显示搜索结果
      // 当搜索栏里任意一个有数据
      if (data.searchData.title || data.searchData.introduce) {
        // 先判断一个框，如果有，用filter过滤一下
        if (data.searchData.title) {
          arr = data.list.filter(
            (item) => item.title.indexOf(data.searchData.title) != -1
          );
        }
        if (data.searchData.introduce) {
          arr = data.list.filter(
            (item) => item.introduce.indexOf(data.searchData.introduce) != -1
          );
        }
      // 如果都没有，则展示所有数据 
      } else {
        arr = data.list;
      }
      data.searchData.count = arr.length;
      data.list = arr;
    }

    // 监听搜索框的两个数据，如果都为空则发起请求重新获取数据展示 
    watch(
      [() => data.searchData.title, () => data.searchData.introduce],
      () => {
        if (!data.searchData.title && !data.searchData.introduce) {
          getList();
        }
      }
    );

    return {
      ...toRefs(data),
      currentChange,
      sizeChange,
      computList,
      onSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.goodsList {
  background-color: #eee;
  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>