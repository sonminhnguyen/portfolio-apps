require('dotenv').config()

exports.up = async (knex) => {
  console.log(process.env.DB_SCHEMA);
  await knex.schema.withSchema(process.env.DB_SCHEMA).createTable('id_portfolio', function (table) {
    table.increments();
    table.float("marketPrice");
    table.string("code");
    table.integer("totalQty"); 
    table.float("costValue"); 
    table.integer("mortgageQty"); 
    table.integer("t1PendingSettlementBuyQty"); 
    table.integer("conditionalHoldQty"); 
    table.integer("t0PendingSettlementSellQty"); 
    table.integer("tradingAccSeq"); 
    table.string("marketId"); 
    table.integer("todayBuyQty"); 
    table.integer("todaySellQty"); 
    table.integer("waitingVsdWithdrawQty"); 
    table.integer("waitingTradeQty"); 
    table.float("plRatio"); 
    table.integer("pendingEntitlementQty"); 
    table.integer("todayConfirmBuyQty"); 
    table.float("marketValue4IDragon");
    table.integer("finalMarginRatio"); 
    table.string("cwPLStatus"); 
    table.string("clientId"); 
    table.integer("t2PendingSettlementBuyQty"); 
    table.integer("cwPLAmount"); 
    table.integer("marginRatio"); 
    table.integer("t0PendingSettlementBuyQty"); 
    table.string("subAccountType"); 
    table.integer("t2PendingSettlementSellQty");
    table.float("costPrice"); 
    table.float("marketValue"); 
    table.integer("totalQty4IDragon"); 
    table.integer("tradableQty");
    table.string("marketIdDisplay"); 
    table.integer("marginValue"); 
    table.integer("todayConfirmSellQty"); 
    table.string("subAccountId"); 
    table.integer("manualHoldQty"); 
    table.float("plAmount"); 
    table.integer("normalHoldQty"); 
    table.integer("waitingVsdDepositQty"); 
    table.boolean("isQueryFO"); 
    table.integer("t1PendingSettlementSellQty");
    table.string("costMode"); 
    table.string("status");
    table.timestamps();
  })
  await knex.schema.withSchema(process.env.DB_SCHEMA).createTable('id_transactions', function (table) {
    table.float("Val");
    table.date("PaymentDate");
    table.string("BrokerId");
    table.string("MarketId");
    table.float("FeeVal");
    table.string("ContractId");
    table.string("SubAccountId");
    table.float("PaymentVal");
    table.string("Side");
    table.string("StockId");
    table.float("TaxVal");
    table.float("Price");
    table.float("TaxRatio");
    table.integer("Qty");
    table.float("FeeRatio");
    table.date("TradeDate");
    table.integer("TaxCTCPVal");
    table.string("MarketId4DisPlay");
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTable('id_portfolio')
  await knex.schema.dropTable('id_transactions')
};
