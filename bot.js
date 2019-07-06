module.exports = async (token) => {
    const Telegraf = require('telegraf'),
        middlewares = require('./middleware'),
        stage = require('./stage'),
        command = require('./command'),
        Bill = require('./model/Bill'),
        User = require('./model/User'),
        actions = require('./action'),
        config = require('./config'),
        helpers = require('./helpers'),
        keys = config.keys,
        LocalSession = require('telegraf-session-local'),
        Markup = require('telegraf/markup'),
        hears = require('./hear'),
        bot = new Telegraf(token),
        {
            enter
        } = require('telegraf/stage')

    bot.catch((err) => {
        log.error('Ooops', err)
    });

    const botUser = await bot.telegram.getMe();

    // add middlewares
    bot.use(middlewares.boundUser)
    bot.use(middlewares.boundSetting)
    bot.use(middlewares.fixNumbers)
    bot.use(middlewares.checkIfGroupAdmin(botUser))
    bot.use(middlewares.checkUserCompleted)
    // session
    bot.use((new LocalSession({
        database: './session.json'
    })).middleware())
    // bot.use(session({
    //     ttl: 31104000
    // }))
    bot.use(stage.middleware())

    // dont filter messages if its in scenes
    bot.use(middlewares.filterMessages)

    // commands
    bot.start((ctx, next) => {
            if (helpers.isPrivate(ctx)) {

                if (ctx.user.stage == 'justJoined') {
                    ctx.reply('به ربات يلای آبشده خوش آمدید')
                    next()
                } else if (ctx.user.stage != 'completed') {
                    next()
                } else {
                    ctx.reply('دستور مورد نظر خود را انتخاب کنید:', Markup.keyboard([
                        [keys.openfacts, keys.monthlyReport],
                        [keys.postSettleReport, keys.semiSettle],
                        [keys.packInv, keys.changeInv],
                        [keys.userInfo, keys.contact]
                    ]).resize().extra())
                }
            }
        },
        // signup scene
        enter('singnupScene')
    )

    bot.command('init', command.init)

    //actions
    bot.action('confirm', actions.confirm)
    bot.action('cancel', actions.cancel)
    bot.action(/confirmtransaction:\d+/, actions.confirmtransaction)
    bot.action(/rejecttransaction:\d+/, actions.rejecttransaction)
    bot.action(/donetransaction:\d+/, actions.donetransaction)

    bot.action("name-view", actions.askName, enter('singnupScene'))
    bot.action("phone-view", actions.askPhone, enter('singnupScene'))
    bot.action("bank-name-view", actions.askBank, enter('singnupScene'))

    bot.action(keys.eccountant, hears.sendEccountant)
    bot.action(keys.back, hears.sendMainMenu)

    // hears
    bot.hears(/مظنه \d+/, hears.updateQuotation)
    bot.hears(/وجه تضمین \d+/, hears.updateBaseCharge)
    bot.hears(/کمیسیون \d+/, hears.updateCommition)
    bot.hears(/تلورانس \d+/, hears.updateTolelrance)
    bot.hears(/charge *\d+ *\d+/, hears.chargeUser)

    bot.hears(keys.userInfo, hears.sendUser)
    bot.hears(keys.changeInv, hears.changeInv)
    bot.hears(keys.packInv, hears.goldInv)
    bot.hears(keys.cardInfo, hears.cardInfo)
    bot.hears(keys.summitResipt, enter('summitFish'))
    bot.hears(keys.contact, hears.contact)
    bot.hears(keys.reqCash, hears.reqCash)

    bot.hears('ن', async (ctx) => {
        if (helpers.isGroup && helpers.isReply) {
            let bill = await Bill.findOne({
                messageId: ctx.message.reply_to_message.message_id
            })
            if (bill == undefined) return
            if (bill.userId != ctx.user.userId) return

            if (!bill.closed && !bill.expired) {
                bill.expired = true
                ctx.telegram.deleteMessage(ctx.chat.id, bill.messageId)
                bill.save()
            }
        }
    })

    const closeDeals = async (ctx, b, price) => {
        let totalProfit = 0
        let factorsClosed = 0
        let totalCommition = 0
        let bills = await Bill.find({
            userId: b.userId,
            closed: true,
            expired: false,
            left: {
                $gt: 0
            }
        })
        let am = b.amount
        let commition = await ctx.setting.getCommition()

        console.log(commition)
        await helpers.asyncForEach(bills, async bill => {
            if (am > 0) {
                if (bill.left > am) {
                    if (bill.sells == undefined) bill.sells = []
                    bill.sells.push({
                        am,
                        price
                    })
                    bill.left -= am
                    await bill.save()
                    am = 0
                } else {
                    am -= bill.left

                    if (bill.sells == undefined) bill.sells = []
                    bill.sells.push({
                        amount: bill.left,
                        price
                    })
                    bill.left = 0
                    bill = await bill.save()

                    let sum = 0
                    console.log(sum)
                    console.log(bill.sells)
                    await helpers.asyncForEach(bill.sells, (sell) => {
                        if (bill.isSell) {
                            sum += (bills.price - sell.price) * sell.amount
                        } else {
                            sum += (sell.price - bill.price) * sell.amount
                        }
                        console.log(sum)
                    })
                    console.log(sum)
                    sum *= 100
                    console.log(sum)
                    sum /= 4.3318
                    console.log(sum)
                    console.info('profit')
                    if (!isNaN(sum))
                        bill.profit = sum
                    bill.commition = bill.amount * commition
                    totalCommition += bill.commition
                    totalProfit += bill.profit
                    await bill.save()
                    factorsClosed++
                }
            }
        })
        return {
            totalCommition,
            totalProfit,
            factorsClosed
        }
    }


    const billToSring = async (bill, totalCommition, totalProfit) => {

        let user = await User.findOne({
            userId: bill.userId
        })

        let opfs = await Bill.countDocuments({
            userId: bill.userId,
            left: {
                $gt: 0
            },
            isSell: !bill.isSell
        })

        let avg = 0
        if (bill.isSell) avg = await helpers.sellAvg(bill.userId)
        else avg = await helpers.buyAvg(bill.userId)

        let final = totalProfit - totalCommition
        let ft = ''
        if (final < 0) {
            ft = 'ضرر'
            final = Math.abs(final)
        } else
            ft = 'سود'


        let msg = `
        👤 معامله گر گرامی ${user.name}
        
        مقدار ${(() => {if (bill.isSell) return 'فروش 🔵'; else return 'خرید 🔴'})()}  : ${bill.amount} واحد به قیمت : ${helpers.toman(bill.price)}
        
        📈 سود یا ضرر شما: ${helpers.toman(final)+ ' ' + ft}
        
        ⭕️ شما تعداد ${opfs} واحد فاکتور باز ${(() => {if (bill.isSell) return 'فروش'; else return 'فروش'})()} دارید.
        
        ⭕️ میانگین فاکتور ${(() => {if (bill.isSell) return 'فروش'; else return 'خرید'})()}: ${avg}
        
        ⭕️ چناچه قیمت مظنه به : ${helpers.toman(bill.awkwardness.awk)} برسد 
        
         📣 فاکتور ${(() => {if (bill.isSell) return 'فروش'; else return 'خرید'})()} شما به قیمت: ${helpers.toman(bill.awkwardness.sellprice)} حراج می شود. 
        
        💶 موجودی شما برابر است با : ${helpers.toman(user.charge)}`
        return msg
    }


    const makeDeal = async (ctx) => {
        let {
            isSell,
            sellerId,
            buyerId,
            amount,
            price,
            bill
        } = ctx.values
        if (sellerId == buyerId) return
        let sellerBill, buyerBill, cb, cs
        cb = await ctx.setting.getCode()
        cs = await ctx.setting.getCode()

        ctx.telegram.deleteMessage(ctx.chat.id, bill.messageId)

        if (isSell) {
            if (bill.amount == amount) {
                buyerBill = Object.assign(bill, {
                    closed: true,
                    sellerId,
                    buyerId,
                })
            } else {

                buyerBill = new Bill({
                    code: cb,
                    isSell: false,
                    closed: true,
                    userId: buyerId,
                    sellerId,
                    buyerId,
                    amount: amount,
                    price: price
                })

                /**update bill */
                bill.amount -= amount
                let z
                let emo
                if (isSell) {
                    emo = '🔴'
                    z = 'ف'

                } else {
                    emo = '🔵'
                    z = 'خ'
                }
                bill = await bill.save()
                let usr = await User.findOne({
                    userId: bill.userId
                })
                let msg = emo + ' ' + bill.amount + ' ' + z + ' ' + price + ' ' + usr.name
                ctx.telegram.editMessageText(ctx.chat.id, bill.messageId, null, msg)


            }
            sellerBill = new Bill({
                code: cs,
                isSell: false,
                closed: true,
                userId: sellerId,
                left: amount,
                sellerId,
                buyerId,
                amount: amount,
                price: price
            })
        } else {
            if (bill.amount == amount) {
                sellerBill = Object.assign(bill, {
                    closed: true,
                    sellerId,
                    buyerId,
                })
            } else {
                sellerBill = new Bill({
                    code: cs,
                    isSell: false,
                    closed: true,
                    userId: sellerId,
                    sellerId,
                    buyerId,
                    amount: amount,
                    price: price
                })
                /**update bill */
                bill.amount -= amount
                let z
                let emo
                if (isSell) {
                    emo = '🔴'
                    z = 'ف'

                } else {
                    emo = '🔵'
                    z = 'خ'
                }
                bill = await bill.save()
                let usr = await User.findOne({
                    userId: bill.userId
                })
                let msg = emo + ' ' + bill.amount + ' ' + z + ' ' + price + ' ' + usr.name
                ctx.telegram.editMessageText(ctx.chat.id, bill.messageId, null, msg)

            }
            buyerBill = new Bill({
                code: cb,
                isSell: false,
                closed: true,
                userId: buyerId,
                left: amount,
                sellerId,
                buyerId,
                amount: amount,
                price: price
            })
        }




        /***
         * 
         */

        let selRes = await closeDeals(ctx, sellerBill, price)
        let buyRes = await closeDeals(ctx, buyerBill, price)


        /**
         * if user can buy more than 1 unit count avrages
         */

        // todo count users profit

        sellerBill.awkwardness = await helpers.countAwkwardness(ctx, sellerBill)
        buyerBill.awkwardness = await helpers.countAwkwardness(ctx, buyerBill)
        sellerBill = await sellerBill.save()
        buyerBill = await buyerBill.save()

        let suser = await User.findOne({
            userId: sellerBill.userId
        })
        let buser = await User.findOne({
            userId: buyerBill.userId
        })
        buser.charge += buyRes.totalProfit
        buser.charge -= buyRes.totalCommition
        suser.charge += selRes.totalProfit
        suser.charge -= selRes.totalCommition

        await buser.save()
        await suser.save()

        let owner = await User.findOne({
            role: config.role_owner
        })
        owner.charge += buyRes.totalCommition + selRes.totalCommition
        await owner.save()

        let prev = await billPrev(sellerBill)
        let sb = await billToSring(sellerBill, selRes.totalCommition, selRes.totalProfit)
        let bb = await billToSring(buyerBill, buyRes.totalCommition, buyRes.totalProfit)
        ctx.reply(prev)
        ctx.telegram.sendMessage(sellerId, sb)
        ctx.telegram.sendMessage(buyerId, bb)
    }


    const billPrev = async (bill) => {
        let seller, suser
        let res

        let buser = await User.findOne({
            userId: bill.buyerId
        })

        if (bill.closed) {
            if (bill.sellerId == botUser.id) {
                seller = 'ربات'
            } else {
                suser = await User.findOne({
                    userId: bill.sellerId
                })
                seller = suser.name
            }
        }

        res = ''

        res += `\n شماره رسید: ${bill.code}`
        if (bill.closed) {
            res += `\n 🔴فروشنده: ${seller}`
            res += `\n 🔵خریدار: ${buser.name}`
        }
        res += `\n مقدار: ${bill.amount}`
        res += `\n قیمت: ${helpers.toman(bill.price)} تومان`
        return res
    }

    bot.hears(/\d+\s*(ف|خ)\s*\d+/, async (ctx, next) => {
        var [amount, isSell, price] = helpers.parseLafz(ctx.match[0])
        let mx = await helpers.maxGold(ctx)
        let mcb = await helpers.maxCanBuy(ctx)
        let mt = await helpers.matchTolerance(ctx, price)
        let bc = await ctx.setting.getBaseCharge()
        if (ctx.user.charge < bc) {
            return ctx.telegram.sendMessage(ctx.message.from.id, 'موجودی حساب شما کمتر از وجه تضمین است')
        }
        if (!isSell && amount > mcb) {
            return ctx.telegram.sendMessage(ctx.message.from.id, 'شما به حد اکثر میزان توانایی خرید خود رسیده اید\n اکانت خود را شارژ کرده یا موجودی آبشده خودتان را بفروشید')
        }
        if (isSell && amount > mx) {
            return ctx.telegram.sendMessage(ctx.message.from.id, 'شما به حد اکثر میزان توانایی فروش خود رسیده اید\n اکانت خود را شارژ کرده یا موجودی آبشده بخرید')
        }
        if (!helpers.isComplete(ctx)) {
            return ctx.telegram.sendMessage(ctx.message.from.id, 'لطفا ابتدا حساب خود را تکمیل نمایید')
        }
        if (!helpers.isGroup(ctx)) {
            return ctx.telegram.sendMessage(ctx.message.from.id, 'این دستور تنها در گروه قابل اجرا می باشد')
        }
        if (!mt) {
            let msg = 'قیمت وارد شما شما خارج از محدوده مجاز قیمت دهی می باشد'
            let tol = await ctx.setting.getTolerance()
            let q = await ctx.setting.getQuotation()
            let min = (q - tol)
            let max = (q + tol)
            msg += '\n\n'
            msg += `محدوده مجاز قیمت دهی \n\n ${min} الی ${max} `
            return ctx.telegram.sendMessage(ctx.message.from.id, msg)
        }
        ctx.values = {
            amount,
            isSell,
            price
        }
        next()
    }, async (ctx, next) => {
        let {
            amount,
            isSell,
            price
        } = ctx.values
        let bill

        if (helpers.isReply(ctx)) {
            bill = await Bill.findOne({
                messageId: ctx.message.reply_to_message.message_id
            })
            if (bill != undefined && !bill.closed) {
                if (bill.isSell != isSell && bill.amount >= amount && bill.price == price) {
                    let sellerId, buyerId
                    if (isSell) {
                        sellerId = ctx.state.user.userId
                        buyerId = bill.userId
                    } else {
                        buyerId = ctx.state.user.userId
                        sellerId = bill.userId
                    }
                    ctx.values = {
                        isSell,
                        sellerId,
                        buyerId,
                        amount,
                        price,
                        bill
                    }
                    //make a deal
                    next()
                } else {
                    console.log('they dont match')
                }
            } else {
                console.log('offer is over')
            }
        } else {
            let z
            let emo
            if (isSell) {
                emo = '🔴'
                z = 'ف'

            } else {
                emo = '🔵'
                z = 'خ'
            }

            let msg = emo + ' ' + amount + ' ' + z + ' ' + price + ' ' + ctx.user.name
            let res = await ctx.telegram.sendMessage(ctx.chat.id, msg)

            let c = await ctx.setting.getCode()
            bill = new Bill({
                code: c,
                userId: ctx.user.userId,
                amount: amount,
                left: amount,
                price: price,
                isSell: isSell,
                messageId: res.message_id
            })
            bill = await bill.save()
            // bill.awkwardness = await helpers.countAwkwardness(ctx, bill)
            // bill = await bill.save()

            setTimeout(async () => {
                bill = await Bill.findById(bill._id)
                if (bill == undefined) {
                    console.log('hmmmm')
                } else if (!bill.closed && !bill.expired) {
                    ctx.telegram.editMessageText(ctx.chat.id, bill.messageId, null, msg + '  منقضی شد')
                    setTimeout(() => {
                        ctx.telegram.deleteMessage(ctx.chat.id, bill.messageId)
                    }, 20000)
                    Bill.findByIdAndDelete(bill._id).exec()
                }
                if (bill.expired) {
                    Bill.findByIdAndDelete(bill._id).exec()
                }
            }, 60000)
        }
    }, makeDeal)


    bot.hears(/\d+/,
        Telegraf.branch(
            helpers.isGroup,
            Telegraf.branch(
                helpers.isReply,
                async ctx => {
                    let bill = await Bill.findOne({
                        messageId: ctx.message.reply_to_message.message_id
                    })
                    if (bill == undefined || bill.closed || bill.expired) return
                    let amount = +ctx.message.text
                    if (bill.amount < amount) return
                    let mx = await helpers.maxGold(ctx)
                    let mcb = await helpers.maxCanBuy(ctx)
                    let bc = await ctx.setting.getBaseCharge()
                    let isSell = !bill.isSell

                    if (ctx.user.charge < bc) {
                        return ctx.telegram.sendMessage(ctx.message.from.id, 'موجودی حساب شما کمتر از وجه تضمین است')
                    }
                    if (!isSell && amount > mcb) {
                        return ctx.telegram.sendMessage(ctx.message.from.id, 'شما به حد اکثر میزان توانایی خرید خود رسیده اید\n اکانت خود را شارژ کرده یا موجودی آبشده خودتان را بفروشید')
                    }
                    if (isSell && amount > mx) {
                        return ctx.telegram.sendMessage(ctx.message.from.id, 'شما به حد اکثر میزان توانایی فروش خود رسیده اید\n اکانت خود را شارژ کرده یا موجودی آبشده بخرید')
                    }
                    if (!helpers.isComplete(ctx)) {
                        return ctx.telegram.sendMessage(ctx.message.from.id, 'لطفا ابتدا حساب خود را تکمیل نمایید')
                    }

                    let price = bill.price
                    let sellerId, buyerId
                    if (isSell) {
                        sellerId = ctx.user.userId
                        buyerId = bill.userId
                    } else {
                        buyerId = ctx.user.userId
                        sellerId = bill.userId
                    }
                    ctx.values = {
                        isSell,
                        sellerId,
                        buyerId,
                        amount,
                        price,
                        bill
                    }
                    makeDeal(ctx)
                }, command.start
            ), command.start
        )
    )


    return bot
}