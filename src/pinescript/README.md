# PineScript Indicators

This directory contains the PineScript source code for FluxTrade indicators.

## ⚠️ Important Limitation

**TradingView's widget API does not support loading PineScript code directly from files.** Scripts must be published on TradingView first before they can be loaded into charts programmatically.

## 🔒 Privacy Options

You have several options for keeping your indicators private:

### Option 1: Invite-Only Scripts (Recommended for Privacy)

**Invite-only scripts are PRIVATE** - they are NOT publicly visible and only accessible to users you explicitly grant access to.

**Requirements:**
- TradingView Premium account (required for invite-only publishing)
- Scripts are stored on TradingView but hidden from public view
- You control who can access them

**Steps:**
1. **Copy the script code** from the `.pine` file you want to use
2. **Open TradingView** and navigate to the Pine Editor (bottom of the chart)
3. **Paste the code** into the Pine Editor
4. **Click "Save"** and give it a name matching the indicator name
5. **Click "Add to Chart"** to test it
6. **Publish as Invite-Only:**
   - Click "Publish" in the Pine Editor
   - Select **"Invite-only script"** (NOT "Public")
   - Provide title, description, etc.
   - Submit for publication
7. **Grant access** to specific users who need it (they'll receive an invitation)
8. **Copy the script identifier** (format: `PUBLISHER@PUBLISHER_ID:SCRIPT_NAME`)
9. **Update the script identifier** in `src/components/TradingViewChart.js` in the `FLUX_INDICATORS` object

**Benefits:**
- ✅ Scripts remain private (not publicly searchable)
- ✅ Full control over who can access them
- ✅ Works with the widget API
- ✅ No code exposure to the public

**Note:** Invite-only scripts are not reviewed by TradingView moderators, so ensure compliance with TradingView's House Rules.

### Option 2: Manual Copy-Paste (No Publishing Required)

If you don't want to publish scripts at all, you can manually add them to charts:

1. **Copy the script code** from the `.pine` file
2. **Open TradingView** in a browser
3. **Open Pine Editor** (bottom of chart)
4. **Paste the code** and click "Add to Chart"

**Limitations:**
- ❌ Does NOT work with the widget API (can't be loaded programmatically)
- ❌ Must be done manually for each chart
- ❌ Users must manually add indicators themselves
- ✅ No publishing required
- ✅ Complete privacy (code never leaves your control)

### Option 3: Using TradingView REST API (Advanced)

You can use TradingView's REST API to publish scripts programmatically. This requires:
- TradingView API credentials
- Authentication token
- Script publishing permissions
- Can publish as invite-only via API

See [TradingView API Documentation](https://www.tradingview.com/api-docs/) for more details.

## File Structure

```
pinescript/
├── README.md (this file)
└── indicators/
    ├── FluxConfluence.pine
    ├── FluxPivot.pine
    ├── FluxSignal.pine
    ├── FluxTarget.pine
    ├── MarketRegime.pine
    ├── MarketPhase.pine
    ├── ParabolicRSI.pine
    ├── PreviousLevels.pine
    ├── TTMSqueeze.pine
    ├── VolatilityCycle.pine
    └── DynamicTrend.pine
```

## Indicator Mapping

Each PineScript file corresponds to an indicator defined in `src/components/TradingViewChart.js`:

| Indicator Name | File Name | Script Identifier |
|---------------|-----------|-------------------|
| FluxConfluence | `FluxConfluence.pine` | `FluxConfluence` |
| FluxPivot | `FluxPivot.pine` | `FluxPivot` |
| FluxSignal | `FluxSignal.pine` | `FluxSignal` |
| FluxTarget | `FluxTarget.pine` | `FluxTarget` |
| Market Regime | `MarketRegime.pine` | `MarketRegime` |
| Market Phase | `MarketPhase.pine` | `MarketPhase` |
| Parabolic RSI | `ParabolicRSI.pine` | `ParabolicRSI` |
| Previous Levels | `PreviousLevels.pine` | `PreviousLevels` |
| TTM Squeeze | `TTMSqueeze.pine` | `TTMSqueeze` |
| Volatility Cycle | `VolatilityCycle.pine` | `VolatilityCycle` |
| Dynamic Trend | `DynamicTrend.pine` | `DynamicTrend` |

## Version Control

These PineScript files are stored in the repository for:
- ✅ Version control and change tracking
- ✅ Easy access for manual publishing
- ✅ Documentation and reference
- ✅ Team collaboration
- ✅ Backup and recovery

## Adding New Indicators

1. Create a new `.pine` file in `indicators/` directory
2. Add the indicator configuration to `FLUX_INDICATORS` in `TradingViewChart.js`
3. Update this README with the new indicator mapping
4. **For widget API usage:** Publish as invite-only script on TradingView (requires Premium)
5. **For manual usage:** Users can copy-paste from the `.pine` file
6. Update the script identifier in the component (if published)

## FAQ

**Q: Do I have to make my scripts public?**  
A: No! Use "Invite-only" publishing - scripts remain private and only accessible to users you grant access to.

**Q: Can I use the widget API without publishing?**  
A: Unfortunately, no. TradingView's widget API only works with published scripts. However, invite-only scripts are private and not publicly visible.

**Q: What if I don't have TradingView Premium?**  
A: You can still use the scripts manually by copying them into TradingView's Pine Editor, but they won't work with the widget API.

**Q: Are invite-only scripts really private?**  
A: Yes! They are not publicly searchable or visible. Only users you explicitly grant access to can see and use them.

