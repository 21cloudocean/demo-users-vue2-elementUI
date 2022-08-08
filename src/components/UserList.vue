<template>
  <div>
    <h1>UserList</h1>
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
      // console.log(res)
      // res.status 等于 0 表示数据请求成功，否则，请求失败
      if (res.status !== 0) return console.log('用户列表数据请求失败！')
      this.userList = res.data
    }
  }
}
</script>

<style lang="less" scoped></style>
