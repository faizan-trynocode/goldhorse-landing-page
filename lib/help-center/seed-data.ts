import type { HelpCategory } from "./types";

export const helpCategories: HelpCategory[] = [
  {
    id: "account-related",
    title: "Account related",
    children: [
      {
        id: "account-opening-related",
        title: "Account opening related",
        articles: [
          { id: "online-account-opening-guide", title: "Online Account Opening Guide" },
          { id: "online-account-opening-guide-investor-immigration", title: "Online Account Opening Guide for Investor Immigration" },
          { id: "offline-account-opening-procedures", title: "Offline account opening procedures" },
          { id: "what-documents-are-required-to-open-an-account", title: "What documents are required to open an account?" },
          { id: "how-can-i-contact-you-if-i-want-to-check-my-account-information", title: "How can I contact you if I want to check my account information?" },
          { id: "cybersecurity-tips", title: "Cybersecurity Tips" },
          { id: "our-office-hours", title: "Our office hours" },
          { id: "how-to-update-your-personal-profile", title: "How to update your personal profile" },
          { id: "log-in-to-trade", title: "Log in to trade" },
        ],
      },
      {
        id: "form-download",
        title: "Form download",
        articles: [
          { id: "account-opening-form", title: "Account Opening Form" },
          { id: "account-update-form", title: "Account Update Form" },
          { id: "authorization-form", title: "Authorization Form" },
        ],
      },
    ],
  },
  {
    id: "funds-related",
    title: "Funds related",
    children: [
      {
        id: "deposit-and-withdrawal",
        title: "Deposit and withdrawal",
        articles: [
          { id: "how-to-deposit-money", title: "How to deposit money" },
          { id: "edda-electronic-direct-payment", title: "eDDA Electronic Direct Payment" },
          { id: "how-to-withdraw-funds", title: "How to withdraw funds" },
        ],
      },
      {
        id: "currency-exchange",
        title: "Currency exchange",
        articles: [
          { id: "how-to-exchange-currency", title: "How to exchange currency" },
          { id: "single-currency-purchasing", title: "Single currency purchasing" },
        ],
      },
    ],
  },
  {
    id: "stock-transfer",
    title: "Stock transfer",
    children: [
      {
        id: "hong-kong-stock-transfer",
        title: "Hong Kong stock transfer",
        articles: [
          { id: "transfer-information-hong-kong-stocks", title: "Transfer information (Hong Kong stocks)" },
        ],
      },
      {
        id: "us-stock-transfer",
        title: "US stock transfer",
        articles: [
          { id: "transfer-information-us-stocks", title: "Transfer information (US stocks)" },
        ],
      },
    ],
  },
  {
    id: "fee-standard",
    title: "Fee Standard",
    children: [
      {
        id: "trading-fees",
        title: "Trading fees",
        articles: [
          { id: "hong-kong-stock-trading-fees", title: "Hong Kong stock trading fees" },
          { id: "shanghai-and-shenzhen-stock-trading-fees", title: "Shanghai and Shenzhen stock trading fees" },
          { id: "us-stock-trading-fees", title: "US stock trading fees" },
          { id: "taiwan-stock-trading-fees", title: "Taiwan stock trading fees" },
          { id: "fund-transaction-fees", title: "Fund transaction fees" },
        ],
      },
    ],
  },
  {
    id: "hong-kong-stock-market-trading",
    title: "Hong Kong stock market trading",
    children: [
      {
        id: "trading-rules",
        title: "Trading Rules",
        articles: [
          { id: "hong-kong-stock-trading-hours", title: "Hong Kong stock trading hours" },
          { id: "hong-kong-stock-trading-rules", title: "Hong Kong stock trading rules" },
          { id: "are-there-price-limits-for-hong-kong-stocks", title: "Are there price limits for Hong Kong stocks?" },
          { id: "what-is-the-trading-unit-for-hong-kong-stocks", title: "What is the trading unit for Hong Kong stocks?" },
          { id: "arrangements-for-trading-suspension", title: "Arrangements for trading suspension" },
        ],
      },
    ],
  },
  {
    id: "us-stock-market-trading",
    title: "US stock market trading",
    children: [
      {
        id: "trading-rules",
        title: "Trading Rules",
        articles: [
          { id: "important-notice-regarding-us-stocks", title: "Important Notice Regarding US Stocks" },
          { id: "us-stock-trading-hours", title: "US stock trading hours" },
          { id: "can-i-sell-us-stocks-immediately-after-buying", title: "Can I sell US stocks immediately after buying?" },
          { id: "are-there-limits-on-the-daily-price-fluctuation", title: "Are there limits on the daily price fluctuation?" },
          {
            id: "what-is-the-minimum-trading-unit-for-us-stocks",
            title: "What is the minimum trading unit for US stocks?",
            content: 'Unlike A-shares and Hong Kong stocks, US stocks do not have the concept of "lots"; the smallest trading unit is one share.',
          },
        ],
      },
      {
        id: "order-type",
        title: "Order type",
        articles: [
          { id: "market-order", title: "Market order" },
          { id: "limit-order", title: "Limit order" },
          { id: "stop-order", title: "Stop order" },
        ],
      },
    ],
  },
  {
    id: "a-share-market-trading",
    title: "A-share market trading",
    children: [
      {
        id: "trading-rules",
        title: "Trading Rules",
        articles: [
          { id: "tradeable-stocks", title: "Tradeable Stocks" },
          { id: "transaction-date-arrangements", title: "Transaction date arrangements" },
          { id: "trading-hours", title: "Trading hours" },
          { id: "trading-indicators", title: "Trading Indicators" },
          { id: "settlement-currency-and-conversion", title: "Settlement currency and conversion" },
        ],
      },
    ],
  },
  {
    id: "trading-system-requirements",
    title: "Trading system requirements",
    children: [
      {
        id: "system-requirements",
        title: "System requirements",
        articles: [
          { id: "multiple-electronic-trading-channels", title: "Multiple electronic trading channels" },
        ],
      },
    ],
  },
  {
    id: "other-financial-products",
    title: "Other financial products",
    children: [
      {
        id: "structured-products",
        title: "Structured products",
        articles: [
          { id: "what-is-a-fixed-coupon-note", title: "What is a fixed-coupon note?" },
          { id: "what-is-a-snowball-coupon-note", title: "What is a Snowball Coupon Note?" },
          { id: "what-is-an-accumulator", title: "What is an accumulator?" },
          { id: "what-is-a-decumulator", title: "What is a decumulator?" },
          { id: "common-problems-with-structured-products", title: "Common problems with structured products" },
        ],
      },
    ],
  },
];
