export const MAIN_TEMPLATE = {
  m_Version: 12,
  DisplayName: "<CategoryName>",
  Icon: "Mushrooms",
  Color: "FBFCFEFF",
  IsExchange: 0,
  InitStockPercent: 75.0,
  Items: [],
};

export const ITEM_TEMPLATE = {
  ClassName: "<Products.split(',')[0]>",
  MaxPriceThreshold: "<Number(Products.split(',')[4])>",
  MinPriceThreshold: "<Number(Products.split(',')[4])>",
  SellPricePercent:
    "<Number(Products.split(',')[5])/Number(Products.split(',')[4]>",
  MaxStockThreshold: 1,
  MinStockThreshold: 1,
  QuantityPercent: -1,
  SpawnAttachments: [],
  Variants: [],
};
