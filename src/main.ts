import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入element plus的文件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)


app.mount('#app')
 