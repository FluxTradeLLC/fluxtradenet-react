export const PRICING_IDS = {
  LOCAL: {
    MONTHLY: {
      INDICATORS_NT_ONLY: "price_1Rk96ZDHqntRcM5inO0o24TP",
      INDICATORS_TV_ONLY: "price_1SCOHuDHqntRcM5igLxXPiS0",
      INDICATORS_NT_AND_TV: "price_1SCOIPDHqntRcM5iITNhbT1z",
      STRATEGIES_NT_ONLY: "price_1Rk971DHqntRcM5i5pndgfLL",
      STRATEGIES_TV_ONLY: "price_1SROS6DHqntRcM5inP7na4xA",
      STRATEGIES_NT_AND_TV: "price_1SCOIgDHqntRcM5ilbjDXU7y",
      TEST: "price_1RuGDIDHqntRcM5iboesQtD5",
    },
    QUARTERLY: {
      INDICATORS_NT_ONLY: "price_1SRON8DHqntRcM5iRsZ1dyfY",
      INDICATORS_TV_ONLY: "price_1SROOwDHqntRcM5ij76tS9GM",
      INDICATORS_NT_AND_TV: "price_1SROTQDHqntRcM5i0aBM6htt",
      STRATEGIES_NT_ONLY: "price_1SROOLDHqntRcM5ibt6eXz2V",
      STRATEGIES_TV_ONLY: "price_1SROQ2DHqntRcM5i5jcqM9De",
      STRATEGIES_NT_AND_TV: "price_1SROUDDHqntRcM5iEtP8oTdK",
      TEST: "price_1SReY6DHqntRcM5iSfDXxlbC",
    },
    YEARLY: {
      INDICATORS_NT_ONLY: "price_1SRON8DHqntRcM5i7dR2zA5h",
      INDICATORS_TV_ONLY: "price_1SROOwDHqntRcM5iI0GteJvi",
      INDICATORS_NT_AND_TV: "price_1SROTQDHqntRcM5i74fxYVGa",
      STRATEGIES_NT_ONLY: "price_1SROOLDHqntRcM5iu5TZNX7b",
      STRATEGIES_TV_ONLY: "price_1SROQ2DHqntRcM5iGauOu3Na",
      STRATEGIES_NT_AND_TV: "price_1SROUDDHqntRcM5it9Hg0L3m",
      TEST: "price_1SReYEDHqntRcM5is68aYZ0C",
    },
  },
  PRODUCTION: {
    MONTHLY: {
      INDICATORS_NT_ONLY: "price_1RkWkiDHqntRcM5i8UrCeTsw",
      INDICATORS_TV_ONLY: "price_1SCOEzDHqntRcM5iSPtrtetG",
      INDICATORS_NT_AND_TV: "price_1SCOG5DHqntRcM5iouL0zesB",
      STRATEGIES_NT_ONLY: "price_1RkWkcDHqntRcM5i4MakObtw",
      STRATEGIES_TV_ONLY: "price_1SCOFJDHqntRcM5iMcAPakLT",
      STRATEGIES_NT_AND_TV: "price_1SCOGgDHqntRcM5irQtSptbE",
      TEST: "price_1RuG9KDHqntRcM5iW0OPXS5D",
    },
    QUARTERLY: {
      INDICATORS_NT_ONLY: "price_1SRfKMDHqntRcM5iuaBfCnVc",
      INDICATORS_TV_ONLY: "price_1SRfKjDHqntRcM5imzMOIHFM",
      INDICATORS_NT_AND_TV: "price_1SRfLVDHqntRcM5iTE6rTeIF",
      STRATEGIES_NT_ONLY: "price_1SRfJvDHqntRcM5iB99hqskI",
      STRATEGIES_TV_ONLY: "price_1SRfL8DHqntRcM5iqr1WKdBi",
      STRATEGIES_NT_AND_TV: "price_1SRfLpDHqntRcM5iI33ekrEa",
      TEST: "price_1SRfMLDHqntRcM5ioOdVKLRR",
    },
    YEARLY: {
      INDICATORS_NT_ONLY: "price_1SRfKSDHqntRcM5igYD2tfHy",
      INDICATORS_TV_ONLY: "price_1SRfKrDHqntRcM5ixCvRBIow",
      INDICATORS_NT_AND_TV: "price_1SRfLbDHqntRcM5iHOF6PZSG",
      STRATEGIES_NT_ONLY: "price_1SRfK5DHqntRcM5ixpmMKlmG",
      STRATEGIES_TV_ONLY: "price_1SRfLEDHqntRcM5iho69H5nu",
      STRATEGIES_NT_AND_TV: "price_1SRfLwDHqntRcM5i9ivB0MVg",
      TEST: "price_1SRfMUDHqntRcM5ip0UH9w2W",
    },
  },
};

// Pricing objects for each billing period
export const PRICING = {
  MONTHLY: {
    STRATEGIES_SINGLE: 99,
    STRATEGIES_NT_AND_TV: 119,
    INDICATORS_SINGLE: 49,
    INDICATORS_NT_AND_TV: 69,
  },
  QUARTERLY: {
    STRATEGIES_SINGLE: 265, // PLACEHOLDER - fill in quarterly price
    STRATEGIES_NT_AND_TV: 320, // PLACEHOLDER - fill in quarterly price
    INDICATORS_SINGLE: 130, // PLACEHOLDER - fill in quarterly price
    INDICATORS_NT_AND_TV: 185, // PLACEHOLDER - fill in quarterly price
  },
  YEARLY: {
    STRATEGIES_SINGLE: 990, // PLACEHOLDER - fill in yearly price
    STRATEGIES_NT_AND_TV: 1190, // PLACEHOLDER - fill in yearly price
    INDICATORS_SINGLE: 490, // PLACEHOLDER - fill in yearly price
    INDICATORS_NT_AND_TV: 690, // PLACEHOLDER - fill in yearly price
  },
};
