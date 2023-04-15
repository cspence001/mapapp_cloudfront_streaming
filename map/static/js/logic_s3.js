cf = "STATES_PTS_51"
d3.json(cf, function(data){
    createFeatures(data.features);
  })
  
  function createFeatures(mapData) {
  
    function onEachLayer(feature) {
      return new L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
    }
    function onEachFeature(feature, layer) { 
      layer.bindPopup("Loan Recipient: " + feature.properties.BorrowerName + "<br>Borrower Address: " + feature.properties.full_add + "<br>Business Type: " + feature.properties.BusinessType + "<br><b>Loan Type</b>: " + feature.properties.ProcessingMethod + "<br>Date Approved: " + feature.properties.DateApproved + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported #: " + feature.properties.JobsReported + "<br>Loan Forgiveness Amount: " + feature.properties.ForgivenessAmount + "<br>Loan Status: " + feature.properties.LoanStatus + "<br>Loan Status Date: " + feature.properties.LoanStatusDate + "<br>Servicing Lender: " + feature.properties.ServicingLenderName + "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit + "<br>Industry: "+ feature.properties.Industry)
    }
    var cluster = L.markerClusterGroup();
    var points = new L.geoJson(mapData, {
      onEachFeature: onEachFeature,
      pointToLayer: onEachLayer,
    })
    cluster.addLayer(points)
    createMap(cluster);
  }

  function createMap(cluster) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "streets-v11",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
    
  
    var baseMaps = {
              labelIsSelector: 'Base;',
              children: [
                  { label: 'StreetMap', layer: streetmap },
                  { label: 'Dark Map', layer: darkmap },
                  /* ... */
              ]
  };
  var overlaysTree = {
    label: 'Points Selection',
    selectAllCheckbox: 'Un/select all',
    children: [
      {
        label: '<b>Points (Cluster View)</b>',
        selectAllCheckbox: false,
        children: [
          { label: 'Points', layer: cluster},
                ]}, 
      // {
      //   label: '<b>State Pleth</b>',
      //   selectAllCheckbox: false,
      //   children: [
      //     { label: 'Current Approval', layer: statepleth},
      //           ]}, 
      {
        label: '<b>County Pleth</b>',
        selectAllCheckbox: false,
        children: [
          { label: 'Current Approval', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: obj[17] },
            { label: 'MD', layer: obj[24] },
            { label: 'TX', layer: obj[48] },
            { label: 'VA', layer: obj[51] },
          ]},
          { label: 'Jobs Reported', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objjobs[17] },
            { label: 'MD', layer: objjobs[24] },
            { label: 'TX', layer: objjobs[48] },
            { label: 'VA', layer: objjobs[51] },
          ]},
          { label: '# of Loans', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objloans[17] },
            { label: 'MD', layer: objloans[24] },
            { label: 'TX', layer: objloans[48] },
            { label: 'VA', layer: objloans[51] },
          ]},
                ]}, 
      {
        label: '<b>Block Group Pleth<b>',
        selectAllCheckbox: false,
        children: [
          { label: 'Current Approval', 
          namedToggle: true, 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objbg[17]},
            { label: 'MD', layer: objbg[24]},
            { label: 'TX', layer: objbg[48]},
            { label: 'VA', layer: objbg[51]},
          ]},
          { label: 'Jobs Reported', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objbgjobs[17] },
            { label: 'MD', layer: objbgjobs[24] },
            { label: 'TX', layer: objbgjobs[48] },
            { label: 'VA', layer: objbgjobs[51] },
          ]},
          { label: '# of Loans', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objbgloans[17] },
            { label: 'MD', layer: objbgloans[24] },
            { label: 'TX', layer: objbgloans[48] },
            { label: 'VA', layer: objbgloans[51] },
                ]}, 
          ]},
       { label: '<b>Block Pleth<b>',
        selectAllCheckbox: false,
        children: [
          { label: 'Current Approval', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objblock[17]},
            { label: 'MD', layer: objblock[24]},
            { label: 'TX', layer: objblock[48] },
            { label: 'VA', layer: objblock[51]},
          ]},
          { label: 'Jobs Reported', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objblockjobs[17] },
            { label: 'MD', layer: objblockjobs[24] },
            { label: 'TX', layer: objblockjobs[48] },
            { label: 'VA', layer: objblockjobs[51] },
          ]},
          { label: '# of Loans', 
          selectAllCheckbox: true,
          collapsed: true,
          children: [
            { label: 'IL', layer: objblockloans[17] },
            { label: 'MD', layer: objblockloans[24] },
            { label: 'TX', layer: objblockloans[48] },
            { label: 'VA', layer: objblockloans[51] },
          ]},
                ]}, 
                {
                  label: '<b>State</b>',
                  collapsed: true,
                  selectAllCheckbox: true,
                  children: [
                      { label: 'IL', layer: ILgroup },
                      { label: 'MD', layer: MDgroup },
                      { label: 'TX', layer: TXgroup },
                      { label: 'VA', layer: VAgroup },
                  ]},
        {
                    label: '<b>All Industry</b>',
                    selectAllCheckbox: true,
                    children: [
                        { label: '<i class="fas fa-square" style="color:#17becf";></i> Accommodation and Food Services',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '7211 Traveler Accommodation', layer: ind72ss11group },
                          { label: '7212 RV (Recreational Vehicle) Parks and Recreational Camps', layer: ind72ss12group },
                          { label: '7213 Rooming and Boarding Houses, Dormitories, and Workers Camps', layer: ind72ss13group },
                          { label: '7223 Special Food Services', layer: ind72ss23group },
                          { label: '7224 Drinking Places (Alcoholic Beverages)', layer: ind72ss24group },
                          { label: '7225 Restaurants and Other Eating Places', layer: ind72ss25group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#dbdb8d";></i> Administrative and Support and Waste Management and Remediation Services', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5611 Office Administrative Services', layer: ind56ss11group },
                          { label: '5612 Facilities Support Services', layer: ind56ss12group },
                          { label: '5613 Employment Services', layer: ind56ss13group },
                          { label: '5614 Business Support Services', layer: ind56ss14group },
                          { label: '5615 Travel Arrangement and Reservation Services', layer: ind56ss15group },
                          { label: '5616 Investigation and Security Services', layer: ind56ss16group },
                          { label: '5617 Services to Buildings and Dwellings', layer: ind56ss17group },
                          { label: '5619 Other Support Services', layer: ind56ss19group },
                          { label: '5621 Waste Collection', layer: ind56ss21group },
                          { label: '5622 Waste Treatment and Disposal', layer: ind56ss22group },
                          { label: '5629 Remediation and Other Waste Management Services', layer: ind56ss29group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#bcbd22";></i> Agriculture, Forestry, Fishing and Hunting',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '1111 Oilseed and Grain Farming', layer: ind11ss11group },
                          { label: '1112 Vegetable and Melon Farming', layer: ind11ss12group },
                          { label: '1113 Fruit and Tree Nut Farming', layer: ind11ss13group },
                          { label: '1114 Greenhouse, Nursery, and Floriculture Production', layer: ind11ss14group },
                          { label: '1119 Other Crop Farming', layer: ind11ss19group },
                          { label: '1121 Cattle Ranching and Farming', layer: ind11ss21group },
                          { label: '1122 Hog and Pig Farming', layer: ind11ss22group },
                          { label: '1123 Poultry and Egg Production', layer: ind11ss23group },
                          { label: '1124 Sheep and Goat Farming', layer: ind11ss24group },
                          { label: '1125 Aquaculture', layer: ind11ss25group },
                          { label: '1129 Other Animal Production', layer: ind11ss29group },
                          { label: '1131 Timber Tract Operations	', layer: ind11ss31group },
                          { label: '1132 Forest Nurseries and Gathering of Forest Products', layer: ind11ss32group },
                          { label: '1133 Logging', layer: ind11ss33group },
                          { label: '1141 Fishing', layer: ind11ss41group },
                          { label: '1142 Hunting and Trapping', layer: ind11ss42group },
                          { label: '1151 Support Activities for Crop Production', layer: ind11ss51group },
                          { label: '1152 Support Activities for Animal Production', layer: ind11ss52group },
                          { label: '1153 Support Activities for Forestry', layer: ind11ss53group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#c7c7c7";></i> Arts, Entertainment, and Recreation',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '7111 Performing Arts Companies', layer: ind71ss11group },
                          { label: '7112 Spectator Sports', layer: ind71ss12group },
                          { label: '7113 Promoters of Performing Arts, Sports, and Similar Events', layer: ind71ss13group },
                          { label: '7114 Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures', layer: ind71ss14group },
                          { label: '7115 Independent Artists, Writers, and Performers', layer: ind71ss15group },
                          { label: '7121 Museums, Historical Sites, and Similar Institutions', layer: ind71ss21group },
                          { label: '7131 Amusement Parks and Arcades', layer: ind71ss31group },
                          { label: '7132 Gambling Industries	', layer: ind71ss32group },
                          { label: '7139 Other Amusement and Recreation Industries', layer: ind71ss39group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#7f7f7f";></i> Construction',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '2361 Residential Building Construction', layer: ind23ss61group },
                          { label: '2362 Nonresidential Building Construction', layer: ind23ss62group },
                          { label: '2371 Utility System Construction', layer: ind23ss71group },
                          { label: '2372 Land Subdivision', layer: ind23ss72group },
                          { label: '2373 Highway, Street, and Bridge Construction', layer: ind23ss73group },
                          { label: '2379 Other Heavy and Civil Engineering Construction	', layer: ind23ss79group },
                          { label: '2381 Foundation, Structure, and Building Exterior Contractors', layer: ind23ss81group },
                          { label: '2382 Building Equipment Contractors', layer: ind23ss82group },
                          { label: '2383 Building Finishing Contractors', layer: ind23ss83group },
                          { label: '2389 Other Specialty Trade Contractors', layer: ind23ss89group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#f7b6d2";></i> Educational Services', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '6111 Elementary and Secondary Schools', layer: ind61ss11group },
                          { label: '6112 Junior Colleges', layer: ind61ss12group },
                          { label: '6113 Colleges, Universities, and Professional Schools', layer: ind61ss13group },
                          { label: '6114 Business Schools and Computer and Management Training', layer: ind61ss14group },
                          { label: '6115 Technical and Trade Schools', layer: ind61ss15group },
                          { label: '6116 Other Schools and Instruction', layer: ind61ss16group },
                          { label: '6117 Educational Support Services', layer: ind61ss17group},
                                ] },
                        { label: '<i class="fas fa-square" style="color:#e377c2";></i> Finance and Insurance',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5211 Monetary Authorities-Central Bank', layer: ind52ss11group },
                          { label: '5221 Depository Credit Intermediation', layer: ind52ss21group },
                          { label: '5222 Nondepository Credit Intermediation', layer: ind52ss22group },
                          { label: '5223 Activities Related to Credit Intermediation', layer: ind52ss23group },
                          { label: '5231 Securities and Commodity Contracts Intermediation and Brokerage', layer: ind52ss31group },
                          { label: '5232 Securities and Commodity Exchanges', layer: ind52ss32group },
                          { label: '5239 Other Financial Investment Activities', layer: ind52ss39group },
                          { label: '5241 Insurance Carriers', layer: ind52ss41group },
                          { label: '5242 Agencies, Brokerages, and Other Insurance Related Activities', layer: ind52ss42group },
                          { label: '5251 Insurance and Employee Benefit Funds', layer: ind52ss51group },
                          { label: '5259 Other Investment Pools and Funds', layer: ind52ss59group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#c49c94";></i> Health Care and Social Assistance',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '6211 Offices of Physicians', layer: ind62ss11group },
                          { label: '6212 Offices of Dentists', layer: ind62ss12group },
                          { label: '6213 Offices of Other Health Practitioner', layer: ind62ss13group },
                          { label: '6214 Outpatient Care Centers', layer: ind62ss14group },
                          { label: '6215 Medical and Diagnostic Laboratories', layer: ind62ss15group },
                          { label: '6216 Home Health Care Services', layer: ind62ss16group },
                          { label: '6219 Other Ambulatory Health Care Services', layer: ind62ss19group },
                          { label: '6221 General Medical and Surgical Hospitals', layer: ind62ss21group },
                          { label: '6222 Psychiatric and Substance Abuse Hospitals', layer: ind62ss22group },
                          { label: '6223 Specialty (except Psychiatric and Substance Abuse) Hospitals', layer: ind62ss23group },
                          { label: '6231 Nursing Care Facilities (Skilled Nursing Facilities)', layer: ind62ss31group },
                          { label: '6232 Residential Intellectual and Developmental Disability, Mental Health, and Substance Abuse Facilities', layer: ind62ss32group },
                          { label: '6233 Continuing Care Retirement Communities and Assisted Living Facilities for the Elderly', layer: ind62ss33group },
                          { label: '6239 Other Residential Care Facilities', layer: ind62ss39group },
                          { label: '6241 Individual and Family Services', layer: ind62ss41group },
                          { label: '6242 Community Food and Housing, and Emergency and Other Relief Services', layer: ind62ss42group },
                          { label: '6243 Vocational Rehabilitation Services', layer: ind62ss43group },
                          { label: '6244 Child Day Care Services', layer: ind62ss44group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#8c564b";></i> Information', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5111 Newspaper, Periodical, Book, and Directory Publishers	', layer: ind51ss11group },
                          { label: '5112 Software Publishers', layer: ind51ss12group },
                          { label: '5121 Motion Picture and Video Industries', layer: ind51ss21group },
                          { label: '5122 Sound Recording Industries', layer: ind51ss22group },
                          { label: '5151 Radio and Television Broadcasting', layer: ind51ss51group },
                          { label: '5152 Cable and Other Subscription Programming', layer: ind51ss52group },
                          { label: '5173 Wired and Wireless Telecommunications Carriers', layer: ind51ss73group },
                          { label: '5174 Satellite Telecommunications', layer: ind51ss74group },
                          { label: '5179 Other Telecommunications', layer: ind51ss79group },
                          { label: '5182 Data Processing, Hosting, and Related Services', layer: ind51ss82group },
                          { label: '5191 Other Information Service', layer: ind51ss91group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#c5b0d5";></i> Management of Companies and Enterprises',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5511 Management of Companies and Enterprises', layer: ind55ss11group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#9467bd";></i> Manufacturing',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '3111 Animal Food Manufacturing', layer: ind31ss11group },
                          { label: '3112 Grain and Oilseed Milling', layer: ind31ss12group },
                          { label: '3113 Sugar and Confectionery Product Manufacturing', layer: ind31ss13group },
                          { label: '3114 Fruit and Vegetable Preserving and Specialty Food Manufacturing', layer: ind31ss14group },
                          { label: '3115 Dairy Product Manufacturing', layer: ind31ss15group },
                          { label: '3116 Animal Slaughtering and Processing', layer: ind31ss16group },
                          { label: '3117 Seafood Product Preparation and Packaging', layer: ind31ss17group },
                          { label: '3118 Bakeries and Tortilla Manufacturing', layer: ind31ss18group },
                          { label: '3119 Other Food Manufacturing', layer: ind31ss19group },
                          { label: '3121 Beverage Manufacturing', layer: ind31ss21group },
                          { label: '3122 Tobacco Manufacturing', layer: ind31ss22group },
                          { label: '3131 Fiber, Yarn, and Thread Mills', layer: ind31ss31group },
                          { label: '3132 Fabric Mills', layer: ind31ss32group },
                          { label: '3133 Textile and Fabric Finishing and Fabric Coating Mills', layer: ind31ss33group },
                          { label: '3141 Textile Furnishings Mills', layer: ind31ss41group },
                          { label: '3149 Other Textile Product Mills', layer: ind31ss49group },
                          { label: '3151 Apparel Knitting Mills', layer: ind31ss51group },
                          { label: '3152 Cut and Sew Apparel Manufacturing', layer: ind31ss52group },
                          { label: '3159 Apparel Accessories and Other Apparel Manufacturing', layer: ind31ss59group },
                          { label: '3161 Leather and Hide Tanning and Finishing', layer: ind31ss61group },
                          { label: '3162 Footwear Manufacturing', layer: ind31ss62group },
                          { label: '3169 Other Leather and Allied Product Manufacturing', layer: ind31ss69group },
                          { label: '3211 Sawmills and Wood Preservation', layer: ind32ss11group },
                          { label: '3212 Veneer, Plywood, and Engineered Wood Product Manufacturing', layer: ind32ss12group },
                          { label: '3219 Other Wood Product Manufacturing', layer: ind32ss19group },
                          { label: '3221 Pulp, Paper, and Paperboard Mills', layer: ind32ss21group },
                          { label: '3222 Converted Paper Product Manufacturing', layer: ind32ss22group },
                          { label: '3231 Printing and Related Support Activities', layer: ind32ss31group },
                          { label: '3241 Petroleum and Coal Products Manufacturing', layer: ind32ss41group },
                          { label: '3251 Basic Chemical Manufacturing', layer: ind32ss51group },
                          { label: '3252 Resin, Synthetic Rubber, and Artificial Synthetic Fibers and Filaments Manufacturing', layer: ind32ss52group },
                          { label: '3253 Pesticide, Fertilizer, and Other Agricultural Chemical Manufacturing', layer: ind32ss53group },
                          { label: '3254 Pharmaceutical and Medicine Manufacturing', layer: ind32ss54group },
                          { label: '3255 Paint, Coating, and Adhesive Manufacturing', layer: ind32ss55group },
                          { label: '3256 Soap, Cleaning Compound, and Toilet Preparation Manufacturing', layer: ind32ss56group },
                          { label: '3259 Other Chemical Product and Preparation Manufacturing', layer: ind32ss59group },
                          { label: '3261 Plastics Product Manufacturing', layer: ind32ss61group },
                          { label: '3262 Rubber Product Manufacturing', layer: ind32ss62group },
                          { label: '3271 Clay Product and Refractory Manufacturing', layer: ind32ss71group },
                          { label: '3272 Glass and Glass Product Manufacturing', layer: ind32ss72group },
                          { label: '3273 Cement and Concrete Product Manufacturing', layer: ind32ss73group },
                          { label: '3274 Lime and Gypsum Product Manufacturing', layer: ind32ss74group },
                          { label: '3279 Other Nonmetallic Mineral Product Manufacturing', layer: ind32ss79group },
                          { label: '3311 Iron and Steel Mills and Ferroalloy Manufacturing', layer: ind33ss11group },
                          { label: '3312 Steel Product Manufacturing from Purchased Steel', layer: ind33ss12group },
                          { label: '3313 Alumina and Aluminum Production and Processing', layer: ind33ss13group },
                          { label: '3314 Nonferrous Metal (except Aluminum) Production and Processing', layer: ind33ss14group },
                          { label: '3315 Foundries', layer: ind33ss15group },
                          { label: '3321 Forging and Stamping', layer: ind33ss21group },
                          { label: '3322 Cutlery and Handtool Manufacturing', layer: ind33ss22group },
                          { label: '3323 Architectural and Structural Metals Manufacturing', layer: ind33ss23group },
                          { label: '3324 Boiler, Tank, and Shipping Container Manufacturing', layer: ind33ss24group },
                          { label: '3325 Hardware Manufacturing', layer: ind33ss25group },
                          { label: '3326 Spring and Wire Product Manufacturing', layer: ind33ss26group },
                          { label: '3327 Machine Shops; Turned Product; and Screw, Nut, and Bolt Manufacturing', layer: ind33ss27group },
                          { label: '3328 Coating, Engraving, Heat Treating, and Allied Activities', layer: ind33ss28group },
                          { label: '3329 Other Fabricated Metal Product Manufacturing', layer: ind33ss29group },
                          { label: '3331 Agriculture, Construction, and Mining Machinery Manufacturing', layer: ind33ss31group },
                          { label: '3332 Industrial Machinery Manufacturing', layer: ind33ss32group },
                          { label: '3333 Commercial and Service Industry Machinery Manufacturing', layer: ind33ss33group },
                          { label: '3334 Ventilation, Heating, Air-Conditioning, and Commercial Refrigeration Equipment Manufacturing', layer: ind33ss34group },
                          { label: '3335 Metalworking Machinery Manufacturing', layer: ind33ss35group },
                          { label: '3336 Engine, Turbine, and Power Transmission Equipment Manufacturing', layer: ind33ss36group },
                          { label: '3339 Other General Purpose Machinery Manufacturing', layer: ind33ss39group },
                          { label: '3341 Computer and Peripheral Equipment Manufacturing', layer: ind33ss41group },
                          { label: '3342 Communications Equipment Manufacturing', layer: ind33ss42group },
                          { label: '3343 Audio and Video Equipment Manufacturing', layer: ind33ss43group },
                          { label: '3344 Semiconductor and Other Electronic Component Manufacturing', layer: ind33ss44group },
                          { label: '3345 Navigational, Measuring, Electromedical, and Control Instruments Manufacturing', layer: ind33ss45group },
                          { label: '3346 Manufacturing and Reproducing Magnetic and Optical Media', layer: ind33ss46group },
                          { label: '3351 Electric Lighting Equipment Manufacturing', layer: ind33ss51group },
                          { label: '3352 Household Appliance Manufacturing', layer: ind33ss52group },
                          { label: '3353 Electrical Equipment Manufacturing', layer: ind33ss53group },
                          { label: '3359 Other Electrical Equipment and Component Manufacturing', layer: ind33ss59group },
                          { label: '3361 Motor Vehicle Manufacturing', layer: ind33ss61group },
                          { label: '3362 Motor Vehicle Body and Trailer Manufacturing', layer: ind33ss62group },
                          { label: '3363 Motor Vehicle Parts Manufacturing', layer: ind33ss63group },
                          { label: '3364 Aerospace Product and Parts Manufacturing', layer: ind33ss64group },
                          { label: '3365 Railroad Rolling Stock Manufacturing', layer: ind33ss65group },
                          { label: '3366 Ship and Boat Building', layer: ind33ss66group },
                          { label: '3369 Other Transportation Equipment Manufacturing', layer: ind33ss69group },
                          { label: '3371 Household and Institutional Furniture and Kitchen Cabinet Manufacturing', layer: ind33ss71group },
                          { label: '3372 Office Furniture (including Fixtures) Manufacturing', layer: ind33ss72group },
                          { label: '3379 Other Furniture Related Product Manufacturing', layer: ind33ss79group },
                          { label: '3391 Medical Equipment and Supplies Manufacturing', layer: ind33ss91group },
                          { label: '3399 Other Miscellaneous Manufacturing', layer: ind33ss99group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#ff9896";></i> Mining, Quarrying, and Oil and Gas Extraction', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '2111 Oil and Gas Extraction', layer: ind21ss11group },
                          { label: '2121 Coal Mining', layer: ind21ss21group },
                          { label: '2122 Metal Ore Mining', layer: ind21ss22group },
                          { label: '2123 Nonmetallic Mineral Mining and Quarrying', layer: ind21ss23group },
                          { label: '2131 Support Activities for Mining', layer: ind21ss31group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#c8c8a9";></i> Nonclassifiable Establishments', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: 'Nonclassifiable Establishments', layer: ind99ss00group },
                        ] },
                        { label: '<i class="fas fa-square" style="color:#86b4a9";></i> Not Available', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: 'Not Available', layer: ind00ss00group },
                        ] },
                        { label: '<i class="fas fa-square" style="color:#d62728";></i> Other Services (except Public Administration)', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '8111 Automotive Repair and Maintenance', layer: ind81ss11group },
                          { label: '8112 Electronic and Precision Equipment Repair and Maintenanc', layer: ind81ss12group },
                          { label: '8113 Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance', layer: ind81ss13group },
                          { label: '8114 Personal and Household Goods Repair and Maintenance', layer: ind81ss14group },
                          { label: '8121 Personal Care Services', layer: ind81ss21group },
                          { label: '8122 Death Care Services', layer: ind81ss22group },
                          { label: '8123 Drycleaning and Laundry Services', layer: ind81ss23group },
                          { label: '8129 Other Personal Services', layer: ind81ss29group },
                          { label: '8131 Religious Organizations', layer: ind81ss31group },
                          { label: '8132 Grantmaking and Giving Services', layer: ind81ss32group },
                          { label: '8133 Social Advocacy Organizations', layer: ind81ss33group },
                          { label: '8134 Civic and Social Organization', layer: ind81ss34group },
                          { label: '8139 Business, Professional, Labor, Political, and Similar Organizations', layer: ind81ss39group },
                          { label: '8141 Private Households', layer: ind81ss41group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#98df8a";></i> Professional, Scientific, and Technical Services', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5411 Legal Services', layer: ind54ss11group },
                          { label: '5412 Accounting, Tax Preparation, Bookkeeping, and Payroll Services', layer: ind54ss12group },
                          { label: '5413 Architectural, Engineering, and Related Services', layer: ind54ss13group },
                          { label: '5414 Specialized Design Services', layer: ind54ss14group },
                          { label: '5415 Computer Systems Design and Related Services', layer: ind54ss15group },
                          { label: '5416 Management, Scientific, and Technical Consulting Services', layer: ind54ss16group },
                          { label: '5417 Scientific Research and Development Services', layer: ind54ss17group },
                          { label: '5418 Advertising, Public Relations, and Related Services', layer: ind54ss18group },
                          { label: '5419 Other Professional, Scientific, and Technical Services', layer: ind54ss19group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#2ca02c";></i> Public Administration',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '9211 Executive, Legislative, and Other General Government Support', layer: ind92ss11group },
                          { label: '9221 Justice, Public Order, and Safety Activities', layer: ind92ss21group },
                          { label: '9231 Administration of Human Resource Programs', layer: ind92ss31group },
                          { label: '9241 Administration of Environmental Quality Programs', layer: ind92ss41group },
                          { label: '9251 Administration of Housing Programs, Urban Planning, and Community Development', layer: ind92ss51group },
                          { label: '9261 Administration of Economic Programs', layer: ind92ss61group },
                          { label: '9271 Space Research and Technology', layer: ind92ss71group },
                          { label: '9281 National Security and International Affairs', layer: ind92ss81group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#ffbb78";></i> Real Estate and Rental and Leasing', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '5311 Lessors of Real Estate', layer: ind53ss11group },
                          { label: '5312 Offices of Real Estate Agents and Brokers', layer: ind53ss12group },
                          { label: '5313 Activities Related to Real Estate', layer: ind53ss13group },
                          { label: '5321 Automotive Equipment Rental and Leasing', layer: ind53ss21group },
                          { label: '5322 Consumer Goods Rental', layer: ind53ss22group },
                          { label: '5323 General Rental Centers', layer: ind53ss23group },
                          { label: '5324 Commercial and Industrial Machinery and Equipment Rental and Leasing', layer: ind53ss24group },
                          { label: '5331 Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)', layer: ind53ss31group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#ff7f0e";></i> Retail Trade', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '4411 Automobile Dealers ', layer: ind44ss11group },
                          { label: '4412 Other Motor Vehicle Dealers ', layer: ind44ss12group },
                          { label: '4413 Automotive Parts, Accessories, and Tire Stores ', layer: ind44ss13group },
                          { label: '4421 Furniture Stores ', layer: ind44ss21group },
                          { label: '4422 Home Furnishings Stores ', layer: ind44ss22group },
                          { label: '4431 Electronics and Appliance Stores ', layer: ind44ss31group },
                          { label: '4441 Building Material and Supplies Dealers ', layer: ind44ss41group },
                          { label: '4442 Lawn and Garden Equipment and Supplies Stores ', layer: ind44ss42group },
                          { label: '4451 Grocery Stores ', layer: ind44ss51group },
                          { label: '4452 Specialty Food Stores ', layer: ind44ss52group },
                          { label: '4453 Beer, Wine, and Liquor Stores ', layer: ind44ss53group },
                          { label: '4461 Health and Personal Care Stores ', layer: ind44ss61group },
                          { label: '4471 Gasoline Stations ', layer: ind44ss71group },
                          { label: '4481 Clothing Stores ', layer: ind44ss81group },
                          { label: '4482 Shoe Stores ', layer: ind44ss82group },
                          { label: '4483 Jewelry, Luggage, and Leather Goods Stores ', layer: ind44ss83group },
                          { label: '4511 Sporting Goods, Hobby, and Musical Instrument Stores ', layer: ind45ss11group },
                          { label: '4512 Book Stores and News Dealers ', layer: ind45ss12group },
                          { label: '4522 Department Stores ', layer: ind45ss22group },
                          { label: '4523 General Merchandise Stores, including Warehouse Clubs and Supercenters ', layer: ind45ss23group },
                          { label: '4531 Florists ', layer: ind45ss31group },
                          { label: '4532 Office Supplies, Stationery, and Gift Stores ', layer: ind45ss32group },
                          { label: '4533 Used Merchandise Stores ', layer: ind45ss33group },
                          { label: '4539 Other Miscellaneous Store Retailers ', layer: ind45ss39group }, 
                          { label: '4541 Electronic Shopping and Mail-Order Houses ', layer: ind45ss41group },
                          { label: '4542 Vending Machine Operators ', layer: ind45ss42group },
                          { label: '4543 Direct Selling Establishments ', layer: ind45ss43group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#aec7e8";></i> Transportation and Warehousing', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '4811 Scheduled Air Transportation', layer: ind48ss11group },
                          { label: '4812 Nonscheduled Air Transportation', layer: ind48ss12group },
                          { label: '4821 Rail Transportation', layer: ind48ss21group },
                          { label: '4831 Deep Sea, Coastal, and Great Lakes Water Transportation', layer: ind48ss31group },
                          { label: '4832 Inland Water Transportation', layer: ind48ss32group },
                          { label: '4841 General Freight Trucking', layer: ind48ss41group },
                          { label: '4842 Specialized Freight Trucking', layer: ind48ss42group },
                          { label: '4851 Urban Transit Systems', layer: ind48ss51group },
                          { label: '4852 Interurban and Rural Bus Transportation', layer: ind48ss52group },
                          { label: '4853 Taxi and Limousine Service', layer: ind48ss53group },
                          { label: '4854 School and Employee Bus Transportation', layer: ind48ss54group },
                          { label: '4855 Charter Bus Industry', layer: ind48ss55group },
                          { label: '4859 Other Transit and Ground Passenger Transportation', layer: ind48ss59group },
                          { label: '4861 Pipeline Transportation of Crude Oil', layer: ind48ss61group },
                          { label: '4862 Pipeline Transportation of Natural Gas', layer: ind48ss62group }, 
                          { label: '4869 Other Pipeline Transportation', layer: ind48ss69group },
                          { label: '4871 Scenic and Sightseeing Transportation, Land', layer: ind48ss71group },
                          { label: '4872 Scenic and Sightseeing Transportation, Water', layer: ind48ss72group },
                          { label: '4879 Scenic and Sightseeing Transportation, Other', layer: ind48ss79group },
                          { label: '4881 Support Activities for Air Transportation', layer: ind48ss81group },
                          { label: '4882 Support Activities for Rail Transportation', layer: ind48ss82group },
                          { label: '4883 Support Activities for Water Transportation', layer: ind48ss83group },
                          { label: '4884 Support Activities for Road Transportation', layer: ind48ss84group },
                          { label: '4885 Freight Transportation Arrangement', layer: ind48ss85group },
                          { label: '4889 Other Support Activities for Transportation', layer: ind48ss89group },
                          { label: '4911 Postal Service', layer: ind49ss11group },
                          { label: '4921 Couriers and Express Delivery Services', layer: ind49ss21group },
                          { label: '4922 Local Messengers and Local Delivery', layer: ind49ss22group },
                          { label: '4931 Warehousing and Storage', layer: ind49ss31group },
                                ] },
                          { label: '<i class="fas fa-square" style="color:#1f77b4";></i> Utilities',
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '2211 Electric Power Generation, Transmission and Distribution', layer: ind22ss11group },
                          { label: '2212 Natural Gas Distribution', layer: ind22ss12group },
                          { label: '2213 Water, Sewage and Other Systems', layer: ind22ss13group },
                                ] },
                        { label: '<i class="fas fa-square" style="color:#9edae5";></i> Wholesale Trade', 
                        selectAllCheckbox: true,
                        collapsed: true,
                        children: [
                          { label: '4231 Motor Vehicle and Motor Vehicle Parts and Supplies Merchant Wholesalers ', layer: ind42ss31group },
                          { label: '4232 Furniture and Home Furnishing Merchant Wholesalers ', layer: ind42ss32group },
                          { label: '4233 Lumber and Other Construction Materials Merchant Wholesalers ', layer: ind42ss33group },
                          { label: '4234 Professional and Commercial Equipment and Supplies Merchant Wholesalers ', layer: ind42ss34group },
                          { label: '4235 Metal and Mineral (except Petroleum) Merchant Wholesalers ', layer: ind42ss35group },
                          { label: '4236 Household Appliances and Electrical and Electronic Goods Merchant Wholesalers ', layer: ind42ss36group },
                          { label: '4237 Hardware, and Plumbing and Heating Equipment and Supplies Merchant Wholesalers ', layer: ind42ss37group },
                          { label: '4238 Machinery, Equipment, and Supplies Merchant Wholesalers ', layer: ind42ss38group },
                          { label: '4239 Miscellaneous Durable Goods Merchant Wholesalers ', layer: ind42ss39group },
                          { label: '4241 Paper and Paper Product Merchant Wholesalers ', layer: ind42ss41group },
                          { label: '4242 Drugs and Druggists Sundries Merchant Wholesalers ', layer: ind42ss42group },
                          { label: '4243 Apparel, Piece Goods, and Notions Merchant Wholesalers ', layer: ind42ss43group },
                          { label: '4244 Grocery and Related Product Merchant Wholesalers ', layer: ind42ss44group },
                          { label: '4245 Farm Product Raw Material Merchant Wholesalers ', layer: ind42ss45group },
                          { label: '4246 Chemical and Allied Products Merchant Wholesalers ', layer: ind42ss46group },
                          { label: '4247 Petroleum and Petroleum Products Merchant Wholesalers ', layer: ind42ss47group },
                          { label: '4248 Beer, Wine, and Distilled Alcoholic Beverage Merchant Wholesalers ', layer: ind42ss48group },
                          { label: '4249 Miscellaneous Nondurable Goods Merchant Wholesalers ', layer: ind42ss49group },
                          { label: '4251 Wholesale Electronic Markets and Agents and Brokers ', layer: ind42ss51group },                          
                                ]},
                    ]},
                {
                  label: '<b>Loan Range</b>',
                  collapsed: true,
                  selectAllCheckbox: true,
                  children: [
                      { label: '<i class="fas fa-circle fa-2xs";></i> a $150,000-350,000', layer: LoanRangeA },
                      { label: '<i class="fas fa-circle fa-xs";></i> b $350,000-1 million', layer: LoanRangeB},
                      { label: '<i class="fas fa-circle fa-sm";></i> c $1-2 million', layer: LoanRangeC },
                      { label: '<i class="fas fa-circle";></i> d $2-5 million', layer: LoanRangeD },
                      { label: '<i class="fas fa-circle fa-lg";></i> e $5-10 million', layer: LoanRangeE },
                  ]},
                  {
                    label: '<b>Job Range</b>',
                    collapsed: true,
                    selectAllCheckbox: true,
                    children: [
                        { label: 'Fewer than 5', layer: JR1group },
                        { label: '5 to 9', layer: JR2group},
                        { label: '10 to 19', layer: JR3group },
                        { label: '20 to 49', layer: JR4group },
                        { label: '50 to 99', layer: JR5group},
                        { label: '100 to 249', layer: JR6group},
                        { label: '250 to 499', layer: JR7group},
                        { label: '500 or more', layer: JR8group },
                    ]},
                 {
                  label: '<b>Business Type</b>',
                  collapsed: true,
                  selectAllCheckbox: true,
                  selectAll: true,
                  children: [
                      { label: 'Corporation', layer: BT01group },
                      { label: 'Limited Liability Company(LLC)', layer:  BT02group },
                      { label: 'Subchapter S Corporation', layer:  BT03group },
                      { label: 'Non-Profit Organization', layer:  BT04group },
                      { label: 'Partnership', layer:  BT05group },
                      { label: 'Limited Liability Partnership', layer:  BT06group },
                      { label: 'Sole Proprietorship', layer:  BT07group},
                      { label: 'Professional Association', layer:  BT08group },
                      { label: 'Cooperative', layer:  BT09group },
                      { label: '501(c)3 – Non Profit', layer:  BT10group },
                      { label: 'Non-Profit Childcare Center', layer:  BT11group },
                      { label: '501(c)6 – Non Profit Membership', layer:  BT12group},
                      { label: 'Not Available', layer:  BT13group },
                      { label: 'Employee Stock Ownership Plan(ESOP)', layer:  BT14group },
                      { label: 'Self-Employed Individuals', layer:  BT15group },
                      { label: 'Trust', layer:  BT16group},
                      { label: 'Housing Co-op', layer:  BT17group },
                      { label: 'Joint Venture', layer:  BT18group },
                      { label: 'Independent Contractors', layer:  BT19group },
                      { label: 'Single Member LLC', layer:  BT20group},
                      { label: 'Tribal Concerns', layer:  BT21group },
                      { label: 'Tenant in Common', layer:  BT22group },
                      { label: '501(c) – Non Profit except 3,4,6,', layer:  BT23group },
                      { label: 'Rollover as Business Start-Ups (ROB', layer:  BT24group},
                      { label: '501(c)19 – Non Profit Veterans', layer:  BT25group},
                      { label: 'Qualified Joint-Venture (spouses)', layer:  BT26group},
                  ]},
                             {
                    label: '<b>Business Age</b>',
                    collapsed: true,
                    selectAllCheckbox: true,
                    children: [
                        { label: 'Existing or more than 2 years old', layer: BA1group },
                        { label: 'New Business or 2 years or less', layer: BA2group},
                        { label: 'Unanswered', layer: BA3group },
                        { label: 'Change of Ownership', layer: BA4group },
                        { label: 'Startup, Loan Funds will Open Business', layer: BA5group},
                    ]},
                    {
                    label: '<b>Loan Type</b>',
                    collapsed: true,
                    selectAllCheckbox: true,
                    children: [
                        { label: 'PPP', layer: PPPgroup },
                        { label: 'PPS', layer: PPSgroup},
                    ]},
                  ]}
        
      
  
      // Create our map, giving it the streetmap and earthquakes layers to display on load
      var myMap = L.map("map", {
        center: [37.4316, -78.6569], //VA [40.6331, -89.3985], //IL [39.0458, -76.6413], //MD
        zoom: 8,
        layers: [darkmap, streetmap, 
          LoanRangeA, LoanRangeB, LoanRangeC, LoanRangeD, LoanRangeE,
          BT01group, BT02group, BT03group, BT04group, BT05group, BT06group, BT07group, BT08group, BT09group, BT10group,
          BT11group, BT12group, BT13group, BT14group, BT15group, BT16group, BT17group, BT18group, BT19group, BT20group,
          BT21group, BT22group, BT23group, BT24group, BT25group, BT26group,
          PPPgroup, PPSgroup,
          BA1group, BA2group, BA3group, BA4group, BA5group,
          JR1group, JR2group, JR3group, JR4group, JR5group, JR6group, JR7group, JR8group,
          VAgroup, MDgroup, ILgroup, TXgroup]
      });
  
      // myMap.on('click', function (){
      //   myMap.zoomIn();
      // })
  
  
      // // zoom levels
      // myMap.on('zoomend', function() {
      //   var zoomlevel = myMap.getZoom();
      //       if (zoomlevel  <10){
      //           if (myMap.hasLayer(plethblockgroup)) {
      //               myMap.removeLayer(plethblockgroup);
      //               myMap.addLayer(pleth);
      //           } else {
      //               console.log("no point layer active");
      //           }
      //       }F
      //       if (zoomlevel >= 10){
      //           if (myMap.hasLayer(plethblockgroup)){
      //               console.log("layer already added");
      //           }
      //           else {
      //               myMap.addLayer(plethblockgroup);
      //               myMap.removeLayer(pleth)
      //           }
      //       }
      //   console.log("Current Zoom Level =" + zoomlevel)
      //   })

        const content = L.layerGroup().addTo(myMap);
        // filter selection
        myMap.on('overlayadd overlayremove', () => {
       if (myMap.hasLayer(ind00ss00group)) { objSS['IND00SS00'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss11group)) { objSS['IND11SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss12group)) { objSS['IND11SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss13group)) { objSS['IND11SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss14group)) { objSS['IND11SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss19group)) { objSS['IND11SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss21group)) { objSS['IND11SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss22group)) { objSS['IND11SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss23group)) { objSS['IND11SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss24group)) { objSS['IND11SS24'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss25group)) { objSS['IND11SS25'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss29group)) { objSS['IND11SS29'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss31group)) { objSS['IND11SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss32group)) { objSS['IND11SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss33group)) { objSS['IND11SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss41group)) { objSS['IND11SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss42group)) { objSS['IND11SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss51group)) { objSS['IND11SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss52group)) { objSS['IND11SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind11ss53group)) { objSS['IND11SS53'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind21ss11group)) { objSS['IND21SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind21ss21group)) { objSS['IND21SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind21ss22group)) { objSS['IND21SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind21ss23group)) { objSS['IND21SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind21ss31group)) { objSS['IND21SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind22ss11group)) { objSS['IND22SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind22ss12group)) { objSS['IND22SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind22ss13group)) { objSS['IND22SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss61group)) { objSS['IND23SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss62group)) { objSS['IND23SS62'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss71group)) { objSS['IND23SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss72group)) { objSS['IND23SS72'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss73group)) { objSS['IND23SS73'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss79group)) { objSS['IND23SS79'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss81group)) { objSS['IND23SS81'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss82group)) { objSS['IND23SS82'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss83group)) { objSS['IND23SS83'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind23ss89group)) { objSS['IND23SS89'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss11group)) { objSS['IND31SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss12group)) { objSS['IND31SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss13group)) { objSS['IND31SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss14group)) { objSS['IND31SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss15group)) { objSS['IND31SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss16group)) { objSS['IND31SS16'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss17group)) { objSS['IND31SS17'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss18group)) { objSS['IND31SS18'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss19group)) { objSS['IND31SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss21group)) { objSS['IND31SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss22group)) { objSS['IND31SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss31group)) { objSS['IND31SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss32group)) { objSS['IND31SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss33group)) { objSS['IND31SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss41group)) { objSS['IND31SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss49group)) { objSS['IND31SS49'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss51group)) { objSS['IND31SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss52group)) { objSS['IND31SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss59group)) { objSS['IND31SS59'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss61group)) { objSS['IND31SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss62group)) { objSS['IND31SS62'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind31ss69group)) { objSS['IND31SS69'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss11group)) { objSS['IND32SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss12group)) { objSS['IND32SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss19group)) { objSS['IND32SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss21group)) { objSS['IND32SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss22group)) { objSS['IND32SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss31group)) { objSS['IND32SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss41group)) { objSS['IND32SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss51group)) { objSS['IND32SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss52group)) { objSS['IND32SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss53group)) { objSS['IND32SS53'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss54group)) { objSS['IND32SS54'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss55group)) { objSS['IND32SS55'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss56group)) { objSS['IND32SS56'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss59group)) { objSS['IND32SS59'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss61group)) { objSS['IND32SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss62group)) { objSS['IND32SS62'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss71group)) { objSS['IND32SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss72group)) { objSS['IND32SS72'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss73group)) { objSS['IND32SS73'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss74group)) { objSS['IND32SS74'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind32ss79group)) { objSS['IND32SS79'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss11group)) { objSS['IND33SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss12group)) { objSS['IND33SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss13group)) { objSS['IND33SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss14group)) { objSS['IND33SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss15group)) { objSS['IND33SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss21group)) { objSS['IND33SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss22group)) { objSS['IND33SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss23group)) { objSS['IND33SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss24group)) { objSS['IND33SS24'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss25group)) { objSS['IND33SS25'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss26group)) { objSS['IND33SS26'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss27group)) { objSS['IND33SS27'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss28group)) { objSS['IND33SS28'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss29group)) { objSS['IND33SS29'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss31group)) { objSS['IND33SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss32group)) { objSS['IND33SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss33group)) { objSS['IND33SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss34group)) { objSS['IND33SS34'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss35group)) { objSS['IND33SS35'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss36group)) { objSS['IND33SS36'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss39group)) { objSS['IND33SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss41group)) { objSS['IND33SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss42group)) { objSS['IND33SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss43group)) { objSS['IND33SS43'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss44group)) { objSS['IND33SS44'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss45group)) { objSS['IND33SS45'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss46group)) { objSS['IND33SS46'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss51group)) { objSS['IND33SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss52group)) { objSS['IND33SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss53group)) { objSS['IND33SS53'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss59group)) { objSS['IND33SS59'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss61group)) { objSS['IND33SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss62group)) { objSS['IND33SS62'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss63group)) { objSS['IND33SS63'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss64group)) { objSS['IND33SS64'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss65group)) { objSS['IND33SS65'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss66group)) { objSS['IND33SS66'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss69group)) { objSS['IND33SS69'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss71group)) { objSS['IND33SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss72group)) { objSS['IND33SS72'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss79group)) { objSS['IND33SS79'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss91group)) { objSS['IND33SS91'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind33ss99group)) { objSS['IND33SS99'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss31group)) { objSS['IND42SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss32group)) { objSS['IND42SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss33group)) { objSS['IND42SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss34group)) { objSS['IND42SS34'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss35group)) { objSS['IND42SS35'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss36group)) { objSS['IND42SS36'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss37group)) { objSS['IND42SS37'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss38group)) { objSS['IND42SS38'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss39group)) { objSS['IND42SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss41group)) { objSS['IND42SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss42group)) { objSS['IND42SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss43group)) { objSS['IND42SS43'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss44group)) { objSS['IND42SS44'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss45group)) { objSS['IND42SS45'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss46group)) { objSS['IND42SS46'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss47group)) { objSS['IND42SS47'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss48group)) { objSS['IND42SS48'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss49group)) { objSS['IND42SS49'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind42ss51group)) { objSS['IND42SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss11group)) { objSS['IND44SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss12group)) { objSS['IND44SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss13group)) { objSS['IND44SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss21group)) { objSS['IND44SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss22group)) { objSS['IND44SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss31group)) { objSS['IND44SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss41group)) { objSS['IND44SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss42group)) { objSS['IND44SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss51group)) { objSS['IND44SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss52group)) { objSS['IND44SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss53group)) { objSS['IND44SS53'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss61group)) { objSS['IND44SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss71group)) { objSS['IND44SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss81group)) { objSS['IND44SS81'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss82group)) { objSS['IND44SS82'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind44ss83group)) { objSS['IND44SS83'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss11group)) { objSS['IND45SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss12group)) { objSS['IND45SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss22group)) { objSS['IND45SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss23group)) { objSS['IND45SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss31group)) { objSS['IND45SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss32group)) { objSS['IND45SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss33group)) { objSS['IND45SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss39group)) { objSS['IND45SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss41group)) { objSS['IND45SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss42group)) { objSS['IND45SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind45ss43group)) { objSS['IND45SS43'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss11group)) { objSS['IND48SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss12group)) { objSS['IND48SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss21group)) { objSS['IND48SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss31group)) { objSS['IND48SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss32group)) { objSS['IND48SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss41group)) { objSS['IND48SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss42group)) { objSS['IND48SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss51group)) { objSS['IND48SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss52group)) { objSS['IND48SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss53group)) { objSS['IND48SS53'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss54group)) { objSS['IND48SS54'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss55group)) { objSS['IND48SS55'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss59group)) { objSS['IND48SS59'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss61group)) { objSS['IND48SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss62group)) { objSS['IND48SS62'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss69group)) { objSS['IND48SS69'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss71group)) { objSS['IND48SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss72group)) { objSS['IND48SS72'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss79group)) { objSS['IND48SS79'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss81group)) { objSS['IND48SS81'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss82group)) { objSS['IND48SS82'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss83group)) { objSS['IND48SS83'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss84group)) { objSS['IND48SS84'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss85group)) { objSS['IND48SS85'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind48ss89group)) { objSS['IND48SS89'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind49ss11group)) { objSS['IND49SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind49ss21group)) { objSS['IND49SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind49ss22group)) { objSS['IND49SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind49ss31group)) { objSS['IND49SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss11group)) { objSS['IND51SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss12group)) { objSS['IND51SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss21group)) { objSS['IND51SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss22group)) { objSS['IND51SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss51group)) { objSS['IND51SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss52group)) { objSS['IND51SS52'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss73group)) { objSS['IND51SS73'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss74group)) { objSS['IND51SS74'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss79group)) { objSS['IND51SS79'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss82group)) { objSS['IND51SS82'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind51ss91group)) { objSS['IND51SS91'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss11group)) { objSS['IND52SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss21group)) { objSS['IND52SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss22group)) { objSS['IND52SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss23group)) { objSS['IND52SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss31group)) { objSS['IND52SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss32group)) { objSS['IND52SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss39group)) { objSS['IND52SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss41group)) { objSS['IND52SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss42group)) { objSS['IND52SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss51group)) { objSS['IND52SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind52ss59group)) { objSS['IND52SS59'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss11group)) { objSS['IND53SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss12group)) { objSS['IND53SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss13group)) { objSS['IND53SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss21group)) { objSS['IND53SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss22group)) { objSS['IND53SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss23group)) { objSS['IND53SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss24group)) { objSS['IND53SS24'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind53ss31group)) { objSS['IND53SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss11group)) { objSS['IND54SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss12group)) { objSS['IND54SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss13group)) { objSS['IND54SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss14group)) { objSS['IND54SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss15group)) { objSS['IND54SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss16group)) { objSS['IND54SS16'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss17group)) { objSS['IND54SS17'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss18group)) { objSS['IND54SS18'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind54ss19group)) { objSS['IND54SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind55ss11group)) { objSS['IND55SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss11group)) { objSS['IND56SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss12group)) { objSS['IND56SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss13group)) { objSS['IND56SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss14group)) { objSS['IND56SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss15group)) { objSS['IND56SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss16group)) { objSS['IND56SS16'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss17group)) { objSS['IND56SS17'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss19group)) { objSS['IND56SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss21group)) { objSS['IND56SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss22group)) { objSS['IND56SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind56ss29group)) { objSS['IND56SS29'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss11group)) { objSS['IND61SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss12group)) { objSS['IND61SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss13group)) { objSS['IND61SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss14group)) { objSS['IND61SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss15group)) { objSS['IND61SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss16group)) { objSS['IND61SS16'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind61ss17group)) { objSS['IND61SS17'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss11group)) { objSS['IND62SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss12group)) { objSS['IND62SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss13group)) { objSS['IND62SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss14group)) { objSS['IND62SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss15group)) { objSS['IND62SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss16group)) { objSS['IND62SS16'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss19group)) { objSS['IND62SS19'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss21group)) { objSS['IND62SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss22group)) { objSS['IND62SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss23group)) { objSS['IND62SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss31group)) { objSS['IND62SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss32group)) { objSS['IND62SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss33group)) { objSS['IND62SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss39group)) { objSS['IND62SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss41group)) { objSS['IND62SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss42group)) { objSS['IND62SS42'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss43group)) { objSS['IND62SS43'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind62ss44group)) { objSS['IND62SS44'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss11group)) { objSS['IND71SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss12group)) { objSS['IND71SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss13group)) { objSS['IND71SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss14group)) { objSS['IND71SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss15group)) { objSS['IND71SS15'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss21group)) { objSS['IND71SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss31group)) { objSS['IND71SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss32group)) { objSS['IND71SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind71ss39group)) { objSS['IND71SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss11group)) { objSS['IND72SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss12group)) { objSS['IND72SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss13group)) { objSS['IND72SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss23group)) { objSS['IND72SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss24group)) { objSS['IND72SS24'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind72ss25group)) { objSS['IND72SS25'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss11group)) { objSS['IND81SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss12group)) { objSS['IND81SS12'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss13group)) { objSS['IND81SS13'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss14group)) { objSS['IND81SS14'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss21group)) { objSS['IND81SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss22group)) { objSS['IND81SS22'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss23group)) { objSS['IND81SS23'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss29group)) { objSS['IND81SS29'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss31group)) { objSS['IND81SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss32group)) { objSS['IND81SS32'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss33group)) { objSS['IND81SS33'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss34group)) { objSS['IND81SS34'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss39group)) { objSS['IND81SS39'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind81ss41group)) { objSS['IND81SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss11group)) { objSS['IND92SS11'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss21group)) { objSS['IND92SS21'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss31group)) { objSS['IND92SS31'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss41group)) { objSS['IND92SS41'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss51group)) { objSS['IND92SS51'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss61group)) { objSS['IND92SS61'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss71group)) { objSS['IND92SS71'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind92ss81group)) { objSS['IND92SS81'].forEach(marker=> marker.addTo(content))
        }
       if (myMap.hasLayer(ind99ss00group)) { objSS['IND99SS00'].forEach(marker=> marker.addTo(content))
        }
          if (!myMap.hasLayer(VAgroup)) {
            objpts['51'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(MDgroup)) {
            objpts['24'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(ILgroup)) {
            objpts['17'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(TXgroup)) {
            objpts['48'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(LoanRangeA)) {
            objLR['LR1'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(LoanRangeB)) {
            objLR['LR2'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(LoanRangeC)) {
            objLR['LR3'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(LoanRangeD)) {
            objLR['LR4'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(LoanRangeE)) {
            objLR['LR5'].forEach(marker => content.removeLayer(marker))
          }

       if (!myMap.hasLayer(ind00ss00group)) { objSS['IND00SS00'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss11group)) { objSS['IND11SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss12group)) { objSS['IND11SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss13group)) { objSS['IND11SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss14group)) { objSS['IND11SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss19group)) { objSS['IND11SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss21group)) { objSS['IND11SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss22group)) { objSS['IND11SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss23group)) { objSS['IND11SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss24group)) { objSS['IND11SS24'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss25group)) { objSS['IND11SS25'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss29group)) { objSS['IND11SS29'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss31group)) { objSS['IND11SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss32group)) { objSS['IND11SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss33group)) { objSS['IND11SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss41group)) { objSS['IND11SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss42group)) { objSS['IND11SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss51group)) { objSS['IND11SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss52group)) { objSS['IND11SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind11ss53group)) { objSS['IND11SS53'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind21ss11group)) { objSS['IND21SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind21ss21group)) { objSS['IND21SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind21ss22group)) { objSS['IND21SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind21ss23group)) { objSS['IND21SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind21ss31group)) { objSS['IND21SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind22ss11group)) { objSS['IND22SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind22ss12group)) { objSS['IND22SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind22ss13group)) { objSS['IND22SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss61group)) { objSS['IND23SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss62group)) { objSS['IND23SS62'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss71group)) { objSS['IND23SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss72group)) { objSS['IND23SS72'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss73group)) { objSS['IND23SS73'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss79group)) { objSS['IND23SS79'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss81group)) { objSS['IND23SS81'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss82group)) { objSS['IND23SS82'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss83group)) { objSS['IND23SS83'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind23ss89group)) { objSS['IND23SS89'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss11group)) { objSS['IND31SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss12group)) { objSS['IND31SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss13group)) { objSS['IND31SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss14group)) { objSS['IND31SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss15group)) { objSS['IND31SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss16group)) { objSS['IND31SS16'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss17group)) { objSS['IND31SS17'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss18group)) { objSS['IND31SS18'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss19group)) { objSS['IND31SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss21group)) { objSS['IND31SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss22group)) { objSS['IND31SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss31group)) { objSS['IND31SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss32group)) { objSS['IND31SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss33group)) { objSS['IND31SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss41group)) { objSS['IND31SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss49group)) { objSS['IND31SS49'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss51group)) { objSS['IND31SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss52group)) { objSS['IND31SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss59group)) { objSS['IND31SS59'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss61group)) { objSS['IND31SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss62group)) { objSS['IND31SS62'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind31ss69group)) { objSS['IND31SS69'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss11group)) { objSS['IND32SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss12group)) { objSS['IND32SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss19group)) { objSS['IND32SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss21group)) { objSS['IND32SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss22group)) { objSS['IND32SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss31group)) { objSS['IND32SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss41group)) { objSS['IND32SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss51group)) { objSS['IND32SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss52group)) { objSS['IND32SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss53group)) { objSS['IND32SS53'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss54group)) { objSS['IND32SS54'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss55group)) { objSS['IND32SS55'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss56group)) { objSS['IND32SS56'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss59group)) { objSS['IND32SS59'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss61group)) { objSS['IND32SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss62group)) { objSS['IND32SS62'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss71group)) { objSS['IND32SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss72group)) { objSS['IND32SS72'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss73group)) { objSS['IND32SS73'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss74group)) { objSS['IND32SS74'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind32ss79group)) { objSS['IND32SS79'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss11group)) { objSS['IND33SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss12group)) { objSS['IND33SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss13group)) { objSS['IND33SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss14group)) { objSS['IND33SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss15group)) { objSS['IND33SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss21group)) { objSS['IND33SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss22group)) { objSS['IND33SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss23group)) { objSS['IND33SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss24group)) { objSS['IND33SS24'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss25group)) { objSS['IND33SS25'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss26group)) { objSS['IND33SS26'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss27group)) { objSS['IND33SS27'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss28group)) { objSS['IND33SS28'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss29group)) { objSS['IND33SS29'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss31group)) { objSS['IND33SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss32group)) { objSS['IND33SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss33group)) { objSS['IND33SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss34group)) { objSS['IND33SS34'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss35group)) { objSS['IND33SS35'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss36group)) { objSS['IND33SS36'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss39group)) { objSS['IND33SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss41group)) { objSS['IND33SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss42group)) { objSS['IND33SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss43group)) { objSS['IND33SS43'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss44group)) { objSS['IND33SS44'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss45group)) { objSS['IND33SS45'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss46group)) { objSS['IND33SS46'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss51group)) { objSS['IND33SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss52group)) { objSS['IND33SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss53group)) { objSS['IND33SS53'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss59group)) { objSS['IND33SS59'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss61group)) { objSS['IND33SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss62group)) { objSS['IND33SS62'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss63group)) { objSS['IND33SS63'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss64group)) { objSS['IND33SS64'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss65group)) { objSS['IND33SS65'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss66group)) { objSS['IND33SS66'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss69group)) { objSS['IND33SS69'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss71group)) { objSS['IND33SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss72group)) { objSS['IND33SS72'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss79group)) { objSS['IND33SS79'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss91group)) { objSS['IND33SS91'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind33ss99group)) { objSS['IND33SS99'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss31group)) { objSS['IND42SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss32group)) { objSS['IND42SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss33group)) { objSS['IND42SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss34group)) { objSS['IND42SS34'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss35group)) { objSS['IND42SS35'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss36group)) { objSS['IND42SS36'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss37group)) { objSS['IND42SS37'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss38group)) { objSS['IND42SS38'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss39group)) { objSS['IND42SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss41group)) { objSS['IND42SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss42group)) { objSS['IND42SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss43group)) { objSS['IND42SS43'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss44group)) { objSS['IND42SS44'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss45group)) { objSS['IND42SS45'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss46group)) { objSS['IND42SS46'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss47group)) { objSS['IND42SS47'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss48group)) { objSS['IND42SS48'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss49group)) { objSS['IND42SS49'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind42ss51group)) { objSS['IND42SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss11group)) { objSS['IND44SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss12group)) { objSS['IND44SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss13group)) { objSS['IND44SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss21group)) { objSS['IND44SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss22group)) { objSS['IND44SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss31group)) { objSS['IND44SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss41group)) { objSS['IND44SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss42group)) { objSS['IND44SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss51group)) { objSS['IND44SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss52group)) { objSS['IND44SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss53group)) { objSS['IND44SS53'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss61group)) { objSS['IND44SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss71group)) { objSS['IND44SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss81group)) { objSS['IND44SS81'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss82group)) { objSS['IND44SS82'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind44ss83group)) { objSS['IND44SS83'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss11group)) { objSS['IND45SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss12group)) { objSS['IND45SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss22group)) { objSS['IND45SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss23group)) { objSS['IND45SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss31group)) { objSS['IND45SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss32group)) { objSS['IND45SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss33group)) { objSS['IND45SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss39group)) { objSS['IND45SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss41group)) { objSS['IND45SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss42group)) { objSS['IND45SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind45ss43group)) { objSS['IND45SS43'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss11group)) { objSS['IND48SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss12group)) { objSS['IND48SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss21group)) { objSS['IND48SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss31group)) { objSS['IND48SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss32group)) { objSS['IND48SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss41group)) { objSS['IND48SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss42group)) { objSS['IND48SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss51group)) { objSS['IND48SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss52group)) { objSS['IND48SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss53group)) { objSS['IND48SS53'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss54group)) { objSS['IND48SS54'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss55group)) { objSS['IND48SS55'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss59group)) { objSS['IND48SS59'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss61group)) { objSS['IND48SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss62group)) { objSS['IND48SS62'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss69group)) { objSS['IND48SS69'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss71group)) { objSS['IND48SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss72group)) { objSS['IND48SS72'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss79group)) { objSS['IND48SS79'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss81group)) { objSS['IND48SS81'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss82group)) { objSS['IND48SS82'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss83group)) { objSS['IND48SS83'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss84group)) { objSS['IND48SS84'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss85group)) { objSS['IND48SS85'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind48ss89group)) { objSS['IND48SS89'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind49ss11group)) { objSS['IND49SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind49ss21group)) { objSS['IND49SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind49ss22group)) { objSS['IND49SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind49ss31group)) { objSS['IND49SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss11group)) { objSS['IND51SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss12group)) { objSS['IND51SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss21group)) { objSS['IND51SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss22group)) { objSS['IND51SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss51group)) { objSS['IND51SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss52group)) { objSS['IND51SS52'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss73group)) { objSS['IND51SS73'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss74group)) { objSS['IND51SS74'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss79group)) { objSS['IND51SS79'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss82group)) { objSS['IND51SS82'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind51ss91group)) { objSS['IND51SS91'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss11group)) { objSS['IND52SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss21group)) { objSS['IND52SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss22group)) { objSS['IND52SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss23group)) { objSS['IND52SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss31group)) { objSS['IND52SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss32group)) { objSS['IND52SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss39group)) { objSS['IND52SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss41group)) { objSS['IND52SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss42group)) { objSS['IND52SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss51group)) { objSS['IND52SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind52ss59group)) { objSS['IND52SS59'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss11group)) { objSS['IND53SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss12group)) { objSS['IND53SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss13group)) { objSS['IND53SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss21group)) { objSS['IND53SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss22group)) { objSS['IND53SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss23group)) { objSS['IND53SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss24group)) { objSS['IND53SS24'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind53ss31group)) { objSS['IND53SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss11group)) { objSS['IND54SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss12group)) { objSS['IND54SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss13group)) { objSS['IND54SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss14group)) { objSS['IND54SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss15group)) { objSS['IND54SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss16group)) { objSS['IND54SS16'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss17group)) { objSS['IND54SS17'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss18group)) { objSS['IND54SS18'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind54ss19group)) { objSS['IND54SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind55ss11group)) { objSS['IND55SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss11group)) { objSS['IND56SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss12group)) { objSS['IND56SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss13group)) { objSS['IND56SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss14group)) { objSS['IND56SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss15group)) { objSS['IND56SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss16group)) { objSS['IND56SS16'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss17group)) { objSS['IND56SS17'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss19group)) { objSS['IND56SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss21group)) { objSS['IND56SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss22group)) { objSS['IND56SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind56ss29group)) { objSS['IND56SS29'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss11group)) { objSS['IND61SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss12group)) { objSS['IND61SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss13group)) { objSS['IND61SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss14group)) { objSS['IND61SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss15group)) { objSS['IND61SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss16group)) { objSS['IND61SS16'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind61ss17group)) { objSS['IND61SS17'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss11group)) { objSS['IND62SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss12group)) { objSS['IND62SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss13group)) { objSS['IND62SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss14group)) { objSS['IND62SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss15group)) { objSS['IND62SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss16group)) { objSS['IND62SS16'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss19group)) { objSS['IND62SS19'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss21group)) { objSS['IND62SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss22group)) { objSS['IND62SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss23group)) { objSS['IND62SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss31group)) { objSS['IND62SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss32group)) { objSS['IND62SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss33group)) { objSS['IND62SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss39group)) { objSS['IND62SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss41group)) { objSS['IND62SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss42group)) { objSS['IND62SS42'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss43group)) { objSS['IND62SS43'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind62ss44group)) { objSS['IND62SS44'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss11group)) { objSS['IND71SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss12group)) { objSS['IND71SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss13group)) { objSS['IND71SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss14group)) { objSS['IND71SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss15group)) { objSS['IND71SS15'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss21group)) { objSS['IND71SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss31group)) { objSS['IND71SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss32group)) { objSS['IND71SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind71ss39group)) { objSS['IND71SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss11group)) { objSS['IND72SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss12group)) { objSS['IND72SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss13group)) { objSS['IND72SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss23group)) { objSS['IND72SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss24group)) { objSS['IND72SS24'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind72ss25group)) { objSS['IND72SS25'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss11group)) { objSS['IND81SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss12group)) { objSS['IND81SS12'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss13group)) { objSS['IND81SS13'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss14group)) { objSS['IND81SS14'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss21group)) { objSS['IND81SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss22group)) { objSS['IND81SS22'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss23group)) { objSS['IND81SS23'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss29group)) { objSS['IND81SS29'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss31group)) { objSS['IND81SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss32group)) { objSS['IND81SS32'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss33group)) { objSS['IND81SS33'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss34group)) { objSS['IND81SS34'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss39group)) { objSS['IND81SS39'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind81ss41group)) { objSS['IND81SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss11group)) { objSS['IND92SS11'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss21group)) { objSS['IND92SS21'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss31group)) { objSS['IND92SS31'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss41group)) { objSS['IND92SS41'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss51group)) { objSS['IND92SS51'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss61group)) { objSS['IND92SS61'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss71group)) { objSS['IND92SS71'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind92ss81group)) { objSS['IND92SS81'].forEach(marker => content.removeLayer(marker))
        }
       if (!myMap.hasLayer(ind99ss00group)) { objSS['IND99SS00'].forEach(marker => content.removeLayer(marker))
        }    
          if (!myMap.hasLayer(BT01group)) {
             objBT['BT01'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT02group)) {
             objBT['BT02'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT03group)) {
             objBT['BT03'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT04group)) {
             objBT['BT04'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT05group)) {
             objBT['BT05'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT06group)) {
             objBT['BT06'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT07group)) {
             objBT['BT07'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT08group)) {
             objBT['BT08'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT09group)) {
             objBT['BT09'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT10group)) {
             objBT['BT10'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT11group)) {
             objBT['BT11'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT12group)) {
             objBT['BT12'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT13group)) {
             objBT['BT13'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT14group)) {
             objBT['BT14'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT15group)) {
             objBT['BT15'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT16group)) {
             objBT['BT16'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT17group)) {
             objBT['BT17'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT18group)) {
             objBT['BT18'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT19group)) {
             objBT['BT19'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT20group)) {
             objBT['BT20'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT21group)) {
             objBT['BT21'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT22group)) {
             objBT['BT22'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT23group)) {
             objBT['BT23'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT24group)) {
             objBT['BT24'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT25group)) {
             objBT['BT25'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BT26group)) {
             objBT['BT26'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR1group)) {
              objJR['JR1'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR2group)) {
              objJR['JR2'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR3group)) {
              objJR['JR3'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR4group)) {
              objJR['JR4'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR5group)) {
              objJR['JR5'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR6group)) {
              objJR['JR6'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR7group)) {
              objJR['JR7'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(JR8group)) {
              objJR['JR8'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BA1group)) {
              objBA['BA1'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BA2group)) {
              objBA['BA2'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BA3group)) {
              objBA['BA3'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BA4group)) {
              objBA['BA4'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(BA5group)) {
              objBA['BA5'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(PPPgroup)) {
              objPM['PPP'].forEach(marker => content.removeLayer(marker))
          }
          if (!myMap.hasLayer(PPSgroup)) {
              objPM['PPS'].forEach(marker => content.removeLayer(marker))
          }
  
        })
  
  
      // legend add / remove  (County, Block Group, Radius)
  // legend add / remove  (County, Block Group, Radius)
  myMap.on('overlayadd', function(eventLayer) {
    if (myMap.hasLayer(obj[17]) || myMap.hasLayer(obj[24]) || myMap.hasLayer(obj[51]) || myMap.hasLayer(obj[48])) {
      legend.addTo(this);
    } 
    if (myMap.hasLayer(objjobs[17]) || myMap.hasLayer(objjobs[24]) || myMap.hasLayer(objjobs[51]) || myMap.hasLayer(objjobs[48])) {
      jobslegend.addTo(this);
    } 
    if (myMap.hasLayer(objloans[17]) || myMap.hasLayer(objloans[24]) || myMap.hasLayer(objloans[51]) || myMap.hasLayer(objloans[48])) {
      loanslegend.addTo(this);
    } 
    if (myMap.hasLayer(objbg[17]) || myMap.hasLayer(objbg[24]) || myMap.hasLayer(objbg[51]) || myMap.hasLayer(objbg[48])) {
      blockgrouplegend.addTo(this);
    }
    if (myMap.hasLayer(objbgjobs[17]) || myMap.hasLayer(objbgjobs[24]) || myMap.hasLayer(objbgjobs[51]) || myMap.hasLayer(objbgjobs[48])) {
      jobsblockgrouplegend.addTo(this);
    }
    if (myMap.hasLayer(objbgloans[17]) || myMap.hasLayer(objbgloans[24]) || myMap.hasLayer(objbgloans[51]) || myMap.hasLayer(objbgloans[48])) {
      loansblockgrouplegend.addTo(this);
    }
    if (myMap.hasLayer(objblock[17]) || myMap.hasLayer(objblock[24]) || myMap.hasLayer(objblock[51]) || myMap.hasLayer(objblock[48])) {
      blocklegend.addTo(this);
    }
    if (myMap.hasLayer(objblockjobs[17]) || myMap.hasLayer(objblockjobs[24]) || myMap.hasLayer(objblockjobs[51]) || myMap.hasLayer(objblockjobs[48]))  {
      jobsblocklegend.addTo(this);
    }
    if (myMap.hasLayer(objblockloans[17]) || myMap.hasLayer(objblockloans[24]) || myMap.hasLayer(objblockloans[51]) || myMap.hasLayer(objblockloans[48])) {
      loansblocklegend.addTo(this);
    }
    if (eventLayer.name === 'Points') {
      radiuslegend.addTo(this);
    }
  })

  myMap.on('overlayremove', function(eventLayer) {
    if (!myMap.hasLayer(obj[17]) && !myMap.hasLayer(obj[24]) && !myMap.hasLayer(obj[51]) && !myMap.hasLayer(obj[48])) {     
      this.removeControl(legend);
    } 
    if (!myMap.hasLayer(objjobs[17]) && !myMap.hasLayer(objjobs[24]) && !myMap.hasLayer(objjobs[51]) && !myMap.hasLayer(objjobs[48])) {
      this.removeControl(jobslegend);
    } 
    if (!myMap.hasLayer(objloans[17]) && !myMap.hasLayer(objloans[24]) && !myMap.hasLayer(objloans[51]) && !myMap.hasLayer(objloans[48])) {
      this.removeControl(loanslegend);
    } 
    if (!myMap.hasLayer(objbg[17]) && !myMap.hasLayer(objbg[24]) && !myMap.hasLayer(objbg[24]) && !myMap.hasLayer(objbg[48])) {
      myMap.removeControl(blockgrouplegend);
    }
    if (!myMap.hasLayer(objbgjobs[17]) && !myMap.hasLayer(objbgjobs[24]) && !myMap.hasLayer(objbgjobs[51]) && !myMap.hasLayer(objbgjobs[48])) {
      this.removeControl(jobsblockgrouplegend);
    }
    if (!myMap.hasLayer(objbgloans[17]) && !myMap.hasLayer(objbgloans[24]) && !myMap.hasLayer(objbgloans[51]) && !myMap.hasLayer(objbgloans[48])) {
      this.removeControl(loansblockgrouplegend);
    }
    if (!myMap.hasLayer(objblock[17]) && !myMap.hasLayer(objblock[24]) && !myMap.hasLayer(objblock[51]) && !myMap.hasLayer(objblock[48])) {
      this.removeControl(blocklegend);
    }
    if (!myMap.hasLayer(objblockjobs[17]) && !myMap.hasLayer(objblockjobs[24]) && !myMap.hasLayer(objblockjobs[51]) && !myMap.hasLayer(objblockjobs[48])) {
      this.removeControl(jobsblocklegend);
    }
    if (!myMap.hasLayer(objblockloans[17]) && !myMap.hasLayer(objblockloans[24]) && !myMap.hasLayer(objblockloans[51]) && !myMap.hasLayer(objblockloans[48])) {
      this.removeControl(loansblocklegend);
    }
    if (eventLayer.name === 'Points') {
      this.removeControl(radiuslegend);
    }
  })

// SET VIEW TO POP-UP
  myMap.on('popupopen', function (e) {
    myMap.setView(e.target._popup._latlng, e.target._zoom);
  });


// ZOOM TO STATE
$('select[name="dropdown"]').change(function(){
  var latlng = $(this).val().split(',');
  var lat = latlng[0];
  var lng = latlng[1];
  var zoom = 8;
  // add a marker
  var marker = L.marker([lat, lng],{}).addTo(myMap);
  // set the view
  myMap.flyTo([lat, lng], zoom);
})

// SEARCH
var searchControl = L.esri.Geocoding.geosearch({
  position: 'topright',
  placeholder: 'Enter an address or place e.g. 1 York St',
  useMapBounds: false,
  providers: [L.esri.Geocoding.arcgisOnlineProvider({
    apikey: apiKey, // replace with your api key - https://developers.arcgis.com
    nearby: {
      lat: -33.8688,
      lng: 151.2093
    }
  })]
}).addTo(myMap);

var results = L.layerGroup().addTo(myMap);

searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

// POINTS WITHIN 
  const linkcontent= L.layerGroup().addTo(myMap)
    $("#checkbox1").change(function () { 
      if (this.checked){
      group.addTo(linkcontent)
      }
      else {
        group.remove(linkcontent)
        }
    })

    const linkcontentbg = L.layerGroup().addTo(myMap)
    $("#checkbox2").change(function () { 
      if (this.checked){
      groupblock.addTo(linkcontentbg)
      }
      else {
        groupblock.remove(linkcontentbg)
        }
    })

    // myMap.on('overlayadd overlayremove', function() {
    //   if (myMap.hasLayer(groupblock)) {
    //     this.addLayer(groupblock)
    //     this.removeLayer(group)
    //   } 
    //   if (myMap.hasLayer(group)) {
    //     this.addLayer(group)
    //     this.removeLayer(groupblock)
    //   } 
    //   else {
    //     console.log("no point layer active");
    //   }
    //   })
  //   $('input[type="checkbox"]').on('change', function() {
  //     $('input[type="checkbox"]').not(this).prop('checked', false);
  //  });

  // REFRESH POINTS WITHIN
    $("#mybutton4").click(function (event) { 
      group.clearLayers()
      groupblock.clearLayers()
    })


    // PANEL
var sidebar = L.control.sidebar({ container: 'sidebar'})
  .addTo(myMap)
  .open('info')
sidebar
  .addPanel({
    id:   'mail',
    tab:  '<i class="fa fa-envelope"></i>',
    title: 'Messages',
    button: function() { alert('opened via JS callback') },
    disabled: true,
})
sidebar
  .addPanel({
    id:   'points',
    tab:  '<i class="fa fa-map-pin"></i>',
    title: 'Points',
    disabled: true,
  })
sidebar
  .addPanel({
    id:   'choro',
    tab:  '<i class="fa fa-layer-group"></i>',
    title: 'Choropleth',
    disabled: true,
})
$("#pointen").click(function(){
  sidebar.enablePanel('points')
})
$("#choroen").click(function(){
  sidebar.enablePanel('choro')
})

$("#mailen").click(function(){
  sidebar.enablePanel('mail')
})
$("#maildis").click(function(){
  sidebar.disablePanel('mail')
})
var userid = 0
$("#user").click(function addUser() {
  sidebar
    .addPanel({
      id: 'user' + userid++,
      tab: '<i class="fa fa-user"></i>',
      title: 'User Profile ' + userid,
      pane: '<p>user ipsum dolor sit amet</p>',
  });
})
      
var layerControl = L.control.layers.tree (baseMaps, overlaysTree, {
  collapsed: false
})
layerControl.addTo(myMap);

//INDobj
var htmlObject = layerControl.getContainer().querySelectorAll('input');
$(htmlObject).on("change", function(e) {
  if ($(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox')) {
    if ($(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox:checked')) {
      var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
      NodeList.prototype.forEach = Array.prototype.forEach
      ancestors.forEach(item =>
        console.log(item.children[0].children[1].innerText));
        //push parameters to websocket
    } else {
      console.log($(this).siblings('span').text())
      var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
      NodeList.prototype.forEach = Array.prototype.forEach
      ancestors.forEach(item =>
        console.log(item.children[0].children[1].innerText,"is unchecked"));
    } //remove parameters from websocket
  }
  if ($(this).is('.leaflet-control-layers-selector')) {
    if ($(this).is('.leaflet-control-layers-selector:checked')) {
      console.log($(this).siblings('span').text());
      //push parameter to websocket
    } else {
      console.log($(this).siblings('span').text(),"single selector unchecked")
    } //remove parameter from websocket
  }
})
  
  // County Legends
  var legend = L.control({ position: "bottomleft" 
  });
  // Approval Amount
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
      // Add min & max
      var legendInfo = "<h4>Current Loan Approval Amount (County)</h4>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">$" + limits[0] + "</div>" +
          "<div class=\"max\">$" + limits[limits.length - 1] + "</div>" +
        "</div>";
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };
    // Adding legend to the map
    //legend.addTo(myMap);
  
  
  var jobslegend = L.control({ position: "bottomleft" 
  });
  // Jobs
   jobslegend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = jobsgeojson.options.limits;
    var colors = jobsgeojson.options.colors;
    var labels = [];
    var jobslegendInfo = "<h4>Jobs Reported (County)</h4>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";
    div.innerHTML = jobslegendInfo;
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
  // jobslegend.addTo(myMap);
  
  var loanslegend = L.control({ position: "bottomleft" 
  });
  // Loans
   loanslegend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = loangeojson.options.limits;
    var colors = loangeojson.options.colors;
    var labels = [];
    var loanslegendInfo = "<h4># of Loans (County)</h4>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";
    div.innerHTML = loanslegendInfo;
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
  // loanslegend.addTo(myMap);
  
  
// Block Group Legends
var blockgrouplegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 blockgrouplegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojsonblockgroup.options.limits;
  var colors = geojsonblockgroup.options.colors;
  var labels = [];
  var blockgrouplegendInfo = "<h4>Current Loan Approval Amount (Block Group)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">$" + limits[0] + "</div>" +
      "<div class=\"max\">$" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = blockgrouplegendInfo;
  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};
// blocklegend.addTo(myMap);

var jobsblockgrouplegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 jobsblockgrouplegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = jobsgeojsonblockgroup.options.limits;
  var colors = jobsgeojsonblockgroup.options.colors;
  var labels = [];
  var jobsblockgrouplegendInfo = "<h4>Jobs Reported (Block Group)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = jobsblockgrouplegendInfo;
  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

var loansblockgrouplegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 loansblockgrouplegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = loansgeojsonblockgroup.options.limits;
  var colors = loansgeojsonblockgroup.options.colors;
  var labels = [];
  var loansblockgrouplegendInfo = "<h4># of Loans (Block Group)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = loansblockgrouplegendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};


// Block Legends
var blocklegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 blocklegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojsonblock.options.limits;
  var colors = geojsonblock.options.colors;
  var labels = [];
  var blocklegendInfo = "<h4>Current Loan Approval Amount (Block)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">$" + limits[0] + "</div>" +
      "<div class=\"max\">$" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = blocklegendInfo;
  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};
// blocklegend.addTo(myMap);

var jobsblocklegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 jobsblocklegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = jobsgeojsonblock.options.limits;
  var colors = jobsgeojsonblock.options.colors;
  var labels = [];
  var jobsblocklegendInfo = "<h4>Jobs Reported (Block)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = jobsblocklegendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

var loansblocklegend = L.control({ position: "bottomleft" 
});
// Set up the legend
 loansblocklegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = loansgeojsonblock.options.limits;
  var colors = loansgeojsonblock.options.colors;
  var labels = [];
  var loansblocklegendInfo = "<h4># of Loans (Block)</h4>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = loansblocklegendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

  
  // Radius Legend
   var radiuslegend = L.control({position: 'bottomright'
  });
   radiuslegend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend'),
        amounts = [150000,350000,1000000, 2000000, 5000000],
        labels = ['150000','350000','1000000', '2000000', '5000000'];
    for (var i = 0; i < amounts.length; i++) {
        div.innerHTML +=
      '<i class ="circle" style="border-radius: 50%; width:' + getRadius(amounts[i] + 1) +'px; height:' + getRadius(amounts[i] + 1) +'px; background:' + getRadiusColor(amounts[i] + 1) +';"></i> $' +
        amounts[i] + (amounts[i + 1] ? ' &ndash; $' + amounts[i + 1] + '<br>' : '+');
          } 
          return div;
   };
   //radiuslegend.addTo(myMap);
  }

  // Load in geojson state data
  // var stategeojson;
  // let statepleth = new L.layerGroup()
  // Grab data with d3
  // d3.json('/statedata', function(data) {
  //   // Create a new choropleth layer
  //   stategeojson = L.choropleth(data, {
  //     // Define what  property in the features to use
  //     valueProperty: "CurrentApprovalAmount", 
  //     // Set color scale
  //     scale: ["#ffffb2", "#b10026"],
  //     // Number of breaks in step range
  //     steps: 10,
  //     // q for quartile, e for equidistant, k for k-means
  //     mode: "q",
  //     style: {
  //       // Border color
  //       color: "#fff",
  //       weight: 1,
  //       fillOpacity: 0.8
  //     },
  //     // Binding a pop-up to each layer
  //     onEachFeature(feature, layer) {
  //       layer.bindPopup("StateID: " + feature.properties.FIPSstate + "<br>State: " + feature.properties.NAME + "<br># of Loans: " + feature.properties.LoanNumber + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported: " + feature.properties.JobsReported + "<br># of Lenders: " + feature.properties.ServicingLenderLocationID+ "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit
  //       + "<br>Forgiveness Amount: " + feature.properties.ForgivenessAmount);
  //     }
  //   }).addTo(statepleth);
  // });
  
  //Layer Highlight Function
  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  // COUNTY CHORO
  var group = L.featureGroup();
  let obj = { 51 : new L.layerGroup(), 
              48 : new L.layerGroup(), 
              17 : new L.layerGroup(),
              24 : new L.layerGroup() }
  let objjobs = { 
              51 : new L.layerGroup(), 
              48 : new L.layerGroup(), 
              17 : new L.layerGroup(),
              24 : new L.layerGroup() }
  let objloans = { 
              51 : new L.layerGroup(), 
              48 : new L.layerGroup(), 
              17 : new L.layerGroup(),
              24 : new L.layerGroup() }

              
  var geojson;
  var jobsgeojson;
  var loansgeojson;

  $("#mybutton").click(function (event) { 
    if ($("input[name='county']:checked")){
      ptsData = $("input[name='county']:checked").val()
      var countyData = $("input[name='county']:checked").attr('file')
      var idVal = $("input[name='county']:checked").attr('id')
      var d1 = $(`#label[for='${idVal}']`)
    }
      var myPts = L.geoJson.ajax(ptsData, {
      pointToLayer: function (feature){
        return new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
    }
  }) 
    myPts.on("data:loaded", function (){
    d1.append('<span id="loaded" style="background-color:black; color:white"> loaded</span>'); }) 
    //if checkbox is checked , endpoint (set to loadData var) 
    d3.json(countyData, (data) => {
      function onEachFeature(feature, layer){
          layer.bindPopup("CountyID: " + feature.properties.FIPScounty + "<br>County: " + feature.properties.NAME + "<br># of Loans: " + feature.properties.LoanNumber + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported: " + feature.properties.JobsReported + "<br># of Lenders: " + feature.properties.ServicingLenderLocationID + "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit
            + "<br>Forgiveness Amount: " + feature.properties.ForgivenessAmount + "<br><b>Non-Profit: </b><br> Non-Profit Loans: " + feature.properties.NonProfitLoans + "<br>Non-Profit Approval Amount: " + feature.properties.NonProfitApprovalAmount + "<br>Non-Profit Jobs Reported: " + feature.properties.NonProfitJobsReported + "<br>Non-Profit Lender Profit: " + feature.properties.NonProfitLenderProfit);
          layer.on("click", function (e) {
            pointsInBuffer = L.geoJSON(null, {
              onEachFeature: function (feature, layer) {
                layer.bindPopup("Loan Recipient: " + feature.properties.BorrowerName + "<br>Borrower Address: " + feature.properties.full_add + "<br>Business Type: " + feature.properties.BusinessType + "<br><b>Loan Type</b>: " + feature.properties.ProcessingMethod + "<br>Date Approved: " + feature.properties.DateApproved + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported #: " + feature.properties.JobsReported + "<br>Loan Forgiveness Amount: " + feature.properties.ForgivenessAmount + "<br>Loan Status: " + feature.properties.LoanStatus + "<br>Loan Status Date: " + feature.properties.LoanStatusDate + "<br>Servicing Lender: " + feature.properties.ServicingLenderName + "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit + "<br>Industry: " + feature.properties.Industry);
              } //removing null--> L.geoJSON() returns unstyled markers
            }).addTo(group);
            var ptswithin = turf.pointsWithinPolygon(myPts.toGeoJSON(), layer.toGeoJSON());
            pointsInBuffer.addData(ptswithin);
          });
        }
        geojson = L.choropleth(data, {
          valueProperty: "CurrentApprovalAmount",
          scale: ["#ffffb2", "#b10026"],
          steps: 10,
          mode: "q",
          style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
          },
          onEachFeature: onEachFeature,
        }).addTo(obj[idVal]);
        jobsgeojson = L.choropleth(data, {
          valueProperty: "JobsReported",
          scale: ["#ecf9f2", "#194d19"],
          steps: 10,
          mode: "q",
          style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
          },
          onEachFeature: onEachFeature,
        }).addTo(objjobs[idVal]);
        loangeojson = L.choropleth(data, {
          valueProperty: "LoanNumber",
          scale: ["#f2e6ff", "#330066"],
          steps: 10,
          mode: "q",
          style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
          },
          onEachFeature: onEachFeature,
        }).addTo(objloans[idVal]);
      });
    });
  
  
  // BLOCK GROUP CHORO
  var groupblock = L.featureGroup();
  var groupblockjobs = L.featureGroup();
  var groupblockloans = L.featureGroup();
  let objbg = { 
    51 : new L.layerGroup(), 
    48 : new L.layerGroup(), 
    17 : new L.layerGroup(),
    24 : new L.layerGroup() }
  let objbgjobs = { 
    51 : new L.layerGroup(), 
    48 : new L.layerGroup(), 
    17 : new L.layerGroup(),
    24 : new L.layerGroup() }
  let objbgloans = { 
    51 : new L.layerGroup(), 
    48 : new L.layerGroup(), 
    17 : new L.layerGroup(),
    24 : new L.layerGroup() }
  var geojsonblockgroup;
  var jobsgeojsonblockgroup;
  var loansgeojsonblockgroup;

  $("#mybutton1").click(function (event) {
    if ($("input[name='blockgroup']:checked")){
      ptsData = $("input[name='blockgroup']:checked").val()
      var blockGroupData = $("input[name='blockgroup']:checked").attr('file')
      var idVal = $("input[name='blockgroup']:checked").attr('id')
      var d1 = $(`#label[for='${idVal}']`)
      var idValbg = idVal.slice(0,2)
    } //closes if
    var myPts = L.geoJson.ajax(ptsData, {
      pointToLayer: function (feature){
        return new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
    }
  }) //closes myPts
    myPts.on("data:loaded", function (){
    d1.append('<span id="loaded" style="background-color:black; color:white"> loaded</span>'); })
    d3.json(blockGroupData, function(data) {
    function onEachFeature(feature, layer){
      layer.bindPopup("CountyID: " + feature.properties.FIPScounty + "<br>County: " + feature.properties.NAME + "<br>BlockID: " + feature.properties.FIPSblockgroup + "<br>Block: " + feature.properties.NAMELSAD + "<br># of Loans: " + feature.properties.LoanNumber + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported: " + feature.properties.JobsReported + "<br># of Lenders: " + feature.properties.ServicingLenderLocationID+ "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit
        + "<br>Forgiveness Amount: " + feature.properties.ForgivenessAmount);
        layer.on("click", function (e){
          pointsInBuffer = L.geoJSON(null, {
            onEachFeature: function (feature, layer) { 
              layer.bindPopup("Loan Recipient: " + feature.properties.BorrowerName + "<br>Borrower Address: " + feature.properties.full_add + "<br>Business Type: " + feature.properties.BusinessType + "<br><b>Loan Type</b>: " + feature.properties.ProcessingMethod + "<br>Date Approved: " + feature.properties.DateApproved + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported #: " + feature.properties.JobsReported + "<br>Loan Forgiveness Amount: " + feature.properties.ForgivenessAmount + "<br>Loan Status: " + feature.properties.LoanStatus + "<br>Loan Status Date: " + feature.properties.LoanStatusDate + "<br>Servicing Lender: " + feature.properties.ServicingLenderName + "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit + "<br>Industry: "+ feature.properties.Industry)
            }
          }).addTo(groupblock);
          var ptswithin = turf.pointsWithinPolygon(myPts.toGeoJSON(), layer.toGeoJSON())
          pointsInBuffer.addData(ptswithin);
        }) //closes layer.on
    } //closes onEachFeature
    geojsonblockgroup = L.choropleth(data, {
      valueProperty:  "CurrentApprovalAmount",
      scale: ["#f7fbff", "#08306b"],
      steps: 10,
      mode: "q",
      style: {
        color: "#fff",
        weight: .8,
        fillOpacity: 0.8
      },
      onEachFeature: onEachFeature,
      }).addTo(objbg[idValbg])
    jobsgeojsonblockgroup = L.choropleth(data, {
      valueProperty: "JobsReported",
      scale: ["#ecf9f2", "#194d19"],
      steps: 10,
      mode: "q",
      style: {
        color: "#fff",
        weight: .8,
        fillOpacity: 0.8
      },
      onEachFeature: onEachFeature,
    }).addTo(objbgjobs[idValbg])
    loansgeojsonblockgroup = L.choropleth(data, {
      valueProperty: "LoanNumber",
      scale: ["#f2e6ff", "#330066"],
      steps: 10,
      mode: "q",
      style: {
        color: "#fff",
        weight: .8,
        fillOpacity: 0.8
      },
      onEachFeature: onEachFeature,
    }).addTo(objbgloans[idValbg])
  }); // closes d3.json
}); //closes myButton function


// BLOCK CHORO 
let objblock = { 
  51 : new L.layerGroup(),
  48 : new L.layerGroup(),  
  17 : new L.layerGroup(),
  24 : new L.layerGroup() }
let objblockjobs = { 
  51 : new L.layerGroup(), 
  48 : new L.layerGroup(), 
  17 : new L.layerGroup(),
  24 : new L.layerGroup() }
let objblockloans = { 
  51 : new L.layerGroup(), 
  48 : new L.layerGroup(), 
  17 : new L.layerGroup(),
  24 : new L.layerGroup() }
var geojsonblock;
var jobsgeojsonblock;
var loansgeojsonblock;

$("#mybutton2").click(function (event) { 
  if ($("input[name='block']:checked")){
    ptsData = $("input[name='block']:checked").val()
    var blockData = $("input[name='block']:checked").attr('file')
    var idVal = $("input[name='block']:checked").attr('id')
    var d1 = $(`#label[for='${idVal}']`)
    var idValb = idVal.slice(0,2)
  }
  var myPts = L.geoJson.ajax(ptsData, {
    pointToLayer: function (feature){
      return new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
  }
})
  myPts.on("data:loaded", function (){
  d1.append('<span id="loaded" style="background-color:black; color:white"> loaded</span>'); })
  d3.json(blockData, function(data) {
    function onEachFeature(feature, layer){
      layer.bindPopup("CountyID: " + feature.properties.FIPScounty + "<br>County: " + feature.properties.NAME + "<br>BlockGroupID: " + feature.properties.FIPSblockgroup + "<br>BlockGroup " + feature.properties.NAMELSAD + "<br>BlockID: " + feature.properties.FIPSblock + "<br>Block: " + feature.properties.NAME20+ "<br># of Loans: " + feature.properties.LoanNumber + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported: " + feature.properties.JobsReported + "<br># of Lenders: " + feature.properties.ServicingLenderLocationID+ "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit
      + "<br>Forgiveness Amount: " + feature.properties.ForgivenessAmount);
      layer.on("click", function (e){
        pointsInBuffer = L.geoJSON(null, {
          onEachFeature: function (feature, layer) { 
            layer.bindPopup("Loan Recipient: " + feature.properties.BorrowerName + "<br>Borrower Address: " + feature.properties.full_add + "<br>Business Type: " + feature.properties.BusinessType + "<br><b>Loan Type</b>: " + feature.properties.ProcessingMethod + "<br>Date Approved: " + feature.properties.DateApproved + "<br>Current Approval Amount $: " + feature.properties.CurrentApprovalAmount + "<br>Jobs Reported #: " + feature.properties.JobsReported + "<br>Loan Forgiveness Amount: " + feature.properties.ForgivenessAmount + "<br>Loan Status: " + feature.properties.LoanStatus + "<br>Loan Status Date: " + feature.properties.LoanStatusDate + "<br>Servicing Lender: " + feature.properties.ServicingLenderName + "<br>Estimated Lender Profit: " + feature.properties.Estimated_LenderProfit + "<br>Industry: "+ feature.properties.Industry)
          }
        }).addTo(groupblock);
        var ptswithin = turf.pointsWithinPolygon(myPts.toGeoJSON(), layer.toGeoJSON())
        pointsInBuffer.addData(ptswithin);
      }) 
    }
  geojsonblock = L.choropleth(data, {
    valueProperty: "CurrentApprovalAmount",
    scale: ["#f7fbff", "#08306b"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: .6,
      fillOpacity: 0.8
    },
    onEachFeature: onEachFeature,
  }).addTo(objblock[idValb])
  jobsgeojsonblock = L.choropleth(data, {
    valueProperty: "JobsReported",
    scale: ["#ecf9f2", "#194d19"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: .6,
      fillOpacity: 0.8
    },
    onEachFeature: onEachFeature,
  }).addTo(objblockjobs[idValb]);
  loansgeojsonblock = L.choropleth(data, {
    valueProperty: "LoanNumber",
    scale: ["#f2e6ff", "#330066"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: .6,
      fillOpacity: 0.8
    },
    onEachFeature: onEachFeature,
  }).addTo(objblockloans[idValb]);
});
});


  var industry;
  let ind00ss00group = new L.layerGroup();
	let ind11ss11group = new L.layerGroup();
	let ind11ss12group = new L.layerGroup();
	let ind11ss13group = new L.layerGroup();
	let ind11ss14group = new L.layerGroup();
	let ind11ss19group = new L.layerGroup();
	let ind11ss21group = new L.layerGroup();
	let ind11ss22group = new L.layerGroup();
	let ind11ss23group = new L.layerGroup();
	let ind11ss24group = new L.layerGroup();
	let ind11ss25group = new L.layerGroup();
	let ind11ss29group = new L.layerGroup();
	let ind11ss31group = new L.layerGroup();
	let ind11ss32group = new L.layerGroup();
	let ind11ss33group = new L.layerGroup();
	let ind11ss41group = new L.layerGroup();
	let ind11ss42group = new L.layerGroup();
	let ind11ss51group = new L.layerGroup();
	let ind11ss52group = new L.layerGroup();
	let ind11ss53group = new L.layerGroup();
	let ind21ss11group = new L.layerGroup();
	let ind21ss21group = new L.layerGroup();
	let ind21ss22group = new L.layerGroup();
	let ind21ss23group = new L.layerGroup();
	let ind21ss31group = new L.layerGroup();
	let ind22ss11group = new L.layerGroup();
	let ind22ss12group = new L.layerGroup();
	let ind22ss13group = new L.layerGroup();
	let ind23ss61group = new L.layerGroup();
	let ind23ss62group = new L.layerGroup();
	let ind23ss71group = new L.layerGroup();
	let ind23ss72group = new L.layerGroup();
	let ind23ss73group = new L.layerGroup();
	let ind23ss79group = new L.layerGroup();
	let ind23ss81group = new L.layerGroup();
	let ind23ss82group = new L.layerGroup();
	let ind23ss83group = new L.layerGroup();
	let ind23ss89group = new L.layerGroup();
	let ind31ss11group = new L.layerGroup();
	let ind31ss12group = new L.layerGroup();
	let ind31ss13group = new L.layerGroup();
	let ind31ss14group = new L.layerGroup();
	let ind31ss15group = new L.layerGroup();
	let ind31ss16group = new L.layerGroup();
	let ind31ss17group = new L.layerGroup();
	let ind31ss18group = new L.layerGroup();
	let ind31ss19group = new L.layerGroup();
	let ind31ss21group = new L.layerGroup();
	let ind31ss22group = new L.layerGroup();
	let ind31ss31group = new L.layerGroup();
	let ind31ss32group = new L.layerGroup();
	let ind31ss33group = new L.layerGroup();
	let ind31ss41group = new L.layerGroup();
	let ind31ss49group = new L.layerGroup();
	let ind31ss51group = new L.layerGroup();
	let ind31ss52group = new L.layerGroup();
	let ind31ss59group = new L.layerGroup();
	let ind31ss61group = new L.layerGroup();
	let ind31ss62group = new L.layerGroup();
	let ind31ss69group = new L.layerGroup();
	let ind32ss11group = new L.layerGroup();
	let ind32ss12group = new L.layerGroup();
	let ind32ss19group = new L.layerGroup();
	let ind32ss21group = new L.layerGroup();
	let ind32ss22group = new L.layerGroup();
	let ind32ss31group = new L.layerGroup();
	let ind32ss41group = new L.layerGroup();
	let ind32ss51group = new L.layerGroup();
	let ind32ss52group = new L.layerGroup();
	let ind32ss53group = new L.layerGroup();
	let ind32ss54group = new L.layerGroup();
	let ind32ss55group = new L.layerGroup();
	let ind32ss56group = new L.layerGroup();
	let ind32ss59group = new L.layerGroup();
	let ind32ss61group = new L.layerGroup();
	let ind32ss62group = new L.layerGroup();
	let ind32ss71group = new L.layerGroup();
	let ind32ss72group = new L.layerGroup();
	let ind32ss73group = new L.layerGroup();
	let ind32ss74group = new L.layerGroup();
	let ind32ss79group = new L.layerGroup();
	let ind33ss11group = new L.layerGroup();
	let ind33ss12group = new L.layerGroup();
	let ind33ss13group = new L.layerGroup();
	let ind33ss14group = new L.layerGroup();
	let ind33ss15group = new L.layerGroup();
	let ind33ss21group = new L.layerGroup();
	let ind33ss22group = new L.layerGroup();
	let ind33ss23group = new L.layerGroup();
	let ind33ss24group = new L.layerGroup();
	let ind33ss25group = new L.layerGroup();
	let ind33ss26group = new L.layerGroup();
	let ind33ss27group = new L.layerGroup();
	let ind33ss28group = new L.layerGroup();
	let ind33ss29group = new L.layerGroup();
	let ind33ss31group = new L.layerGroup();
	let ind33ss32group = new L.layerGroup();
	let ind33ss33group = new L.layerGroup();
	let ind33ss34group = new L.layerGroup();
	let ind33ss35group = new L.layerGroup();
	let ind33ss36group = new L.layerGroup();
	let ind33ss39group = new L.layerGroup();
	let ind33ss41group = new L.layerGroup();
	let ind33ss42group = new L.layerGroup();
	let ind33ss43group = new L.layerGroup();
	let ind33ss44group = new L.layerGroup();
	let ind33ss45group = new L.layerGroup();
	let ind33ss46group = new L.layerGroup();
	let ind33ss51group = new L.layerGroup();
	let ind33ss52group = new L.layerGroup();
	let ind33ss53group = new L.layerGroup();
	let ind33ss59group = new L.layerGroup();
	let ind33ss61group = new L.layerGroup();
	let ind33ss62group = new L.layerGroup();
	let ind33ss63group = new L.layerGroup();
	let ind33ss64group = new L.layerGroup();
	let ind33ss65group = new L.layerGroup();
	let ind33ss66group = new L.layerGroup();
	let ind33ss69group = new L.layerGroup();
	let ind33ss71group = new L.layerGroup();
	let ind33ss72group = new L.layerGroup();
	let ind33ss79group = new L.layerGroup();
	let ind33ss91group = new L.layerGroup();
	let ind33ss99group = new L.layerGroup();
	let ind42ss31group = new L.layerGroup();
	let ind42ss32group = new L.layerGroup();
	let ind42ss33group = new L.layerGroup();
	let ind42ss34group = new L.layerGroup();
	let ind42ss35group = new L.layerGroup();
	let ind42ss36group = new L.layerGroup();
	let ind42ss37group = new L.layerGroup();
	let ind42ss38group = new L.layerGroup();
	let ind42ss39group = new L.layerGroup();
	let ind42ss41group = new L.layerGroup();
	let ind42ss42group = new L.layerGroup();
	let ind42ss43group = new L.layerGroup();
	let ind42ss44group = new L.layerGroup();
	let ind42ss45group = new L.layerGroup();
	let ind42ss46group = new L.layerGroup();
	let ind42ss47group = new L.layerGroup();
	let ind42ss48group = new L.layerGroup();
	let ind42ss49group = new L.layerGroup();
	let ind42ss51group = new L.layerGroup();
	let ind44ss11group = new L.layerGroup();
	let ind44ss12group = new L.layerGroup();
	let ind44ss13group = new L.layerGroup();
	let ind44ss21group = new L.layerGroup();
	let ind44ss22group = new L.layerGroup();
	let ind44ss31group = new L.layerGroup();
	let ind44ss41group = new L.layerGroup();
	let ind44ss42group = new L.layerGroup();
	let ind44ss51group = new L.layerGroup();
	let ind44ss52group = new L.layerGroup();
	let ind44ss53group = new L.layerGroup();
	let ind44ss61group = new L.layerGroup();
	let ind44ss71group = new L.layerGroup();
	let ind44ss81group = new L.layerGroup();
	let ind44ss82group = new L.layerGroup();
	let ind44ss83group = new L.layerGroup();
	let ind45ss11group = new L.layerGroup();
	let ind45ss12group = new L.layerGroup();
	let ind45ss22group = new L.layerGroup();
	let ind45ss23group = new L.layerGroup();
	let ind45ss31group = new L.layerGroup();
	let ind45ss32group = new L.layerGroup();
	let ind45ss33group = new L.layerGroup();
	let ind45ss39group = new L.layerGroup();
	let ind45ss41group = new L.layerGroup();
	let ind45ss42group = new L.layerGroup();
	let ind45ss43group = new L.layerGroup();
	let ind48ss11group = new L.layerGroup();
	let ind48ss12group = new L.layerGroup();
	let ind48ss21group = new L.layerGroup();
	let ind48ss31group = new L.layerGroup();
	let ind48ss32group = new L.layerGroup();
	let ind48ss41group = new L.layerGroup();
	let ind48ss42group = new L.layerGroup();
	let ind48ss51group = new L.layerGroup();
	let ind48ss52group = new L.layerGroup();
	let ind48ss53group = new L.layerGroup();
	let ind48ss54group = new L.layerGroup();
	let ind48ss55group = new L.layerGroup();
	let ind48ss59group = new L.layerGroup();
	let ind48ss61group = new L.layerGroup();
	let ind48ss62group = new L.layerGroup();
	let ind48ss69group = new L.layerGroup();
	let ind48ss71group = new L.layerGroup();
	let ind48ss72group = new L.layerGroup();
	let ind48ss79group = new L.layerGroup();
	let ind48ss81group = new L.layerGroup();
	let ind48ss82group = new L.layerGroup();
	let ind48ss83group = new L.layerGroup();
	let ind48ss84group = new L.layerGroup();
	let ind48ss85group = new L.layerGroup();
	let ind48ss89group = new L.layerGroup();
	let ind49ss11group = new L.layerGroup();
	let ind49ss21group = new L.layerGroup();
	let ind49ss22group = new L.layerGroup();
	let ind49ss31group = new L.layerGroup();
	let ind51ss11group = new L.layerGroup();
	let ind51ss12group = new L.layerGroup();
	let ind51ss21group = new L.layerGroup();
	let ind51ss22group = new L.layerGroup();
	let ind51ss51group = new L.layerGroup();
	let ind51ss52group = new L.layerGroup();
	let ind51ss73group = new L.layerGroup();
	let ind51ss74group = new L.layerGroup();
	let ind51ss79group = new L.layerGroup();
	let ind51ss82group = new L.layerGroup();
	let ind51ss91group = new L.layerGroup();
	let ind52ss11group = new L.layerGroup();
	let ind52ss21group = new L.layerGroup();
	let ind52ss22group = new L.layerGroup();
	let ind52ss23group = new L.layerGroup();
	let ind52ss31group = new L.layerGroup();
	let ind52ss32group = new L.layerGroup();
	let ind52ss39group = new L.layerGroup();
	let ind52ss41group = new L.layerGroup();
	let ind52ss42group = new L.layerGroup();
	let ind52ss51group = new L.layerGroup();
	let ind52ss59group = new L.layerGroup();
	let ind53ss11group = new L.layerGroup();
	let ind53ss12group = new L.layerGroup();
	let ind53ss13group = new L.layerGroup();
	let ind53ss21group = new L.layerGroup();
	let ind53ss22group = new L.layerGroup();
	let ind53ss23group = new L.layerGroup();
	let ind53ss24group = new L.layerGroup();
	let ind53ss31group = new L.layerGroup();
	let ind54ss11group = new L.layerGroup();
	let ind54ss12group = new L.layerGroup();
	let ind54ss13group = new L.layerGroup();
	let ind54ss14group = new L.layerGroup();
	let ind54ss15group = new L.layerGroup();
	let ind54ss16group = new L.layerGroup();
	let ind54ss17group = new L.layerGroup();
	let ind54ss18group = new L.layerGroup();
	let ind54ss19group = new L.layerGroup();
	let ind55ss11group = new L.layerGroup();
	let ind56ss11group = new L.layerGroup();
	let ind56ss12group = new L.layerGroup();
	let ind56ss13group = new L.layerGroup();
	let ind56ss14group = new L.layerGroup();
	let ind56ss15group = new L.layerGroup();
	let ind56ss16group = new L.layerGroup();
	let ind56ss17group = new L.layerGroup();
	let ind56ss19group = new L.layerGroup();
	let ind56ss21group = new L.layerGroup();
	let ind56ss22group = new L.layerGroup();
	let ind56ss29group = new L.layerGroup();
	let ind61ss11group = new L.layerGroup();
	let ind61ss12group = new L.layerGroup();
	let ind61ss13group = new L.layerGroup();
	let ind61ss14group = new L.layerGroup();
	let ind61ss15group = new L.layerGroup();
	let ind61ss16group = new L.layerGroup();
	let ind61ss17group = new L.layerGroup();
	let ind62ss11group = new L.layerGroup();
	let ind62ss12group = new L.layerGroup();
	let ind62ss13group = new L.layerGroup();
	let ind62ss14group = new L.layerGroup();
	let ind62ss15group = new L.layerGroup();
	let ind62ss16group = new L.layerGroup();
	let ind62ss19group = new L.layerGroup();
	let ind62ss21group = new L.layerGroup();
	let ind62ss22group = new L.layerGroup();
	let ind62ss23group = new L.layerGroup();
	let ind62ss31group = new L.layerGroup();
	let ind62ss32group = new L.layerGroup();
	let ind62ss33group = new L.layerGroup();
	let ind62ss39group = new L.layerGroup();
	let ind62ss41group = new L.layerGroup();
	let ind62ss42group = new L.layerGroup();
	let ind62ss43group = new L.layerGroup();
	let ind62ss44group = new L.layerGroup();
	let ind71ss11group = new L.layerGroup();
	let ind71ss12group = new L.layerGroup();
	let ind71ss13group = new L.layerGroup();
	let ind71ss14group = new L.layerGroup();
	let ind71ss15group = new L.layerGroup();
	let ind71ss21group = new L.layerGroup();
	let ind71ss31group = new L.layerGroup();
	let ind71ss32group = new L.layerGroup();
	let ind71ss39group = new L.layerGroup();
	let ind72ss11group = new L.layerGroup();
	let ind72ss12group = new L.layerGroup();
	let ind72ss13group = new L.layerGroup();
	let ind72ss23group = new L.layerGroup();
	let ind72ss24group = new L.layerGroup();
	let ind72ss25group = new L.layerGroup();
	let ind81ss11group = new L.layerGroup();
	let ind81ss12group = new L.layerGroup();
	let ind81ss13group = new L.layerGroup();
	let ind81ss14group = new L.layerGroup();
	let ind81ss21group = new L.layerGroup();
	let ind81ss22group = new L.layerGroup();
	let ind81ss23group = new L.layerGroup();
	let ind81ss29group = new L.layerGroup();
	let ind81ss31group = new L.layerGroup();
	let ind81ss32group = new L.layerGroup();
	let ind81ss33group = new L.layerGroup();
	let ind81ss34group = new L.layerGroup();
	let ind81ss39group = new L.layerGroup();
	let ind81ss41group = new L.layerGroup();
	let ind92ss11group = new L.layerGroup();
	let ind92ss21group = new L.layerGroup();
	let ind92ss31group = new L.layerGroup();
	let ind92ss41group = new L.layerGroup();
	let ind92ss51group = new L.layerGroup();
	let ind92ss61group = new L.layerGroup();
	let ind92ss71group = new L.layerGroup();
	let ind92ss81group = new L.layerGroup();
  let ind99ss00group = new L.layerGroup();

let objSS = {
'IND00SS00': [],
'IND11SS11': [],
'IND11SS12': [],
'IND11SS13': [],
'IND11SS14': [],
'IND11SS19': [],
'IND11SS21': [],
'IND11SS22': [],
'IND11SS23': [],
'IND11SS24': [],
'IND11SS25': [],
'IND11SS29': [],
'IND11SS31': [],
'IND11SS32': [],
'IND11SS33': [],
'IND11SS41': [],
'IND11SS42': [],
'IND11SS51': [],
'IND11SS52': [],
'IND11SS53': [],
'IND21SS11': [],
'IND21SS21': [],
'IND21SS22': [],
'IND21SS23': [],
'IND21SS31': [],
'IND22SS11': [],
'IND22SS12': [],
'IND22SS13': [],
'IND23SS61': [],
'IND23SS62': [],
'IND23SS71': [],
'IND23SS72': [],
'IND23SS73': [],
'IND23SS79': [],
'IND23SS81': [],
'IND23SS82': [],
'IND23SS83': [],
'IND23SS89': [],
'IND31SS11': [],
'IND31SS12': [],
'IND31SS13': [],
'IND31SS14': [],
'IND31SS15': [],
'IND31SS16': [],
'IND31SS17': [],
'IND31SS18': [],
'IND31SS19': [],
'IND31SS21': [],
'IND31SS22': [],
'IND31SS31': [],
'IND31SS32': [],
'IND31SS33': [],
'IND31SS41': [],
'IND31SS49': [],
'IND31SS51': [],
'IND31SS52': [],
'IND31SS59': [],
'IND31SS61': [],
'IND31SS62': [],
'IND31SS69': [],
'IND32SS11': [],
'IND32SS12': [],
'IND32SS19': [],
'IND32SS21': [],
'IND32SS22': [],
'IND32SS31': [],
'IND32SS41': [],
'IND32SS51': [],
'IND32SS52': [],
'IND32SS53': [],
'IND32SS54': [],
'IND32SS55': [],
'IND32SS56': [],
'IND32SS59': [],
'IND32SS61': [],
'IND32SS62': [],
'IND32SS71': [],
'IND32SS72': [],
'IND32SS73': [],
'IND32SS74': [],
'IND32SS79': [],
'IND33SS11': [],
'IND33SS12': [],
'IND33SS13': [],
'IND33SS14': [],
'IND33SS15': [],
'IND33SS21': [],
'IND33SS22': [],
'IND33SS23': [],
'IND33SS24': [],
'IND33SS25': [],
'IND33SS26': [],
'IND33SS27': [],
'IND33SS28': [],
'IND33SS29': [],
'IND33SS31': [],
'IND33SS32': [],
'IND33SS33': [],
'IND33SS34': [],
'IND33SS35': [],
'IND33SS36': [],
'IND33SS39': [],
'IND33SS41': [],
'IND33SS42': [],
'IND33SS43': [],
'IND33SS44': [],
'IND33SS45': [],
'IND33SS46': [],
'IND33SS51': [],
'IND33SS52': [],
'IND33SS53': [],
'IND33SS59': [],
'IND33SS61': [],
'IND33SS62': [],
'IND33SS63': [],
'IND33SS64': [],
'IND33SS65': [],
'IND33SS66': [],
'IND33SS69': [],
'IND33SS71': [],
'IND33SS72': [],
'IND33SS79': [],
'IND33SS91': [],
'IND33SS99': [],
'IND42SS31': [],
'IND42SS32': [],
'IND42SS33': [],
'IND42SS34': [],
'IND42SS35': [],
'IND42SS36': [],
'IND42SS37': [],
'IND42SS38': [],
'IND42SS39': [],
'IND42SS41': [],
'IND42SS42': [],
'IND42SS43': [],
'IND42SS44': [],
'IND42SS45': [],
'IND42SS46': [],
'IND42SS47': [],
'IND42SS48': [],
'IND42SS49': [],
'IND42SS51': [],
'IND44SS11': [],
'IND44SS12': [],
'IND44SS13': [],
'IND44SS21': [],
'IND44SS22': [],
'IND44SS31': [],
'IND44SS41': [],
'IND44SS42': [],
'IND44SS51': [],
'IND44SS52': [],
'IND44SS53': [],
'IND44SS61': [],
'IND44SS71': [],
'IND44SS81': [],
'IND44SS82': [],
'IND44SS83': [],
'IND45SS11': [],
'IND45SS12': [],
'IND45SS22': [],
'IND45SS23': [],
'IND45SS31': [],
'IND45SS32': [],
'IND45SS33': [],
'IND45SS39': [],
'IND45SS41': [],
'IND45SS42': [],
'IND45SS43': [],
'IND48SS11': [],
'IND48SS12': [],
'IND48SS21': [],
'IND48SS31': [],
'IND48SS32': [],
'IND48SS41': [],
'IND48SS42': [],
'IND48SS51': [],
'IND48SS52': [],
'IND48SS53': [],
'IND48SS54': [],
'IND48SS55': [],
'IND48SS59': [],
'IND48SS61': [],
'IND48SS62': [],
'IND48SS69': [],
'IND48SS71': [],
'IND48SS72': [],
'IND48SS79': [],
'IND48SS81': [],
'IND48SS82': [],
'IND48SS83': [],
'IND48SS84': [],
'IND48SS85': [],
'IND48SS89': [],
'IND49SS11': [],
'IND49SS21': [],
'IND49SS22': [],
'IND49SS31': [],
'IND51SS11': [],
'IND51SS12': [],
'IND51SS21': [],
'IND51SS22': [],
'IND51SS51': [],
'IND51SS52': [],
'IND51SS73': [],
'IND51SS74': [],
'IND51SS79': [],
'IND51SS82': [],
'IND51SS91': [],
'IND52SS11': [],
'IND52SS21': [],
'IND52SS22': [],
'IND52SS23': [],
'IND52SS31': [],
'IND52SS32': [],
'IND52SS39': [],
'IND52SS41': [],
'IND52SS42': [],
'IND52SS51': [],
'IND52SS59': [],
'IND53SS11': [],
'IND53SS12': [],
'IND53SS13': [],
'IND53SS21': [],
'IND53SS22': [],
'IND53SS23': [],
'IND53SS24': [],
'IND53SS31': [],
'IND54SS11': [],
'IND54SS12': [],
'IND54SS13': [],
'IND54SS14': [],
'IND54SS15': [],
'IND54SS16': [],
'IND54SS17': [],
'IND54SS18': [],
'IND54SS19': [],
'IND55SS11': [],
'IND56SS11': [],
'IND56SS12': [],
'IND56SS13': [],
'IND56SS14': [],
'IND56SS15': [],
'IND56SS16': [],
'IND56SS17': [],
'IND56SS19': [],
'IND56SS21': [],
'IND56SS22': [],
'IND56SS29': [],
'IND61SS11': [],
'IND61SS12': [],
'IND61SS13': [],
'IND61SS14': [],
'IND61SS15': [],
'IND61SS16': [],
'IND61SS17': [],
'IND62SS11': [],
'IND62SS12': [],
'IND62SS13': [],
'IND62SS14': [],
'IND62SS15': [],
'IND62SS16': [],
'IND62SS19': [],
'IND62SS21': [],
'IND62SS22': [],
'IND62SS23': [],
'IND62SS31': [],
'IND62SS32': [],
'IND62SS33': [],
'IND62SS39': [],
'IND62SS41': [],
'IND62SS42': [],
'IND62SS43': [],
'IND62SS44': [],
'IND71SS11': [],
'IND71SS12': [],
'IND71SS13': [],
'IND71SS14': [],
'IND71SS15': [],
'IND71SS21': [],
'IND71SS31': [],
'IND71SS32': [],
'IND71SS39': [],
'IND72SS11': [],
'IND72SS12': [],
'IND72SS13': [],
'IND72SS23': [],
'IND72SS24': [],
'IND72SS25': [],
'IND81SS11': [],
'IND81SS12': [],
'IND81SS13': [],
'IND81SS14': [],
'IND81SS21': [],
'IND81SS22': [],
'IND81SS23': [],
'IND81SS29': [],
'IND81SS31': [],
'IND81SS32': [],
'IND81SS33': [],
'IND81SS34': [],
'IND81SS39': [],
'IND81SS41': [],
'IND92SS11': [],
'IND92SS21': [],
'IND92SS31': [],
'IND92SS41': [],
'IND92SS51': [],
'IND92SS61': [],
'IND92SS71': [],
'IND92SS81': [],
'IND99SS00': []
}
  

let LoanRangeA = new L.layerGroup();
let LoanRangeB = new L.layerGroup();
let LoanRangeC = new L.layerGroup();
let LoanRangeD = new L.layerGroup();
let LoanRangeE = new L.layerGroup();

let PPPgroup = new L.layerGroup();
let PPSgroup = new L.layerGroup();

let BA1group = new L.layerGroup();
let BA2group = new L.layerGroup();
let BA3group = new L.layerGroup();
let BA4group = new L.layerGroup();
let BA5group = new L.layerGroup();

let JR1group = new L.layerGroup();
let JR2group = new L.layerGroup();
let JR3group = new L.layerGroup();
let JR4group = new L.layerGroup();
let JR5group = new L.layerGroup();
let JR6group = new L.layerGroup();
let JR7group = new L.layerGroup();
let JR8group = new L.layerGroup();

let BT01group = new L.layerGroup();
let BT02group = new L.layerGroup();
let BT03group = new L.layerGroup();
let BT04group = new L.layerGroup();
let BT05group = new L.layerGroup();
let BT06group = new L.layerGroup();
let BT07group = new L.layerGroup();
let BT08group = new L.layerGroup();
let BT09group = new L.layerGroup();
let BT10group = new L.layerGroup();
let BT11group = new L.layerGroup();
let BT12group = new L.layerGroup();
let BT13group = new L.layerGroup();
let BT14group = new L.layerGroup();
let BT15group = new L.layerGroup();
let BT16group = new L.layerGroup();
let BT17group = new L.layerGroup();
let BT18group = new L.layerGroup();
let BT19group = new L.layerGroup();
let BT20group = new L.layerGroup();
let BT21group = new L.layerGroup();
let BT22group = new L.layerGroup();
let BT23group = new L.layerGroup();
let BT24group = new L.layerGroup();
let BT25group = new L.layerGroup();
let BT26group = new L.layerGroup();


let VAgroup = new L.layerGroup();
let MDgroup = new L.layerGroup();
let ILgroup = new L.layerGroup();
let TXgroup = new L.layerGroup();


// const makeFoo = async (bounds) => {
//   // get points for `bounds` from the server
//   const url = `server/?bounds`;
//   const response = await fetch(url);

//   if (response.ok) {
//       if (LAYERS.foo && map.hasLayer(LAYERS.foo)) {
//         map.removeLayer(LAYERS.foo);
//       }
//       LAYERS.foo = L.markerClusterGroup();
//       const records = await response.json();
//       records.forEach((r) => LAYERS.foo.addLayer(L.marker(new L.LatLng(r.lat, r.lng))));
//       map.addLayer(LAYERS.foo);
//   }
// }
// var route1 = fs.createReadStream('/dev/random')
// var route1Layer = L.geoJSON("../data/state_data/geo/state_agg/51/51pt.json");
// var route2Layer = L.geoJSON(route2);
// var route3Layer = L.geoJSON(route3);
// var route4Layer = L.geoJSON(route4);
// var route5Layer = L.geoJSON(route5);

// group = new L.FeatureGroup();
// group.addLayer(route1Layer); //pump
// group.addLayer(route2Layer);
// group.addLayer(route3Layer);
// group.addLayer(route4Layer);
// group.addLayer(route5Layer);
// map.addLayer(group);



// VAgroup, MDgroup, ILgroup
let objpts = { '51' : [], 
  '48' : [], 
  '17' : [],
  '24' : [] }

let objPM = {
  'PPP': [],
  'PPS': []
}
let objLR = { 
  'LR1' : [], 
  'LR2' : [],
  'LR3' : [],
  'LR4' : [],
  'LR5' : [] }

let objBA = {
  'BA1': [],
  'BA2': [],
  'BA3': [],
  'BA4': [],
  'BA5': []
}

let objJR = {
  'JR1': [],
  'JR2': [],
  'JR3': [],
  'JR4': [],
  'JR5': [],
  'JR6': [],
  'JR7': [],
  'JR8': []
}

let objBT = {
  'BT01': [],
  'BT02': [],
  'BT03': [],
  'BT04': [],
  'BT05': [],
  'BT06': [],
  'BT07': [],
  'BT08': [],
  'BT09': [],
  'BT10': [],
  'BT11': [],
  'BT12': [],
  'BT13': [],
  'BT14': [],
  'BT15': [],
  'BT16': [],
  'BT17': [],
  'BT18': [],
  'BT19': [],
  'BT20': [],
  'BT21': [],
  'BT22': [],
  'BT23': [],
  'BT24': [],
  'BT25': [],
  'BT26': [],
}

// $("#mybutton3").click(function (event) { 
//   d3.json('/vacountydata', function(data){
//     var plethstate = L.geoJSON()
//     plethstate.addData(data)
//     plethstate.eachLayer(function(layer){
//         var ptswithin = turf.within(myPts.toGeoJSON(), layer.toGeoJSON());
//         console.log(ptswithin.features.length +" points in this poly");
//         console.log(ptswithin);
//         console.log(plethstate)
//     })
//   })
// })

// CHECKBOX FOR REQUEST ACCESS SINGLE-INSTANCE
$('input[type="checkbox"]').on('change', function() {
  $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});


// Attach a change event handler to the checkboxes.
// checkboxes.change(function() {
//   enabledSettings = checkboxes
//     .filter(":checked") // Filter out unchecked boxes.
//     .map(function() { // Extract values using jQuery map.
//       return this.value;
//     }) 
//     .get() // Get array.
    
//   console.log(enabledSettings);
// });


// var socket = io('https://d1faqcaxpyxvpg.cloudfront.net');
// socket.on('connect', function() {
//   socket.emit('my event', {data: 'I\'m connected!'});
// });
//Change to react to layer tree selections 
//through remote object pipe streaming
// L.DomEvent.on(L.DomUtil.get('onlysel'), 'click', function() {
//   lay.collapseTree(true).expandSelected(true);
// });
$("#mybutton5").click(function (event) { 
  if ($("input[name='points']:checked")){
    // ptsData = socket.emit('my event', {data: $("input[name='points']:checked").val()})
    ptsData = $("input[name='points']:checked").val()
    var idVal = $("input[name='points']:checked").attr('id')
    var d1 = $(`#label[for='${idVal}']`)
  }
  const fipssubGroups = new L.layerGroup();

  const subGroups = [];
  industry = L.geoJson.ajax(ptsData, {
    pointToLayer: function (feature){
        return new L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        className: feature.properties.HASHcodePM,
        radius: getRadius(feature.properties.CurrentApprovalAmount),
        fillOpacity:0.8,
        color: getColor(feature.properties.Industry),
        fillColor: getColor(feature.properties.Industry),
        weight: getRadius(feature.properties.CurrentApprovalAmount)/3,
    }) //ends circleMarker
  }, //end pointToLayer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<b>Loan Recipient</b>: " + feature.properties.BorrowerName + "<br><b>Borrower Address</b>: " + feature.properties.full_add + "<br><b>Business Type</b>: " + feature.properties.BusinessType +  "<br><b>Loan Type</b>: " + feature.properties.ProcessingMethod +  "<br><b>Date Approved</b>: " + feature.properties.DateApproved + "<br><b>Current Approval Amount $</b>: " + feature.properties.CurrentApprovalAmount + "<br><b>Jobs Reported #</b>: " + feature.properties.JobsReported + "<br><b>Loan Forgiveness Amount</b>: " + feature.properties.ForgivenessAmount + "<br><b>Loan Status</b>: " + feature.properties.LoanStatus + "<br><b>Loan Status Date</b>: " + feature.properties.LoanStatusDate + "<br><b>Servicing Lender</b>: " + feature.properties.ServicingLenderName + "<br><b>Estimated Lender Profit</b>: " + feature.properties.Estimated_LenderProfit + "<br><b>Industry</b>: "+ feature.properties.Industry + "<br><b>Subsector</b>: "+ feature.properties.IndustrySubsector)
      var HASHcode = feature.properties["HASHcodePM"];
      var INDSShash = feature.properties.HASHcodePM.slice(0,9);  
      var LRhash = feature.properties.HASHcodePM.slice(9,12); 
      var JRhash = feature.properties.HASHcodePM.slice(12,15); 
      var BThash = feature.properties.HASHcodePM.slice(15,19); 
      var BAhash = feature.properties.HASHcodePM.slice(19,22); 
      var PMhash = feature.properties.HASHcodePM.slice(22,25); 
      var SThash = feature.properties.FIPSblock.slice(0,2);

      var tagCategories = subGroups[HASHcode];
      if (!tagCategories) {
        tagCategories = subGroups[HASHcode] = L.geoJson();
        //tagCategories._leaflet_id = HASHcode; //renames layer 
      } tagCategories.addLayer(layer); //tagCategories.addTo(mainTag)

      objpts[SThash].push(tagCategories);

      objPM[PMhash].push(tagCategories);
      
      objLR[LRhash].push(tagCategories);

      objBA[BAhash].push(tagCategories);

      objJR[JRhash].push(tagCategories);

      objBT[BThash].push(tagCategories);

      objSS[INDSShash].push(tagCategories)

    }, //ends onEachFeature
  }) //ends ajax request
  industry.on("data:loaded", function (){
    d1.append('<span id="loaded" style="background-color:black; color:white"> loaded</span>'); }) 
}); //ends click function 



  function getRadius(r) {
    return  r > 5000000 ? 12 :
            r > 2000000 ? 9 :
            r > 1000000 ? 6 :
            r > 350000 ? 4 :
            r > 150000 ? 2 :
            0;
    }
  
  function getRadiusColor(d) {
    return  d > 0 ? '#E4E8E9' :
    0;
    }
  
  function getColor(c) {
    if (c == "Not Available") {
      return "#86b4a9";
    }
    else if (c == "Nonclassifiable Establishments") {
      return "#c8c8a9";
    }
    else if (c == "Accommodation and Food Services") {
      return "#17becf"; 
    }
    else if (c == "Administrative and Support and Waste Management and Remediation Services") {
     return "#dbdb8d";
    }
    else if (c == "Agriculture, Forestry, Fishing and Hunting") {
      return "#bcbd22";
    }
    else if (c == "Arts, Entertainment, and Recreation") {
      return "#c7c7c7";
    }
    else if (c == "Construction") {
      return "#7f7f7f";
    }
    else if (c == "Educational Services") {
      return "#f7b6d2";
    }
    else if (c == "Finance and Insurance") {
      return "#e377c2";
    }
    else if (c == "Health Care and Social Assistance") {
      return "#c49c94";
    }
    else if (c == "Information") {
      return "#8c564b";
    }
    else if (c == "Management of Companies and Enterprises") {
      return "#c5b0d5";
    }
    else if (c == "Manufacturing") {
     return "#9467bd";
    }
    else if (c == "Mining, Quarrying, and Oil and Gas Extraction") {
      return "#ff9896";
    }
    else if (c == "Other Services (except Public Administration)") {
      return "#d62728";
    }
    else if (c == "Professional, Scientific, and Technical Services") {
      return "#98df8a";
    }
    else if (c == "Public Administration") {
      return "#2ca02c";
    }
    else if (c == "Real Estate and Rental and Leasing") {
      return "#ffbb78";
    }
    else if (c == "Retail Trade") {
      return "#ff7f0e";
    }
    else if (c == "Transportation and Warehousing") {
      return "#aec7e8";
    }
    else if (c == "Utilities") {
      return "#1f77b4";
    }
    else if (c == "Wholesale Trade") {
      return "#9edae5";
    }
  }
  
  
  
  
  