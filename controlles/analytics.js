const Order = require('../models/Order')
const errorHandler = require('../unils/errorHandler')
const moment = require('moment')

module.exports.overview = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        //pzdc bl !!!
        //number order yesterday
        const yesterdayOrdersNumber = yesterdayOrders.length
        //number order
        const totalOrdersNumber = allOrders.length
        //number days all
        const daysNumber = Object.keys(ordersMap).length
        //orders on day
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        //((order yesterday \ number order on day) - 1) * 100
        //% of number ordes
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
        //all price
        const totalGain = calculatePrice(allOrders)
        //price on day
        const gainPerDay = totalGain / daysNumber
        //price on yesterday
        const yesterdayGain = calculatePrice(yesterdayOrders)
        //% price
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
        //comparison price
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        //comparison order
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                persent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                persent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })


    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.analytics = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)

        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

        const chart = Object.keys(ordersMap).map(label => {
            //label == 05.05.2020
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            return {label, order, gain}

        })

        res.status(200).json({average, chart})

    } catch (e) {
        errorHandler(res, e)
    }


}


function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) {
            return
        }
        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })

    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantety
        }, 0)
        return total += orderPrice
    }, 0)
}


