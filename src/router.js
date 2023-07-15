import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Bag from './views/Bag.vue'
import Account from './views/Account.vue'
import Settings from './views/Settings.vue'
import Orders from './views/Orders.vue'
import Order from './views/Order.vue'
import Checkout from './views/Checkout.vue'
import OrderSuccess from './views/OrderSuccess.vue'
import Product from './views/Product.vue'
import Collection from './views/Collection.vue'
import NewArrivals from './views/NewArrivals.vue'
import Contact from './views/Contact.vue'
import FAQs from './views/FAQs.vue'
import Search from './views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/shop/new-arrivals',
    name: 'NewArrivals',
    component: NewArrivals,
  },
  {
    path: '/shop/:collection',
    name: 'Collection',
    component: Collection,
  },
  {
    path: '/bag',
    name: 'Bag',
    component: Bag,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/account/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/account/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: '/account/orders/:id',
    name: 'Order',
    component: Order,
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/account/orders/:id/success',
    name: 'OrderSuccess',
    component: OrderSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: '/p/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQs,
  },
  {
    path: '/s',
    name: 'Search',
    component: Search,
  },

  // {
  //   path: "/:catchAll(.*)",
  //   component: E404,
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  scrollTo(0, 0)
  if (store.state.user === null && requiresAuth) {
    next({ name: 'Account' })
  } else {
    next()
  }
})

export default router
