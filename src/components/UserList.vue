<template>
  <div>
    <!-- 添加新用户的按钮 -->
    <el-button type="primary" @click="dialogVisible = true"
      >添加新用户</el-button
    >
    <!-- 用户的表格 -->
    <el-table :data="userList" stripe border>
      <!-- 每列信息 -->
      <!-- 第一列是索引列，只要type写成index，它就是索引列-->
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column label="年龄" prop="age"> </el-table-column>
      <el-table-column label="头衔" prop="position"> </el-table-column>
      <el-table-column label="创建时间">
        <!-- element UI 自定义列模板 -->
        <!-- 注意：官网的slot-scoped是旧写法，我们写v-slot:default="scope" -->
        <template v-slot:default="scope">
          {{ scope.row.addtime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- v-slot:default = "scope"可以简写为两种形式：
（1）#default = "scope"
（2）v-slot = "scope" -->
        <template v-slot:default="{ row }">
          <div>
            <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户的对话框 -->
    <!-- 写在哪儿都行，对话框不在workflow里 -->
    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onDialogClosed"
    >
      <!-- 添加用户的表单 -->
      <el-form
        :model="form"
        label-width="80px"
        :rules="formRules"
        ref="myaddForm"
      >
        <!-- 采集用户姓名 -->
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 采集用户年龄 -->
        <el-form-item label="用户年龄" prop="age">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 采集用户头衔 -->
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model="form.position" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddNewUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    // 声明校验年龄的函数，注意是在return的外面
    let checkAge = (rule, value, cb) => {
      if (!Number.isInteger(value)) {
        return cb(new Error('请填写整数！'))
      }
      if (value > 100 || value < 1) {
        return cb(new Error('年龄必须在1到100之间'))
      }
      cb()
    }
    return {
      // 用户列表数据，默认为空数组
      userList: [],
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      // 要采集的用户的信息对象
      form: {
        name: '',
        age: '',
        position: ''
      },
      // 表单的验证规则对象
      formRules: {
        name: [
          { required: true, message: '姓名是必填项', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 1 到 15 个字符',
            trigger: 'blur'
          }
        ],
        age: [
          { required: true, message: '年龄是必填项', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        position: [
          { required: true, message: '头衔是必填项', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
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
    },
    // 监听对话框关闭的事件
    onDialogClosed() {
      this.$refs.myaddForm.resetFields()
    },
    // 用户点击了确定按钮
    onAddNewUser() {
      this.$refs.myaddForm.validate(async (valid) => {
        // console.log(valid)
        //valid是个布尔值
        if (!valid) return
        // 需要执行添加的业务处理
        const { data: res } = await this.$http.post('/api/users', this.form)
        // console.log(res)
        if (res.status !== 0) return this.$message.error('添加用户失败！')
        // console.log('添加成功')
        this.$message.success('添加成功！')
        // 添加成功后关闭对话框
        this.dialogVisible = false
        // 添加成功后立即刷新列表
        this.getUserList()
      })
    },
    // 用户点击了删除链接
    async onRemove(id) {
      // 点击取消后会在console中报错，为了取消报错，使用.catch把错误也return出去，交给confirmResult接收
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('取消了删除！')
      const { data: res } = await this.$http.delete('/api/users/' + id)
      if (res.status !== 0) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      // 删除成功后立即刷新列表
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
