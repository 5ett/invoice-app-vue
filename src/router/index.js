import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InvoiceView from '../views/InvoiceView.vue';
import Pass from '../views/Pass.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: InvoiceView,
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Pass,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
