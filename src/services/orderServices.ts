/*======= Internal Modules or Files =======*/
// Models
import { Order } from '../models/orderSchema'
// Types
import { IOrder, orderUpdateType } from '../types/orderTypes'
// Utils
import { createHTTPError } from '../utils/createError'

/** ======================
 **     User Services
 * =======================**/

// Create order
export const saveOrder = async (order: IOrder, userId: string) => {
  const newOrder = new Order({
    ...order,
    products: order.products,
    payment: order.payment,
    buyer: userId,
  })

  await newOrder.save()
  return newOrder
}

// get My orders
export const userOrders = async (user_id: string) => {
  const order = await Order.find({ buyer: user_id })
    .populate('buyer', 'name username email address phone -_id ')
    .populate({
      path: 'products',
      populate: { path: 'product', select: 'title price description image ' },
    })
  if (!order) {
    throw createHTTPError(404, `Order with user: ${user_id} does not exist`)
  }
  return order
}

// get a specific order
export const userOrder = async (user_id: string, orderId: string) => {
  const order = await Order.find({ buyer: user_id, _id: orderId })
    .populate('buyer', 'name username email address phone -_id ')
    .populate({
      path: 'products',
      populate: { path: 'product', select: 'title price description image ' },
    })
  if (!order) {
    throw createHTTPError(404, `Order with user: ${user_id} does not exist`)
  }
  return order
}

/** ======================
 **     Admin Services
 * =======================**/

// get all users orders for admin
export const allOrders = async () => {
  const orders = await Order.find()
    .populate('buyer', 'name username _id')
    .populate({ path: 'products', populate: { path: 'product', select: 'title price ' } })
  return orders
}

// get a specific user orders
export const SingleOrder = async (id: string) => {
  const order = await Order.findById(id)
    .populate('buyer', 'name username _id ')
    .populate({
      path: 'products',
      populate: { path: 'product' },
    })
  if (!order) {
    throw createHTTPError(404, `Order with id: ${id} does not exist`)
  }
  return order
}

// update order for admin
export const updateOrder = async (id: string, order: orderUpdateType) => {
  const { products, payment, status, shipping } = order

  const existingOrder = await Order.findById(id)
  if (!existingOrder) {
    throw createHTTPError(404, `Order not found with id ${id}`)
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: id },
    {
      buyer: (existingOrder.buyer as { _id: string })._id,
      products: products && products.length > 0 ? products : existingOrder.products,
      payment: payment || existingOrder.payment,
      status: status || existingOrder.status,
      shipping: shipping || existingOrder.shipping,
    },
    { new: true }
  )
  if (!updatedOrder) {
    throw createHTTPError(404, `order not found with id ${id}`)
  }
  return updatedOrder
}

// delete order for admin
export const deleteOrder = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id)
  if (!deletedOrder) {
    throw createHTTPError(404, `Order not found with id ${id}`)
  }
  return deletedOrder
}
