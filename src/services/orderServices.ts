/*======= Internal Modules or Files =======*/
// Models
import { Order } from '../models/orderSchema'
// Types
import { IOrder } from '../types/orderTypes'
// Utils
import { createHTTPError } from '../utils/createError'

// get all orders
export const getOrders = async () => {
  const category = await Order.find()
  return category
}

// get single order
export const findOrder = async (_id: string) => {
  const singleOrder = await Order.findById(_id)
  if (!singleOrder) {
    throw createHTTPError(404, `Order not found with id ${_id}`)
  }
  return singleOrder
}

// create new order
export const createNewOrder = async (order: IOrder) => {
  const newOrder = new Order(order)
  await newOrder.validate()

  newOrder.save()
  return newOrder
}

// update order
export const updateOrder = async (id: string, order: IOrder) => {
  console.log(order)

  const orderToValidate = new Order(order)
  await orderToValidate.validate()

  const updatedOrder = await Order.findByIdAndUpdate({ _id: id }, order, { new: true })
  if (!updatedOrder) {
    throw createHTTPError(404, `order not found with id ${id}`)
  }
  return updatedOrder
}

// delete order
export const deleteOrder = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id)
  if (!deletedOrder) {
    throw createHTTPError(404, `Order not found with id ${id}`)
  }
  return deletedOrder
}