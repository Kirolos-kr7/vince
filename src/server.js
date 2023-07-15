const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

const fb = require('firebase')
const fs = require('firebase/firestore')
const firebaseConfig = {
  apiKey: 'AIzaSyCrB_ryvlydbAqGaM5r7kZKPrXe3qVZEoQ',
  authDomain: 'vince-x.firebaseapp.com',
  projectId: 'vince-x',
  storageBucket: 'vince-x.appspot.com',
  messagingSenderId: '1063750321419',
  appId: '1:1063750321419:web:9d85e25f64cfb3ed8d4e0e',
  measurementId: 'G-GX24MLJTL5',
}
fb.default.initializeApp(firebaseConfig)
const db = fb.firestore()
const timestamp = fb.default.firestore.Timestamp

let orderRef = db.collection('orders').doc()

app.post('/create-checkout-session', async (req, res) => {
  let orderedProducts = req.body.orderPayload
  let userData = req.body.user
  let orderDetails = []
  let products = []
  let price = 0

  for (let index = 0; index < orderedProducts.length; index++) {
    let dbRef = db.collection('products').doc(orderedProducts[index].ID)

    let payload = await dbRef.get()
    orderDetails.push({
      price_data: {
        currency: 'egp',
        product_data: {
          name: payload.data().name,
        },
        unit_amount: payload.data().price * 100,
      },
      quantity: orderedProducts[index].quantity,
    })

    products.push(payload.data())
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: orderDetails,
      success_url: `http://localhost:3000/checkout`,
      cancel_url: `http://localhost:3000/checkout`,
    })

    session.success_url = `http://localhost:3000/account/orders/${orderRef.id}/success?strkey='${session.id}'`

    res.json(session.url)
  } catch (err) {
    console.log(err)
  }
})

app.get('/', (req, res) => {
  res.send('Running 🏃')
})

app.listen(4242, () => console.log('Running on port 4242'))
