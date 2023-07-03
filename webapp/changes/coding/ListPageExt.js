/***
@controller Name:sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage,
*@viewId:ui.s2p.mm.poitem.monitors1::sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage::C_PurchaseOrderItemMoniResults
*/
sap.ui.define(
  [
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/type/Date",
    "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
    "sap/ui/comp/filterbar/FilterBar",
    "sap/ui/comp/filterbar/FilterGroupItem",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/SearchField",
    "sap/m/Token",
    "sap/ui/table/Column",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/DatePicker",
  ],
  function (
    ControllerExtension,
    Filter,
    FilterOperator,
    DateType,
    ValueHelpDialog,
    FilterBar,
    FilterGroupItem,
    ColumnListItem,
    Label,
    SearchField,
    Token,
    UIColumn,
    MColumn,
    Text,
    Input,
    DatePicker
  ) {
    "use strict";

    let _oView = null;
    let _oWbsElementVH;
    let _bWbsElementVH;
    let _oAssetElementVH;
    let _bAssetElementVH;
    let _oCCElementVH;
    let _bCCElementVH;
    let _oONElementVH;
    let _bONElementVH;
    let _oSourceOrderVH;
    let _bSourceOrderVH;

    return ControllerExtension.extend(
      "customer.ui.s2p.mm.poitem.monitors1.ListPageExt",
      {
        // this section allows to extend lifecycle hooks or override public methods of the base controller
        override: {
          /**
           * Called when a controller is instantiated and its View controls (if available) are already created.
           * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
           * @memberOf customer.ui.s2p.mm.poitem.monitors1.ListPageExt
           */
          onInit: function () {
            // get view instance
            _oView = this.getView();
          },

          /**
           * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
           * @memberOf customer.ui.s2p.mm.poitem.monitors1.ListPageExt
           */
          onExit: function () {
            // destroy value help dialog
            if (_oWbsElementVH) _oWbsElementVH.destroy();
            if (_oAssetElementVH) _oAssetElementVH.destroy();
            if (_oCCElementVH) _oCCElementVH.destroy();
            if (_oONElementVH) _oONElementVH.destroy();
            if (_oSourceOrderVH) _oSourceOrderVH.destroy();
          },

          //  override public method of the ListReport controller
          templateBaseExtension: {
            /**
             * Can be used to add filters. They will be combined via AND with all other filters
             * sControlId is the ID of the control on which extension logic to be applied.
             * For each filter the extension must call fnAddFilter(oControllerExtension, oFilter)
             * oControllerExtension must be the ControllerExtension instance which adds the filter
             * oFilter must be an instance of sap.ui.model.Filter
             */
            addFilters: function (fnAddFilter, sControlId) {
              // wbs element filter
              const oWbsElement = this.byId("wbs-element1-mi-id");
              let aToken = oWbsElement.getTokens();
              let aFilters = [];
              let element;
              let index = 0;

              if (aToken.length > 0) {
                for (index = 0; index < aToken.length; index++) {
                  element = aToken[index];

                  aFilters.push(
                    new Filter({
                      path: "WbsElement1",
                      operator: FilterOperator.EQ,
                      value1: element.getKey(),
                    })
                  );
                }
              }

              // asset filter
              const oAssetElement = this.byId("asset-mi-id");
              aToken = oAssetElement.getTokens();
              index = 0;

              if (aToken.length > 0) {
                for (index = 0; index < aToken.length; index++) {
                  element = aToken[index];

                  aFilters.push(
                    new Filter({
                      path: "Asset",
                      operator: FilterOperator.EQ,
                      value1: element.getKey(),
                    })
                  );
                }
              }

              // cost center filter
              const oCostCenterElement = this.byId("cost-center-mi-id");
              aToken = oCostCenterElement.getTokens();
              index = 0;

              if (aToken.length > 0) {
                for (index = 0; index < aToken.length; index++) {
                  element = aToken[index];

                  aFilters.push(
                    new Filter({
                      path: "CostCenter",
                      operator: FilterOperator.EQ,
                      value1: element.getKey(),
                    })
                  );
                }
              }

              // asset filter
              const oOrderNoElement = this.byId("order-number-mi-id");
              aToken = oOrderNoElement.getTokens();
              index = 0;

              if (aToken.length > 0) {
                for (index = 0; index < aToken.length; index++) {
                  element = aToken[index];

                  aFilters.push(
                    new Filter({
                      path: "OrderNumber",
                      operator: FilterOperator.EQ,
                      value1: element.getKey(),
                    })
                  );
                }
              }

              // sales order filter
              const oSalesorderElement = this.byId("sales-order-mi-id");
              aToken = oSalesorderElement.getTokens();
              index = 0;

              if (aToken.length > 0) {
                for (index = 0; index < aToken.length; index++) {
                  element = aToken[index];

                  aFilters.push(
                    new Filter({
                      path: "SalesOrder",
                      operator: FilterOperator.EQ,
                      value1: element.getKey(),
                    })
                  );
                }
              }

              // add filters if exist
              if (aFilters.length > 0) {
                var oFilter = new Filter({
                  filters: aFilters,
                  and: true,
                });

                // pass filter to global filter
                fnAddFilter(this, oFilter);
              }
            },
          },

          /**
           * Can be used to store specific state by calling fnSetAppStateData(oControllerExtension, oAppState).
           * oControllerExtension must be the ControllerExtension instance for which the state should be stored.
           * oAppState is the state to be stored.
           */
          provideExtensionAppStateData: function (fnSetAppStateData) {
            // var oComboBox = this.byId("wbs-element1-cb-id");
            // var sSelectedKey = oComboBox.getSelectedKey();
            // fnSetAppStateData(this, {
            //   customApprovalFilter: sSelectedKey,
            // });
          },

          /**
           * Allows extensions to restore their state according to a state which was previously stored.
           */
          restoreExtensionAppStateData: function (fnGetAppStateData) {
            // var oExtensionData = fnGetAppStateData(this);
            // if (oExtensionData) {
            //   this.byId("wbs-element1-cb-id").setSelectedKey(
            //     oExtensionData.customApprovalFilter
            //   );
            // }
          },
        },

        // # begin wbs element

        onWbsElementVH: function () {
          var oMultiInput = this.byId("wbs-element1-mi-id");

          if (!_oWbsElementVH) {
            const fnOkPress = (oEvent) => {
              var aTokens = oEvent.getParameter("tokens");

              oMultiInput.setTokens(aTokens);
              _oWbsElementVH.close();
            };

            const fnCancelPress = () => {
              _oWbsElementVH.close();
            };

            const fnFilterSearch = (oEvent) => {
              var oFilterBar = _oWbsElementVH.getFilterBar(),
                sSearchQuery = oFilterBar.getBasicSearchValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

              var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                  aResult.push(
                    new Filter({
                      path: oControl.getName(),
                      operator: FilterOperator.Contains,
                      value1: oControl.getValue(),
                    })
                  );
                }

                return aResult;
              }, []);

              aFilters.push(
                new Filter({
                  filters: [
                    new Filter({
                      path: "WBSElement",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "WBSDescription",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                  ],
                  and: false,
                })
              );

              var oFilter = new Filter({
                filters: aFilters,
                and: true,
              });

              _oWbsElementVH.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                  oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                  oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                _oWbsElementVH.update();
              });
            };

            const oFilterBar = new FilterBar("wbs-element1-fb-id", {
              advancedMode: true,
              search: fnFilterSearch,
              filterGroupItems: [
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "WBSElement",
                  label: "WBS Element",
                  visibleInFilterBar: true,
                  control: new Input({ name: "WBSElement" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "WBSDescription",
                  label: "WBS Description",
                  visibleInFilterBar: true,
                  control: new Input({ name: "WBSDescription" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "WBSElementShortID",
                  label: "Short ID (WBS elem)",
                  visibleInFilterBar: true,
                  control: new Input({ name: "WBSElementShortID" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "ProjectInternalID",
                  label: "Project def.",
                  visibleInFilterBar: true,
                  control: new Input({ name: "ProjectInternalID" }),
                }),
              ],
            });

            _oWbsElementVH = new ValueHelpDialog("wbs-element1-vhd-id", {
              title: "WBS Element",
              key: "WBSElement",
              descriptionKey: "WBSDescription",
              supportRanges: true,
              ok: fnOkPress,
              cancel: fnCancelPress,
              filterBar: oFilterBar,
            });

            _oView.addDependent(_oWbsElementVH);
          }

          // Initialise the dialog with model only the first time. Then only open it
          if (_bWbsElementVH) {
            // Re-set the tokens from the input and update the table
            _oWbsElementVH.setTokens([]);
            _oWbsElementVH.setTokens(oMultiInput.getTokens());
            _oWbsElementVH.update();

            _oWbsElementVH.open();
            return;
          }

          // Set Basic Search for FilterBar
          const oFilterBar = _oWbsElementVH.getFilterBar();
          const oSearchField = new SearchField();
          oFilterBar.setFilterBarExpanded(false);
          oFilterBar.setBasicSearch(oSearchField);

          // Trigger filter bar search when the basic search is fired
          oSearchField.attachSearch(() => {
            oFilterBar.search();
          });

          _oWbsElementVH.getTableAsync().then((oTable) => {
            // oTable.setModel(this.oProductsModel);

            // For Desktop and tabled the default table is sap.ui.table.Table
            if (oTable.bindRows) {
              oTable.addColumn(
                new UIColumn({
                  label: "WBS Element",
                  template: "customer.PrPoItem>WBSElement",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "WBS Description",
                  template: "customer.PrPoItem>WBSDescription",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Short ID (WBS elem)",
                  template: "customer.PrPoItem>WBSElementShortID",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Project def.",
                  template: "customer.PrPoItem>ProjectInternalID",
                })
              );

              // Bind rows to the ODataModel and add columns
              oTable.bindAggregation("rows", {
                path: "customer.PrPoItem>/I_MM_WBSElementValueHelp",
                events: {
                  dataReceived: () => {
                    _oWbsElementVH.update();
                  },
                },
              });
            }

            // For Mobile the default table is sap.m.Table
            if (oTable.bindItems) {
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "WBS Element" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "WBS Description" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Short ID (WBS elem)" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Project def." }),
                })
              );

              // Bind items to the ODataModel and add columns
              oTable.bindAggregation("items", {
                path: "customer.PrPoItem>/I_MM_WBSElementValueHelp",
                template: new ColumnListItem({
                  cells: [
                    new Label({
                      text: "{customer.PrPoItem>WBSElement}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>WBSDescription}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>WBSElementShortID}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>ProjectInternalID}",
                    }),
                  ],
                }),
                events: {
                  dataReceived: () => {
                    _oWbsElementVH.update();
                  },
                },
              });
            }

            _oWbsElementVH.update();
          });

          // add token to multi input if exist
          _oWbsElementVH.setTokens(oMultiInput.getTokens());

          // set flag that the dialog is initialized
          _bWbsElementVH = true;

          // open value help dialog
          _oWbsElementVH.open();
        },

        // #end wbs element

        // # begin asset

        onAssetVH: function () {
          var oMultiInput = this.byId("asset-mi-id");

          if (!_oAssetElementVH) {
            const fnOkPress = (oEvent) => {
              var aTokens = oEvent.getParameter("tokens");

              oMultiInput.setTokens(aTokens);
              _oAssetElementVH.close();
            };

            const fnCancelPress = () => {
              _oAssetElementVH.close();
            };

            const fnFilterSearch = (oEvent) => {
              var oFilterBar = _oAssetElementVH.getFilterBar(),
                sSearchQuery = oFilterBar.getBasicSearchValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

              var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                  aResult.push(
                    new Filter({
                      path: oControl.getName(),
                      operator: FilterOperator.Contains,
                      value1: oControl.getValue(),
                    })
                  );
                }

                return aResult;
              }, []);

              aFilters.push(
                new Filter({
                  filters: [
                    new Filter({
                      path: "MasterFixedAsset",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "FixedAssetDescription",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                  ],
                  and: false,
                })
              );

              var oFilter = new Filter({
                filters: aFilters,
                and: true,
              });

              _oAssetElementVH.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                  oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                  oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                _oAssetElementVH.update();
              });
            };

            const oFilterBar = new FilterBar("asset-fb-id", {
              advancedMode: true,
              search: fnFilterSearch,
              filterGroupItems: [
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "MasterFixedAsset",
                  label: "Asset",
                  visibleInFilterBar: true,
                  control: new Input({ name: "MasterFixedAsset" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "FixedAsset",
                  label: "Sub-number",
                  visibleInFilterBar: true,
                  control: new Input({ name: "FixedAsset" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "FixedAssetDescription",
                  label: "Description",
                  visibleInFilterBar: true,
                  control: new Input({ name: "FixedAssetDescription" }),
                }),

                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "AssetClass",
                  label: "Asset Class",
                  visibleInFilterBar: true,
                  control: new Input({ name: "AssetClass" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "AssetCapitalizationDate",
                  label: "Capitialized On",
                  visibleInFilterBar: true,
                  control: new DatePicker({ name: "AssetCapitalizationDate" }),
                }),
              ],
            });

            _oAssetElementVH = new ValueHelpDialog("asset-vhd-id", {
              title: "Asset",
              key: "MasterFixedAsset",
              descriptionKey: "FixedAssetDescription",
              supportRanges: true,
              ok: fnOkPress,
              cancel: fnCancelPress,
              filterBar: oFilterBar,
            });

            _oView.addDependent(_oAssetElementVH);
          }

          // Initialise the dialog with model only the first time. Then only open it
          if (_bAssetElementVH) {
            // Re-set the tokens from the input and update the table
            _oAssetElementVH.setTokens([]);
            _oAssetElementVH.setTokens(oMultiInput.getTokens());
            _oAssetElementVH.update();

            _oAssetElementVH.open();
            return;
          }

          // Set Basic Search for FilterBar
          const oFilterBar = _oAssetElementVH.getFilterBar();
          const oSearchField = new SearchField();
          oFilterBar.setFilterBarExpanded(false);
          oFilterBar.setBasicSearch(oSearchField);

          // Trigger filter bar search when the basic search is fired
          oSearchField.attachSearch(() => {
            oFilterBar.search();
          });

          _oAssetElementVH.getTableAsync().then((oTable) => {
            // oTable.setModel(this.oProductsModel);

            // For Desktop and tabled the default table is sap.ui.table.Table
            if (oTable.bindRows) {
              oTable.addColumn(
                new UIColumn({
                  label: "Asset",
                  template: "customer.PrPoItem>MasterFixedAsset",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Sub-number",
                  template: "customer.PrPoItem>FixedAsset",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Description",
                  template: "customer.PrPoItem>FixedAssetDescription",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Asset Class",
                  template: "customer.PrPoItem>AssetClass",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Capitialized On",
                  template: new Text({
                    text: {
                      path: "customer.PrPoItem>AssetCapitalizationDate",
                      type: new DateType({
                        style: "medium",
                        strictParsing: true,
                      }),
                    },
                  }),
                })
              );

              // Bind rows to the ODataModel and add columns
              oTable.bindAggregation("rows", {
                path: "customer.PrPoItem>/I_MM_FixedAssetValueHelp",
                events: {
                  dataReceived: () => {
                    _oAssetElementVH.update();
                  },
                },
              });
            }

            // For Mobile the default table is sap.m.Table
            if (oTable.bindItems) {
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Asset" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Sub-number" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Description" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Asset Class" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Capitialized On" }),
                })
              );

              // Bind items to the ODataModel and add columns
              oTable.bindAggregation("items", {
                path: "customer.PrPoItem>/I_MM_FixedAssetValueHelp",
                template: new ColumnListItem({
                  cells: [
                    new Label({
                      text: "{customer.PrPoItem>MasterFixedAsset}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>FixedAsset}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>FixedAssetDescription}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>AssetClass}",
                    }),
                    new Label({
                      text: {
                        path: "customer.PrPoItem>AssetCapitalizationDate",
                        type: new DateType({
                          style: "medium",
                          strictParsing: true,
                        }),
                      },
                    }),
                  ],
                }),
                events: {
                  dataReceived: () => {
                    _oAssetElementVH.update();
                  },
                },
              });
            }

            _oAssetElementVH.update();
          });

          // add token to multi input if exist
          _oAssetElementVH.setTokens(oMultiInput.getTokens());

          // set flag that the dialog is initialized
          _bAssetElementVH = true;

          // open value help dialog
          _oAssetElementVH.open();
        },

        // #end asset

        // # begin cost center

        onCostCenterVH: function () {
          var oMultiInput = this.byId("cost-center-mi-id");

          if (!_oCCElementVH) {
            const fnOkPress = (oEvent) => {
              var aTokens = oEvent.getParameter("tokens");

              oMultiInput.setTokens(aTokens);
              _oCCElementVH.close();
            };

            const fnCancelPress = () => {
              _oCCElementVH.close();
            };

            const fnFilterSearch = (oEvent) => {
              var oFilterBar = _oCCElementVH.getFilterBar(),
                sSearchQuery = oFilterBar.getBasicSearchValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

              var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                  aResult.push(
                    new Filter({
                      path: oControl.getName(),
                      operator: FilterOperator.Contains,
                      value1: oControl.getValue(),
                    })
                  );
                }

                return aResult;
              }, []);

              aFilters.push(
                new Filter({
                  filters: [
                    new Filter({
                      path: "CostCenter",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "CostCenter_Text",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                  ],
                  and: false,
                })
              );

              var oFilter = new Filter({
                filters: aFilters,
                and: true,
              });

              _oCCElementVH.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                  oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                  oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                _oCCElementVH.update();
              });
            };

            const oFilterBar = new FilterBar("cost-center-fb-id", {
              advancedMode: true,
              search: fnFilterSearch,
              filterGroupItems: [
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "CostCenter",
                  label: "Cost Center",
                  visibleInFilterBar: true,
                  control: new Input({ name: "CostCenter" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "CostCenter_Text",
                  label: "Cost Center Name",
                  visibleInFilterBar: true,
                  control: new Input({ name: "CostCenter_Text" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "ValidityStartDate",
                  label: "Valid From",
                  visibleInFilterBar: true,
                  control: new DatePicker({ name: "ValidityStartDate" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "CompanyCode",
                  label: "Company Code",
                  visibleInFilterBar: true,
                  control: new Input({ name: "CompanyCode" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "CostCtrResponsiblePersonName",
                  label: "Person Responsible",
                  visibleInFilterBar: true,
                  control: new Input({ name: "CostCtrResponsiblePersonName" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "ValidityEndDate",
                  label: "Valid To",
                  visibleInFilterBar: true,
                  control: new DatePicker({ name: "ValidityEndDate" }),
                }),
              ],
            });

            _oCCElementVH = new ValueHelpDialog("cost-center-vhd-id", {
              title: "Cost Center",
              key: "CostCenter",
              descriptionKey: "CostCenter_Text",
              supportRanges: true,
              ok: fnOkPress,
              cancel: fnCancelPress,
              filterBar: oFilterBar,
            });

            _oView.addDependent(_oCCElementVH);
          }

          // Initialise the dialog with model only the first time. Then only open it
          if (_bCCElementVH) {
            // Re-set the tokens from the input and update the table
            _oCCElementVH.setTokens([]);
            _oCCElementVH.setTokens(oMultiInput.getTokens());
            _oCCElementVH.update();

            _oCCElementVH.open();
            return;
          }

          // Set Basic Search for FilterBar
          const oFilterBar = _oCCElementVH.getFilterBar();
          const oSearchField = new SearchField();
          oFilterBar.setFilterBarExpanded(false);
          oFilterBar.setBasicSearch(oSearchField);

          // Trigger filter bar search when the basic search is fired
          oSearchField.attachSearch(() => {
            oFilterBar.search();
          });

          _oCCElementVH.getTableAsync().then((oTable) => {
            // oTable.setModel(this.oProductsModel);

            // For Desktop and tabled the default table is sap.ui.table.Table
            if (oTable.bindRows) {
              oTable.addColumn(
                new UIColumn({
                  label: "Cost Center",
                  template: "customer.PrPoItem>CostCenter",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Cost Center Name",
                  template: "customer.PrPoItem>CostCenter_Text",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Company Code",
                  template: "customer.PrPoItem>CompanyCode",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Person Responsible",
                  template: "customer.PrPoItem>CostCtrResponsiblePersonName",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Valid From",
                  template: new Text({
                    text: {
                      path: "customer.PrPoItem>ValidityStartDate",
                      type: new DateType({
                        style: "medium",
                        strictParsing: true,
                      }),
                    },
                  }),
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Valid To",
                  template: new Text({
                    text: {
                      path: "customer.PrPoItem>ValidityEndDate",
                      type: new DateType({
                        style: "medium",
                        strictParsing: true,
                      }),
                    },
                  }),
                })
              );

              // Bind rows to the ODataModel and add columns
              oTable.bindAggregation("rows", {
                path: "customer.PrPoItem>/I_MM_CostCenterValueHelp",
                events: {
                  dataReceived: () => {
                    _oCCElementVH.update();
                  },
                },
              });
            }

            // For Mobile the default table is sap.m.Table
            if (oTable.bindItems) {
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Cost Center" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Cost Center Name" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Company Code" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Person Responsible" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Valid From" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Valid To" }),
                })
              );

              // Bind items to the ODataModel and add columns
              oTable.bindAggregation("items", {
                path: "customer.PrPoItem>/I_MM_CostCenterValueHelp",
                template: new ColumnListItem({
                  cells: [
                    new Label({
                      text: "{customer.PrPoItem>CostCenter}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>CostCenter_Text}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>CompanyCode}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>CostCtrResponsiblePersonName}",
                    }),
                    new Label({
                      text: {
                        path: "customer.PrPoItem>ValidityStartDate",
                        type: new DateType({
                          style: "medium",
                          strictParsing: true,
                        }),
                      },
                    }),
                    new Label({
                      text: {
                        path: "customer.PrPoItem>ValidityEndDate",
                        type: new DateType({
                          style: "medium",
                          strictParsing: true,
                        }),
                      },
                    }),
                  ],
                }),
                events: {
                  dataReceived: () => {
                    _oCCElementVH.update();
                  },
                },
              });
            }

            _oCCElementVH.update();
          });

          // add token to multi input if exist
          _oCCElementVH.setTokens(oMultiInput.getTokens());

          // set flag that the dialog is initialized
          _bCCElementVH = true;

          // open value help dialog
          _oCCElementVH.open();
        },

        // #end cost center

        // # begin order no.

        onOrderNumberVH: function () {
          var oMultiInput = this.byId("order-number-mi-id");

          if (!_oONElementVH) {
            const fnOkPress = (oEvent) => {
              var aTokens = oEvent.getParameter("tokens");

              oMultiInput.setTokens(aTokens);
              _oONElementVH.close();
            };

            const fnCancelPress = () => {
              _oONElementVH.close();
            };

            const fnFilterSearch = (oEvent) => {
              var oFilterBar = _oONElementVH.getFilterBar(),
                sSearchQuery = oFilterBar.getBasicSearchValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

              var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                  aResult.push(
                    new Filter({
                      path: oControl.getName(),
                      operator: FilterOperator.Contains,
                      value1: oControl.getValue(),
                    })
                  );
                }

                return aResult;
              }, []);

              aFilters.push(
                new Filter({
                  filters: [
                    new Filter({
                      path: "OrderID",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "OrderDescription",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                  ],
                  and: false,
                })
              );

              var oFilter = new Filter({
                filters: aFilters,
                and: true,
              });

              _oONElementVH.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                  oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                  oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                _oONElementVH.update();
              });
            };

            const oFilterBar = new FilterBar("order-number-fb-id", {
              advancedMode: true,
              search: fnFilterSearch,
              filterGroupItems: [
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "OrderID",
                  label: "Order ID",
                  visibleInFilterBar: true,
                  control: new Input({ name: "OrderID" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "OrderDescription",
                  label: "Order Description",
                  visibleInFilterBar: true,
                  control: new Input({ name: "OrderDescription" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "OrderType",
                  label: "Order Type",
                  visibleInFilterBar: true,
                  control: new Input({ name: "OrderType" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "ControllingArea",
                  label: "Controlling Area",
                  visibleInFilterBar: true,
                  control: new Input({ name: "ControllingArea" }),
                }),
              ],
            });

            _oONElementVH = new ValueHelpDialog("order-number-vhd-id", {
              title: "Asset",
              key: "OrderID",
              descriptionKey: "OrderDescription",
              supportRanges: true,
              ok: fnOkPress,
              cancel: fnCancelPress,
              filterBar: oFilterBar,
            });

            _oView.addDependent(_oONElementVH);
          }

          // Initialise the dialog with model only the first time. Then only open it
          if (_bONElementVH) {
            // Re-set the tokens from the input and update the table
            _oONElementVH.setTokens([]);
            _oONElementVH.setTokens(oMultiInput.getTokens());
            _oONElementVH.update();

            _oONElementVH.open();
            return;
          }

          // Set Basic Search for FilterBar
          const oFilterBar = _oONElementVH.getFilterBar();
          const oSearchField = new SearchField();
          oFilterBar.setFilterBarExpanded(false);
          oFilterBar.setBasicSearch(oSearchField);

          // Trigger filter bar search when the basic search is fired
          oSearchField.attachSearch(() => {
            oFilterBar.search();
          });

          _oONElementVH.getTableAsync().then((oTable) => {
            // oTable.setModel(this.oProductsModel);

            // For Desktop and tabled the default table is sap.ui.table.Table
            if (oTable.bindRows) {
              oTable.addColumn(
                new UIColumn({
                  label: "Order ID",
                  template: "customer.PrPoItem>OrderID",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Order Description",
                  template: "customer.PrPoItem>OrderDescription",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Order Type",
                  template: "customer.PrPoItem>OrderType",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Controlling Area",
                  template: "customer.PrPoItem>ControllingArea",
                })
              );

              // Bind rows to the ODataModel and add columns
              oTable.bindAggregation("rows", {
                path: "customer.PrPoItem>/C_OrderMasterVH",
                events: {
                  dataReceived: () => {
                    _oONElementVH.update();
                  },
                },
              });
            }

            // For Mobile the default table is sap.m.Table
            if (oTable.bindItems) {
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Order ID" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Order Description" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Order Type" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Controlling Area" }),
                })
              );

              // Bind items to the ODataModel and add columns
              oTable.bindAggregation("items", {
                path: "customer.PrPoItem>/C_OrderMasterVH",
                template: new ColumnListItem({
                  cells: [
                    new Label({
                      text: "{customer.PrPoItem>OrderID}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>OrderDescription}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>OrderType}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>ControllingArea}",
                    }),
                  ],
                }),
                events: {
                  dataReceived: () => {
                    _oONElementVH.update();
                  },
                },
              });
            }

            _oONElementVH.update();
          });

          // add token to multi input if exist
          _oONElementVH.setTokens(oMultiInput.getTokens());

          // set flag that the dialog is initialized
          _bONElementVH = true;

          // open value help dialog
          _oONElementVH.open();
        },

        // #end order no.

        // # begin sales order

        onSalesOrderVH: function () {
          var oMultiInput = this.byId("sales-order-mi-id");

          if (!_oSourceOrderVH) {
            const fnOkPress = (oEvent) => {
              var aTokens = oEvent.getParameter("tokens");

              oMultiInput.setTokens(aTokens);
              _oSourceOrderVH.close();
            };

            const fnCancelPress = () => {
              _oSourceOrderVH.close();
            };

            const fnFilterSearch = (oEvent) => {
              var oFilterBar = _oSourceOrderVH.getFilterBar(),
                sSearchQuery = oFilterBar.getBasicSearchValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

              var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                  aResult.push(
                    new Filter({
                      path: oControl.getName(),
                      operator: FilterOperator.Contains,
                      value1: oControl.getValue(),
                    })
                  );
                }

                return aResult;
              }, []);

              aFilters.push(
                new Filter({
                  filters: [
                    new Filter({
                      path: "SalesOrder",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "SalesOrderItem",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "SalesOrderItemText",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                    new Filter({
                      path: "Material",
                      operator: FilterOperator.Contains,
                      value1: sSearchQuery,
                    }),
                  ],
                  and: false,
                })
              );

              var oFilter = new Filter({
                filters: aFilters,
                and: true,
              });

              _oSourceOrderVH.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                  oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                  oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                _oSourceOrderVH.update();
              });
            };

            const oFilterBar = new FilterBar("sales-order-fb-id", {
              advancedMode: true,
              search: fnFilterSearch,
              filterGroupItems: [
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "SalesOrder",
                  label: "Sales Order",
                  visibleInFilterBar: true,
                  control: new Input({ name: "SalesOrder" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "SalesOrderItem",
                  label: "Sales Order Item",
                  visibleInFilterBar: true,
                  control: new Input({ name: "SalesOrderItem" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "SalesOrderItemText",
                  label: "Sales Order Item Text",
                  visibleInFilterBar: true,
                  control: new Input({ name: "SalesOrderItemText" }),
                }),
                new FilterGroupItem({
                  groupName: "__$INTERNAL$",
                  name: "Material",
                  label: "Material",
                  visibleInFilterBar: true,
                  control: new Input({ name: "Material" }),
                }),
              ],
            });

            _oSourceOrderVH = new ValueHelpDialog("order-number-vhd-id", {
              title: "Sales Order",
              key: "SalesOrder",
              descriptionKey: "SalesOrderItemText",
              supportRanges: true,
              ok: fnOkPress,
              cancel: fnCancelPress,
              filterBar: oFilterBar,
            });

            _oView.addDependent(_oSourceOrderVH);
          }

          // Initialise the dialog with model only the first time. Then only open it
          if (_bSourceOrderVH) {
            // Re-set the tokens from the input and update the table
            _oSourceOrderVH.setTokens([]);
            _oSourceOrderVH.setTokens(oMultiInput.getTokens());
            _oSourceOrderVH.update();

            _oSourceOrderVH.open();
            return;
          }

          // Set Basic Search for FilterBar
          const oFilterBar = _oSourceOrderVH.getFilterBar();
          const oSearchField = new SearchField();
          oFilterBar.setFilterBarExpanded(false);
          oFilterBar.setBasicSearch(oSearchField);

          // Trigger filter bar search when the basic search is fired
          oSearchField.attachSearch(() => {
            oFilterBar.search();
          });

          _oSourceOrderVH.getTableAsync().then((oTable) => {
            // oTable.setModel(this.oProductsModel);

            // For Desktop and tabled the default table is sap.ui.table.Table
            if (oTable.bindRows) {
              oTable.addColumn(
                new UIColumn({
                  label: "Sales Order",
                  template: "customer.PrPoItem>SalesOrder",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Sales Order Item",
                  template: "customer.PrPoItem>SalesOrderItem",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Sales Order Item Text",
                  template: "customer.PrPoItem>SalesOrderItemText",
                })
              );
              oTable.addColumn(
                new UIColumn({
                  label: "Material",
                  template: "customer.PrPoItem>Material",
                })
              );

              // Bind rows to the ODataModel and add columns
              oTable.bindAggregation("rows", {
                path: "customer.PrPoItem>/I_MM_SalesOrderItemVH",
                events: {
                  dataReceived: () => {
                    _oSourceOrderVH.update();
                  },
                },
              });
            }

            // For Mobile the default table is sap.m.Table
            if (oTable.bindItems) {
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Sales Order" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Sales Order Item" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Sales Order Item Text" }),
                })
              );
              oTable.addColumn(
                new MColumn({
                  header: new Label({ text: "Material" }),
                })
              );

              // Bind items to the ODataModel and add columns
              oTable.bindAggregation("items", {
                path: "customer.PrPoItem>/I_MM_SalesOrderItemVH",
                template: new ColumnListItem({
                  cells: [
                    new Label({
                      text: "{customer.PrPoItem>SalesOrder}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>SalesOrderItem}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>SalesOrderItemText}",
                    }),
                    new Label({
                      text: "{customer.PrPoItem>Material}",
                    }),
                  ],
                }),
                events: {
                  dataReceived: () => {
                    _oSourceOrderVH.update();
                  },
                },
              });
            }

            _oSourceOrderVH.update();
          });

          // add token to multi input if exist
          _oSourceOrderVH.setTokens(oMultiInput.getTokens());

          // set flag that the dialog is initialized
          _bSourceOrderVH = true;

          // open value help dialog
          _oSourceOrderVH.open();
        },

        // # end sales order
      }
    );
  }
);
