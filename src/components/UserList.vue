<template>
  <div>
    <!-- 用户的表格 -->
    <el-table :data="userList" stripe border>
      <!-- 每列信息 -->
      <!-- 第一列是索引列，只要type写成index，它就是索引列-->
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column label="年龄" prop="age"> </el-table-column>
      <el-table-column label="头衔" prop="position"> </el-table-column>
      <el-table-column label="创建时间" prop="addtime"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      // 用户列表数据，默认为空数组
      userList: []
    }
  },
  created() {
    // 调用methods中声明的请求用户列表数据的方法
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/api/users')

      // res.status 等于 0 表示数据请求成功，否则，请求失败
      if (res.status !== 0) return console.log('用户列表数据请求失败！')
      console.log(res.data)
      this.userList = res.data
    }
  }
}
</script>

<style lang="less" scoped></style>
