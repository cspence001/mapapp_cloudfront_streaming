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
  


// Define marker and layer keys
const markerKeys = ['51', '48', '17', '24'];
const layerKeys = ['LoanRangeA', 'LoanRangeB', 'LoanRangeC', 'LoanRangeD', 'LoanRangeE', 'PPPgroup', 'PPSgroup', 
'BA1group', 'BA2group', 'BA3group', 'BA4group', 'BA5group', 
'JR1group', 'JR2group', 'JR3group', 'JR4group', 'JR5group', 'JR6group', 'JR7group', 'JR8group', 
'BT01group', 'BT02group', 'BT03group', 'BT04group', 'BT05group', 'BT06group','BT07group','BT08group','BT09group','BT10group','BT11group','BT12group','BT13group','BT14group','BT15group','BT16group','BT17group','BT18group','BT19group','BT20group','BT21group','BT22group','BT23group','BT24group','BT25group','BT26group',
'ind00ss00group', 'ind11ss11group', 'ind11ss12group', 'ind11ss13group', 'ind11ss14group', 'ind11ss19group', 'ind11ss21group', 'ind11ss22group', 'ind11ss23group', 'ind11ss24group', 'ind11ss25group', 'ind11ss29group', 'ind11ss31group',
'ind11ss32group', 'ind11ss33group', 'ind11ss41group', 'ind11ss42group', 'ind11ss51group', 'ind11ss52group', 'ind11ss53group', 'ind21ss11group', 'ind21ss21group', 'ind21ss22group', 'ind21ss23group', 'ind21ss31group', 'ind22ss11group', 'ind22ss12group', 'ind22ss13group', 'ind23ss61group', 'ind23ss62group', 'ind23ss71group', 'ind23ss72group', 'ind23ss73group',
'ind23ss79group', 'ind23ss81group', 'ind23ss82group', 'ind23ss83group', 'ind23ss89group', 'ind31ss11group', 'ind31ss12group', 'ind31ss13group', 'ind31ss14group', 'ind31ss15group', 'ind31ss16group', 'ind31ss17group', 'ind31ss18group', 'ind31ss19group', 'ind31ss21group', 'ind31ss22group', 'ind31ss31group', 'ind31ss32group', 'ind31ss33group', 'ind31ss41group',
'ind31ss49group', 'ind31ss51group', 'ind31ss52group', 'ind31ss59group', 'ind31ss61group', 'ind31ss62group', 'ind31ss69group', 'ind32ss11group', 'ind32ss12group', 'ind32ss19group', 'ind32ss21group', 'ind32ss22group', 'ind32ss31group', 'ind32ss41group', 'ind32ss51group', 'ind32ss52group', 'ind32ss53group', 'ind32ss54group', 'ind32ss55group', 'ind32ss56group',
'ind32ss59group', 'ind32ss61group', 'ind32ss62group', 'ind32ss71group', 'ind32ss72group', 'ind32ss73group', 'ind32ss74group', 'ind32ss79group', 'ind33ss11group', 'ind33ss12group', 'ind33ss13group', 'ind33ss14group', 'ind33ss15group', 'ind33ss21group', 'ind33ss22group', 'ind33ss23group', 'ind33ss24group', 'ind33ss25group', 'ind33ss26group', 'ind33ss27group', 'ind33ss28group',
'ind33ss29group', 'ind33ss31group', 'ind33ss32group', 'ind33ss33group', 'ind33ss34group', 'ind33ss35group', 'ind33ss36group', 'ind33ss39group', 'ind33ss41group', 'ind33ss42group', 'ind33ss43group', 'ind33ss44group', 'ind33ss45group', 'ind33ss46group', 'ind33ss51group', 'ind33ss52group', 'ind33ss53group', 'ind33ss59group', 'ind33ss61group', 'ind33ss62group', 'ind33ss63group',
'ind33ss64group', 'ind33ss65group', 'ind33ss66group', 'ind33ss69group', 'ind33ss71group', 'ind33ss72group', 'ind33ss79group', 'ind33ss91group', 'ind33ss99group', 'ind42ss31group', 'ind42ss32group', 'ind42ss33group', 'ind42ss34group', 'ind42ss35group', 'ind42ss36group', 'ind42ss37group', 'ind42ss38group', 'ind42ss39group', 'ind42ss41group', 'ind42ss42group', 'ind42ss43group',
'ind42ss44group', 'ind42ss45group', 'ind42ss46group', 'ind42ss47group', 'ind42ss48group', 'ind42ss49group', 'ind42ss51group', 'ind44ss11group', 'ind44ss12group', 'ind44ss13group', 'ind44ss21group', 'ind44ss22group', 'ind44ss31group', 'ind44ss41group', 'ind44ss42group', 'ind44ss51group', 'ind44ss52group', 'ind44ss53group', 'ind44ss61group', 'ind44ss71group', 'ind44ss81group',
'ind44ss82group', 'ind44ss83group', 'ind45ss11group', 'ind45ss12group', 'ind45ss22group', 'ind45ss23group', 'ind45ss31group', 'ind45ss32group', 'ind45ss33group', 'ind45ss39group', 'ind45ss41group', 'ind45ss42group', 'ind45ss43group', 'ind48ss11group', 'ind48ss12group', 'ind48ss21group', 'ind48ss31group', 'ind48ss32group', 'ind48ss41group', 'ind48ss42group', 'ind48ss51group',
'ind48ss52group', 'ind48ss53group', 'ind48ss54group', 'ind48ss55group', 'ind48ss59group', 'ind48ss61group', 'ind48ss62group', 'ind48ss69group', 'ind48ss71group', 'ind48ss72group', 'ind48ss79group', 'ind48ss81group', 'ind48ss82group', 'ind48ss83group', 'ind48ss84group', 'ind48ss85group', 'ind48ss89group', 'ind49ss11group', 'ind49ss21group', 'ind49ss22group', 'ind49ss31group',
'ind51ss11group', 'ind51ss12group', 'ind51ss21group', 'ind51ss22group', 'ind51ss51group', 'ind51ss52group', 'ind51ss73group', 'ind51ss74group', 'ind51ss79group', 'ind51ss82group', 'ind51ss91group', 'ind52ss11group', 'ind52ss21group', 'ind52ss22group', 'ind52ss23group', 'ind52ss31group', 'ind52ss32group', 'ind52ss39group', 'ind52ss41group', 'ind52ss42group', 'ind52ss51group',
'ind52ss59group', 'ind53ss11group', 'ind53ss12group', 'ind53ss13group', 'ind53ss21group', 'ind53ss22group', 'ind53ss23group', 'ind53ss24group', 'ind53ss31group', 'ind54ss11group', 'ind54ss12group', 'ind54ss13group', 'ind54ss14group', 'ind54ss15group', 'ind54ss16group', 'ind54ss17group', 'ind54ss18group', 'ind54ss19group', 'ind55ss11group', 'ind56ss11group', 'ind56ss12group',
'ind56ss13group', 'ind56ss14group', 'ind56ss15group', 'ind56ss16group', 'ind56ss17group', 'ind56ss19group', 'ind56ss21group', 'ind56ss22group', 'ind56ss29group', 'ind61ss11group', 'ind61ss12group', 'ind61ss13group', 'ind61ss14group', 'ind61ss15group', 'ind61ss16group', 'ind61ss17group', 'ind62ss11group', 'ind62ss12group', 'ind62ss13group', 'ind62ss14group', 'ind62ss15group',
'ind62ss16group', 'ind62ss19group', 'ind62ss21group', 'ind62ss22group', 'ind62ss23group', 'ind62ss31group', 'ind62ss32group', 'ind62ss33group', 'ind62ss39group', 'ind62ss41group', 'ind62ss42group', 'ind62ss43group', 'ind62ss44group', 'ind71ss11group', 'ind71ss12group', 'ind71ss13group', 'ind71ss14group', 'ind71ss15group', 'ind71ss21group', 'ind71ss31group', 'ind71ss32group',
'ind71ss39group', 'ind72ss11group', 'ind72ss12group', 'ind72ss13group', 'ind72ss23group', 'ind72ss24group', 'ind72ss25group', 'ind81ss11group', 'ind81ss12group', 'ind81ss13group', 'ind81ss14group', 'ind81ss21group', 'ind81ss22group', 'ind81ss23group', 'ind81ss29group', 'ind81ss31group', 'ind81ss32group', 'ind81ss33group', 'ind81ss34group', 'ind81ss39group', 'ind81ss41group',
'ind92ss11group', 'ind92ss21group', 'ind92ss31group', 'ind92ss41group', 'ind92ss51group', 'ind92ss61group', 'ind92ss71group', 'ind92ss81group', 'ind99ss00group'];

// Define object to hold layers for each category
const objpts = {};
const objPM = {};
const objLR = {};
const objBA = {};
const objJR = {};
const objBT = {};
const objSS = {};

// Initialize layer groups for each category
markerKeys.forEach(markerKey => {
    objpts[markerKey] = [];
});
layerKeys.forEach(layerKey => {
    objPM[layerKey] = [];
    objLR[layerKey] = [];
    objBA[layerKey] = [];
    objJR[layerKey] = [];
    objBT[layerKey] = [];
    objSS[layerKey] = [];
});

// Define layer groups
const layerGroups = {
  'VAgroup': VAgroup,
  'TXgroup': TXgroup,
  'ILgroup': ILgroup,
  'MDgroup': MDgroup,
  LoanRange: ['A', 'B', 'C', 'D', 'E'],
  'PPPgroup': PPPgroup,
  'PPSgroup': PPSgroup,
  'BA1group': BA1group,
  'BA2group': BA2group,
  'BA3group': BA3group,
  'BA4group': BA4group,
  'BA5group': BA5group,
  'JR1group':JR1group,
  'JR2group':JR2group,
  'JR3group':JR3group,
  'JR4group':JR4group,
  'JR5group':JR5group,
  'JR6group':JR6group,
  'JR7group':JR7group,
  'JR8group':JR8group,
  'BT01group':BT01group,
  'BT02group':BT02group,
  'BT03group':BT03group,
  'BT04group':BT04group,
  'BT05group':BT05group,
  'BT06group':BT06group,
  'BT07group':BT07group,
  'BT08group':BT08group,
  'BT09group':BT09group,
  'BT10group':BT10group,
  'BT11group':BT11group,
  'BT12group':BT12group,
  'BT13group':BT13group,
  'BT14group':BT14group,
  'BT15group':BT15group,
  'BT16group':BT16group,
  'BT17group':BT17group,
  'BT18group':BT18group,
  'BT19group':BT19group,
  'BT20group':BT20group,
  'BT21group':BT21group,
  'BT22group':BT22group,
  'BT23group':BT23group,
  'BT24group':BT24group,
  'BT25group':BT25group,
  'BT26group':BT26group,
  'ind00ss00group':ind00ss00group, 
  ind11ss: ['11', '12', '13', '14', '19', '21', '22', '23', '24', '25', '29', '31', '32', '33', '41', '42', '51', '52', '53'],
  'ind21ss11group':ind21ss11group, 
  'ind21ss21group':ind21ss21group, 
  'ind21ss22group':ind21ss22group, 
  'ind21ss23group':ind21ss23group, 
  'ind21ss31group':ind21ss31group, 
  'ind22ss11group':ind22ss11group, 
  'ind22ss12group':ind22ss12group, 
  'ind22ss13group':ind22ss13group, 
  'ind23ss61group':ind23ss61group, 
  'ind23ss62group':ind23ss62group, 
  'ind23ss71group':ind23ss71group, 
  'ind23ss72group':ind23ss72group, 
  'ind23ss73group':ind23ss73group, 
  'ind23ss79group':ind23ss79group, 
  'ind23ss81group':ind23ss81group, 
  'ind23ss82group':ind23ss82group, 
  'ind23ss83group':ind23ss83group, 
  'ind23ss89group':ind23ss89group, 
  'ind31ss11group':ind31ss11group, 
  'ind31ss12group':ind31ss12group, 
  'ind31ss13group':ind31ss13group, 
  'ind31ss14group':ind31ss14group, 
  'ind31ss15group':ind31ss15group, 
  'ind31ss16group':ind31ss16group, 
  'ind31ss17group':ind31ss17group, 
  'ind31ss18group':ind31ss18group, 
  'ind31ss19group':ind31ss19group, 
  'ind31ss21group':ind31ss21group, 
  'ind31ss22group':ind31ss22group, 
  'ind31ss31group':ind31ss31group, 
  'ind31ss32group':ind31ss32group, 
  'ind31ss33group':ind31ss33group, 
  'ind31ss41group':ind31ss41group, 
  'ind31ss49group':ind31ss49group, 
  'ind31ss51group':ind31ss51group, 
  'ind31ss52group':ind31ss52group, 
  'ind31ss59group':ind31ss59group, 
  'ind31ss61group':ind31ss61group, 
  'ind31ss62group':ind31ss62group, 
  'ind31ss69group':ind31ss69group, 
  'ind32ss11group':ind32ss11group, 
  'ind32ss12group':ind32ss12group, 
  'ind32ss19group':ind32ss19group, 
  'ind32ss21group':ind32ss21group, 
  'ind32ss22group':ind32ss22group, 
  'ind32ss31group':ind32ss31group, 
  'ind32ss41group':ind32ss41group, 
  'ind32ss51group':ind32ss51group, 
  'ind32ss52group':ind32ss52group, 
  'ind32ss53group':ind32ss53group, 
  'ind32ss54group':ind32ss54group, 
  'ind32ss55group':ind32ss55group, 
  'ind32ss56group':ind32ss56group, 
  'ind32ss59group':ind32ss59group, 
  'ind32ss61group':ind32ss61group, 
  'ind32ss62group':ind32ss62group, 
  'ind32ss71group':ind32ss71group, 
  'ind32ss72group':ind32ss72group, 
  'ind32ss73group':ind32ss73group, 
  'ind32ss74group':ind32ss74group, 
  'ind32ss79group':ind32ss79group, 
  'ind33ss11group':ind33ss11group, 
  'ind33ss12group':ind33ss12group, 
  'ind33ss13group':ind33ss13group, 
  'ind33ss14group':ind33ss14group, 
  'ind33ss15group':ind33ss15group, 
  'ind33ss21group':ind33ss21group, 
  'ind33ss22group':ind33ss22group, 
  'ind33ss23group':ind33ss23group, 
  'ind33ss24group':ind33ss24group, 
  'ind33ss25group':ind33ss25group, 
  'ind33ss26group':ind33ss26group, 
  'ind33ss27group':ind33ss27group, 
  'ind33ss28group':ind33ss28group, 
  'ind33ss29group':ind33ss29group, 
  'ind33ss31group':ind33ss31group, 
  'ind33ss32group':ind33ss32group, 
  'ind33ss33group':ind33ss33group, 
  'ind33ss34group':ind33ss34group, 
  'ind33ss35group':ind33ss35group, 
  'ind33ss36group':ind33ss36group, 
  'ind33ss39group':ind33ss39group, 
  'ind33ss41group':ind33ss41group, 
  'ind33ss42group':ind33ss42group, 
  'ind33ss43group':ind33ss43group, 
  'ind33ss44group':ind33ss44group, 
  'ind33ss45group':ind33ss45group, 
  'ind33ss46group':ind33ss46group, 
  'ind33ss51group':ind33ss51group, 
  'ind33ss52group':ind33ss52group, 
  'ind33ss53group':ind33ss53group, 
  'ind33ss59group':ind33ss59group, 
  'ind33ss61group':ind33ss61group, 
  'ind33ss62group':ind33ss62group, 
  'ind33ss63group':ind33ss63group, 
  'ind33ss64group':ind33ss64group, 
  'ind33ss65group':ind33ss65group, 
  'ind33ss66group':ind33ss66group, 
  'ind33ss69group':ind33ss69group, 
  'ind33ss71group':ind33ss71group, 
  'ind33ss72group':ind33ss72group, 
  'ind33ss79group':ind33ss79group, 
  'ind33ss91group':ind33ss91group, 
  'ind33ss99group':ind33ss99group, 
  'ind42ss31group':ind42ss31group, 
  'ind42ss32group':ind42ss32group, 
  'ind42ss33group':ind42ss33group, 
  'ind42ss34group':ind42ss34group, 
  'ind42ss35group':ind42ss35group, 
  'ind42ss36group':ind42ss36group, 
  'ind42ss37group':ind42ss37group, 
  'ind42ss38group':ind42ss38group, 
  'ind42ss39group':ind42ss39group, 
  'ind42ss41group':ind42ss41group, 
  'ind42ss42group':ind42ss42group, 
  'ind42ss43group':ind42ss43group, 
  'ind42ss44group':ind42ss44group, 
  'ind42ss45group':ind42ss45group, 
  'ind42ss46group':ind42ss46group, 
  'ind42ss47group':ind42ss47group, 
  'ind42ss48group':ind42ss48group, 
  'ind42ss49group':ind42ss49group, 
  'ind42ss51group':ind42ss51group, 
  'ind44ss11group':ind44ss11group, 
  'ind44ss12group':ind44ss12group, 
  'ind44ss13group':ind44ss13group, 
  'ind44ss21group':ind44ss21group, 
  'ind44ss22group':ind44ss22group, 
  'ind44ss31group':ind44ss31group, 
  'ind44ss41group':ind44ss41group, 
  'ind44ss42group':ind44ss42group, 
  'ind44ss51group':ind44ss51group, 
  'ind44ss52group':ind44ss52group, 
  'ind44ss53group':ind44ss53group, 
  'ind44ss61group':ind44ss61group, 
  'ind44ss71group':ind44ss71group, 
  'ind44ss81group':ind44ss81group, 
  'ind44ss82group':ind44ss82group, 
  'ind44ss83group':ind44ss83group, 
  'ind45ss11group':ind45ss11group, 
  'ind45ss12group':ind45ss12group, 
  'ind45ss22group':ind45ss22group, 
  'ind45ss23group':ind45ss23group, 
  'ind45ss31group':ind45ss31group, 
  'ind45ss32group':ind45ss32group, 
  'ind45ss33group':ind45ss33group, 
  'ind45ss39group':ind45ss39group, 
  'ind45ss41group':ind45ss41group, 
  'ind45ss42group':ind45ss42group, 
  'ind45ss43group':ind45ss43group, 
  'ind48ss11group':ind48ss11group, 
  'ind48ss12group':ind48ss12group, 
  'ind48ss21group':ind48ss21group, 
  'ind48ss31group':ind48ss31group, 
  'ind48ss32group':ind48ss32group, 
  'ind48ss41group':ind48ss41group, 
  'ind48ss42group':ind48ss42group, 
  'ind48ss51group':ind48ss51group, 
  'ind48ss52group':ind48ss52group, 
  'ind48ss53group':ind48ss53group, 
  'ind48ss54group':ind48ss54group, 
  'ind48ss55group':ind48ss55group, 
  'ind48ss59group':ind48ss59group, 
  'ind48ss61group':ind48ss61group, 
  'ind48ss62group':ind48ss62group, 
  'ind48ss69group':ind48ss69group, 
  'ind48ss71group':ind48ss71group, 
  'ind48ss72group':ind48ss72group, 
  'ind48ss79group':ind48ss79group, 
  'ind48ss81group':ind48ss81group, 
  'ind48ss82group':ind48ss82group, 
  'ind48ss83group':ind48ss83group, 
  'ind48ss84group':ind48ss84group, 
  'ind48ss85group':ind48ss85group, 
  'ind48ss89group':ind48ss89group, 
  'ind49ss11group':ind49ss11group, 
  'ind49ss21group':ind49ss21group, 
  'ind49ss22group':ind49ss22group, 
  'ind49ss31group':ind49ss31group, 
  'ind51ss11group':ind51ss11group, 
  'ind51ss12group':ind51ss12group, 
  'ind51ss21group':ind51ss21group, 
  'ind51ss22group':ind51ss22group, 
  'ind51ss51group':ind51ss51group, 
  'ind51ss52group':ind51ss52group, 
  'ind51ss73group':ind51ss73group, 
  'ind51ss74group':ind51ss74group, 
  'ind51ss79group':ind51ss79group, 
  'ind51ss82group':ind51ss82group, 
  'ind51ss91group':ind51ss91group, 
  'ind52ss11group':ind52ss11group, 
  'ind52ss21group':ind52ss21group, 
  'ind52ss22group':ind52ss22group, 
  'ind52ss23group':ind52ss23group, 
  'ind52ss31group':ind52ss31group, 
  'ind52ss32group':ind52ss32group, 
  'ind52ss39group':ind52ss39group, 
  'ind52ss41group':ind52ss41group, 
  'ind52ss42group':ind52ss42group, 
  'ind52ss51group':ind52ss51group, 
  'ind52ss59group':ind52ss59group, 
  'ind53ss11group':ind53ss11group, 
  'ind53ss12group':ind53ss12group, 
  'ind53ss13group':ind53ss13group, 
  'ind53ss21group':ind53ss21group, 
  'ind53ss22group':ind53ss22group, 
  'ind53ss23group':ind53ss23group, 
  'ind53ss24group':ind53ss24group, 
  'ind53ss31group':ind53ss31group, 
  'ind54ss11group':ind54ss11group, 
  'ind54ss12group':ind54ss12group, 
  'ind54ss13group':ind54ss13group, 
  'ind54ss14group':ind54ss14group, 
  'ind54ss15group':ind54ss15group, 
  'ind54ss16group':ind54ss16group, 
  'ind54ss17group':ind54ss17group, 
  'ind54ss18group':ind54ss18group, 
  'ind54ss19group':ind54ss19group, 
  'ind55ss11group':ind55ss11group, 
  'ind56ss11group':ind56ss11group, 
  'ind56ss12group':ind56ss12group, 
  'ind56ss13group':ind56ss13group, 
  'ind56ss14group':ind56ss14group, 
  'ind56ss15group':ind56ss15group, 
  'ind56ss16group':ind56ss16group, 
  'ind56ss17group':ind56ss17group, 
  'ind56ss19group':ind56ss19group, 
  'ind56ss21group':ind56ss21group, 
  'ind56ss22group':ind56ss22group, 
  'ind56ss29group':ind56ss29group, 
  'ind61ss11group':ind61ss11group, 
  'ind61ss12group':ind61ss12group, 
  'ind61ss13group':ind61ss13group, 
  'ind61ss14group':ind61ss14group, 
  'ind61ss15group':ind61ss15group, 
  'ind61ss16group':ind61ss16group, 
  'ind61ss17group':ind61ss17group, 
  'ind62ss11group':ind62ss11group, 
  'ind62ss12group':ind62ss12group, 
  'ind62ss13group':ind62ss13group, 
  'ind62ss14group':ind62ss14group, 
  'ind62ss15group':ind62ss15group, 
  'ind62ss16group':ind62ss16group, 
  'ind62ss19group':ind62ss19group, 
  'ind62ss21group':ind62ss21group, 
  'ind62ss22group':ind62ss22group, 
  'ind62ss23group':ind62ss23group, 
  'ind62ss31group':ind62ss31group, 
  'ind62ss32group':ind62ss32group, 
  'ind62ss33group':ind62ss33group, 
  'ind62ss39group':ind62ss39group, 
  'ind62ss41group':ind62ss41group, 
  'ind62ss42group':ind62ss42group, 
  'ind62ss43group':ind62ss43group, 
  'ind62ss44group':ind62ss44group, 
  'ind71ss11group':ind71ss11group, 
  'ind71ss12group':ind71ss12group, 
  'ind71ss13group':ind71ss13group, 
  'ind71ss14group':ind71ss14group, 
  'ind71ss15group':ind71ss15group, 
  'ind71ss21group':ind71ss21group, 
  'ind71ss31group':ind71ss31group, 
  'ind71ss32group':ind71ss32group, 
  'ind71ss39group':ind71ss39group, 
  'ind72ss11group':ind72ss11group, 
  'ind72ss12group':ind72ss12group, 
  'ind72ss13group':ind72ss13group, 
  'ind72ss23group':ind72ss23group, 
  'ind72ss24group':ind72ss24group, 
  'ind72ss25group':ind72ss25group, 
  'ind81ss11group':ind81ss11group, 
  'ind81ss12group':ind81ss12group, 
  'ind81ss13group':ind81ss13group, 
  'ind81ss14group':ind81ss14group, 
  'ind81ss21group':ind81ss21group, 
  'ind81ss22group':ind81ss22group, 
  'ind81ss23group':ind81ss23group, 
  'ind81ss29group':ind81ss29group, 
  'ind81ss31group':ind81ss31group, 
  'ind81ss32group':ind81ss32group, 
  'ind81ss33group':ind81ss33group, 
  'ind81ss34group':ind81ss34group, 
  'ind81ss39group':ind81ss39group, 
  'ind81ss41group':ind81ss41group, 
  'ind92ss11group':ind92ss11group, 
  'ind92ss21group':ind92ss21group, 
  'ind92ss31group':ind92ss31group, 
  'ind92ss41group':ind92ss41group, 
  'ind92ss51group':ind92ss51group, 
  'ind92ss61group':ind92ss61group, 
  'ind92ss71group':ind92ss71group, 
  'ind92ss81group':ind92ss81group, 
  'ind99ss00group':ind99ss00group 
};
 // Function to add or remove layers from content group
function updateContentGroup(layerGroup, obj, markerKey, action) {
  if (action === 'add') {
      obj[markerKey].forEach(marker => layerGroup.addLayer(marker));
  } else if (action === 'remove') {
      obj[markerKey].forEach(marker => content.removeLayer(marker));
  }
}
  // Event listener for overlay add/remove
myMap.on('overlayadd overlayremove', () => {
  Object.keys(layerGroups).forEach(layerKey => {
      const layerGroup = layerGroups[layerKey];
      if (!myMap.hasLayer(layerGroup)) {
          updateContentGroup(layerGroup, objpts, layerKey, 'remove');
          updateContentGroup(layerGroup, objPM, layerKey, 'remove');
          updateContentGroup(layerGroup, objLR, layerKey, 'remove');
          updateContentGroup(layerGroup, objBA, layerKey, 'remove');
          updateContentGroup(layerGroup, objJR, layerKey, 'remove');
          updateContentGroup(layerGroup, objBT, layerKey, 'remove');
          updateContentGroup(layerGroup, objSS, layerKey, 'remove');
      } else {
          updateContentGroup(layerGroup, objpts, layerKey, 'add');
          updateContentGroup(layerGroup, objPM, layerKey, 'add');
          updateContentGroup(layerGroup, objLR, layerKey, 'add');
          updateContentGroup(layerGroup, objBA, layerKey, 'add');
          updateContentGroup(layerGroup, objJR, layerKey, 'add');
          updateContentGroup(layerGroup, objBT, layerKey, 'add');
          updateContentGroup(layerGroup, objSS, layerKey, 'add');
      }
  });
});
  
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
    if (!myMap.hasLayer(objbg[17]) && !myMap.hasLayer(objbg[24]) && !myMap.hasLayer(objbg[51]) && !myMap.hasLayer(objbg[48])) {
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
    myMap.setView(e.target._popup._latlng);
    myMap.fitBounds(e.target._popup._source._bounds);
    // myMap.setView(e.target._popup._latlng, e.target._zoom);
    console.log(e)
  });


// ZOOM TO STATE
$('select[name="dropdown"]').change(function(){
  var latlng = $(this).val().split(',');
  var lat = latlng[0];
  var lng = latlng[1];
  var zoom = 8;
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
  const linkcontentb = L.layerGroup().addTo(myMap)
  $("#checkbox3").change(function () { 
    if (this.checked){
    block.addTo(linkcontentb)
    }
    else {
      block.remove(linkcontentb)
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
      block.clearLayers()
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



//LabelSelectors
itemsArray= {
  'STATE':[],
  'IND':[],
  'LR':[],
  'JR':[],
  'BT':[],
  'BA':[],
  'LT':[]
};

var htmlObject = layerControl.getContainer().querySelectorAll('input');
$(htmlObject).on("change", function(e) {
  inditems = new Array();
  if ($(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox')) {
    let mainSel = ($(this).siblings('span').text()) //main selector
    if ($(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox:checked')) {
      if ($(this).parents('.leaflet-layerstree-node:nth(1)')[0]) { //if All Industry node
      var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
      NodeList.prototype.forEach = Array.prototype.forEach
      ancestors.forEach(item =>{
        let inditem = item.children[0].children[1].innerText.slice(0,4)
        let newobj = {inditem, 'stream':true}
        var existObj = itemsArray['IND'].find(({inditem}) => inditem === newobj.inditem);
        if(existObj) {
          existObj.stream = newobj.stream;
        } else {
          itemsArray['IND'].push(newobj)
        }//console.log(mainSel, inditem);
      }); console.log(itemsArray,mainSel, "MultiSel added") //push parameters to websocket 
      }
      if (!$(this).parents('.leaflet-layerstree-node:nth(1)')[0]) { //If All Other node checked
        var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
        NodeList.prototype.forEach = Array.prototype.forEach
        ancestors.forEach(item => {
          if (mainSel == "State") {
            let stateitem = item.children[0].children[1].innerText;
            let newstateobj = {stateitem, 'stream':true}
            var existstateObj = itemsArray['STATE'].find(({stateitem}) => stateitem === newstateobj.stateitem);
            if(existstateObj) {
              existstateObj.stream = newstateobj.stream;
            } else {
              itemsArray['STATE'].push(newstateobj)
            }
          }
          if (mainSel == "Loan Range") {
            let lritem = item.children[0].children[1].innerText;
            let newlrobj = {lritem, 'stream':true}
            var existlrObj = itemsArray['LR'].find(({lritem}) => lritem === newlrobj.lritem);
            if(existlrObj) {
              existlrObj.stream = newlrobj.stream;
            } else {
              itemsArray['LR'].push(newlrobj)
            }
          }
          if (mainSel == "Job Range") {
            let jritem = item.children[0].children[1].innerText;
            let newjrobj = {jritem, 'stream':true}
            var existjrObj = itemsArray['JR'].find(({jritem}) => jritem === newjrobj.jritem);
            if(existjrObj) {
              existjrObj.stream = newjrobj.stream;
            } else {
              itemsArray['JR'].push(newjrobj)
            }
          }
          if (mainSel == "Business Type") {
            let btitem = item.children[0].children[1].innerText;
            let newbtobj = {btitem, 'stream':true}
            var existbtObj = itemsArray['BT'].find(({btitem}) => btitem === newbtobj.btitem);
            if(existbtObj) {
              existbtObj.stream = newbtobj.stream;
            } else {
              itemsArray['BT'].push(newbtobj)
            }
          }
          if (mainSel == "Business Age") {
            let baitem = item.children[0].children[1].innerText;
            let newbaobj = {baitem, 'stream':true}
            var existbaObj = itemsArray['BA'].find(({baitem}) => baitem === newbaobj.baitem);
            if(existbaObj) {
              existbaObj.stream = newbaobj.stream;
            } else {
              itemsArray['BA'].push(newbaobj)
            }
          }
          if (mainSel == "Loan Type") {
            let ltitem = item.children[0].children[1].innerText;
            let newltobj = {ltitem, 'stream':true}
            var existltObj = itemsArray['LT'].find(({ltitem}) => ltitem === newltobj.ltitem);
            if(existltObj) {
              existltObj.stream = newltobj.stream;
            } else {
              itemsArray['LT'].push(newltobj)
            }
          }
        });console.log(mainSel, itemsArray, "All Other MultiSel added"); //Loan Range a,b,c,d,e
      }
    } else {//If All Ind unchecked
        if ($(this).parents('.leaflet-layerstree-node:nth(1)')[0]) {
          var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
          NodeList.prototype.forEach = Array.prototype.forEach
          ancestors.forEach(item => {
            let inditem = item.children[0].children[1].innerText.slice(0,4)
            let newobj = {inditem, 'stream':false}
            var existObj = itemsArray['IND'].find(({inditem}) => inditem === newobj.inditem);
            if(existObj) {
              existObj.stream = newobj.stream;
            } else {
              itemsArray['IND'].push(newobj)
            }
          });console.log(itemsArray, mainSel, "Ind MultiSel removed")
          //let listContainingRemainingValues = inditems.filter(f => !IND.includes(f))
          // ++ push parameters to websocket
        } else { //If All Other unchecked
          var ancestors = $(this).parents('.leaflet-layerstree-node')[0].children[1].childNodes;
          NodeList.prototype.forEach = Array.prototype.forEach
          ancestors.forEach(item =>{
            if (mainSel == "State") {
              let stateitem = item.children[0].children[1].innerText;
              let newstateobj = {stateitem, 'stream':false}
              var existstateObj = itemsArray['STATE'].find(({stateitem}) => stateitem === newstateobj.stateitem);
              if(existstateObj) {
                existstateObj.stream = newstateobj.stream;
              } else {
                itemsArray['STATE'].push(newstateobj)
              }
            }
            if (mainSel == "Loan Range") {
              let lritem = item.children[0].children[1].innerText;
              let newlrobj = {lritem, 'stream':false}
              var existlrObj = itemsArray['LR'].find(({lritem}) => lritem === newlrobj.lritem);
              if(existlrObj) {
                existlrObj.stream = newlrobj.stream;
              } else {
                itemsArray['LR'].push(newlrobj)
              }
            }
            if (mainSel == "Job Range") {
              let jritem = item.children[0].children[1].innerText;
              let newjrobj = {jritem, 'stream':false}
              var existjrObj = itemsArray['JR'].find(({jritem}) => jritem === newjrobj.jritem);
              if(existjrObj) {
                existjrObj.stream = newjrobj.stream;
              } else {
                itemsArray['JR'].push(newjrobj)
              }
            }
            if (mainSel == "Business Type") {
              let btitem = item.children[0].children[1].innerText;
              let newbtobj = {btitem, 'stream':false}
              var existbtObj = itemsArray['BT'].find(({btitem}) => btitem === newbtobj.btitem);
              if(existbtObj) {
                existbtObj.stream = newbtobj.stream;
              } else {
                itemsArray['BT'].push(newbtobj)
              }
            }
            if (mainSel == "Business Age") {
              let baitem = item.children[0].children[1].innerText;
              let newbaobj = {baitem, 'stream':false}
              var existbaObj = itemsArray['BA'].find(({baitem}) => baitem === newbaobj.baitem);
              if(existbaObj) {
                existbaObj.stream = newbaobj.stream;
              } else {
                itemsArray['BA'].push(newbaobj)
              }
            }
            if (mainSel == "Loan Type") {
              let ltitem = item.children[0].children[1].innerText;
              let newltobj = {ltitem, 'stream':false}
              var existltObj = itemsArray['LT'].find(({ltitem}) => ltitem === newltobj.ltitem);
              if(existltObj) {
                existltObj.stream = newltobj.stream;
              } else {
                itemsArray['LT'].push(newltobj)
              }
            }
          });
          console.log(mainSel, itemsArray, "All Other MultiSel removed")
        }
    } //remove parameters from websocket
  } //SINGLE SELECTORS
  if ($(this).is('.leaflet-control-layers-selector')) { //if single selector checked
    if ($(this).is('.leaflet-control-layers-selector:checked')) { //if checked single selector in Ind
      if ($(this).parents('.leaflet-layerstree-node')[0]) {
        let inditem = $(this).siblings('span').text().slice(0,4)
        let isnum = /^\d+$/.test(inditem);
        if (isnum == true){ //if digit, Industry checked
          let mainSel = ($(this).parents('.leaflet-layerstree-node:nth(1)')[0].children[0].children[1].innerText) //main selector Label
          let newobj = {inditem, 'stream':true}
          var existObj = itemsArray['IND'].find(({inditem}) => inditem === newobj.inditem);
          if(existObj) {
            existObj.stream = newobj.stream;
          } else {
            itemsArray['IND'].push(newobj)
          }
          console.log(itemsArray,mainSel, "singleSel added", inditem)
        } else { //if Other, single selector checked
          if ($(this).parents('.leaflet-layerstree-node:nth(1)')[0]) {
            if (!$(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox')) {
              let mainSel = ($(this).parents('.leaflet-layerstree-node:nth(1)')[0].children[0].children[1].innerText) //main selector Label
              if (mainSel == "State") {
                let stateitem = $(this).siblings('span').text()
                let newstateobj = {stateitem, 'stream':true}
                var existstateObj = itemsArray['STATE'].find(({stateitem}) => stateitem === newstateobj.stateitem);
                if(existstateObj) {
                  existstateObj.stream = newstateobj.stream;
                } else {
                  itemsArray['STATE'].push(newstateobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", stateitem)
              }
              if (mainSel == "Loan Range") {
                let lritem = $(this).siblings('span').text()
                let newlrobj = {lritem, 'stream':true}
                var existlrObj = itemsArray['LR'].find(({lritem}) => lritem === newlrobj.lritem);
                if(existlrObj) {
                  existlrObj.stream = newlrobj.stream;
                } else {
                  itemsArray['LR'].push(newlrobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", lritem)
              }
              if (mainSel == "Job Range") {
                let jritem = $(this).siblings('span').text()
                let newjrobj = {jritem, 'stream':true}
                var existjrObj = itemsArray['JR'].find(({jritem}) => jritem === newjrobj.jritem);
                if(existjrObj) {
                  existjrObj.stream = newjrobj.stream;
                } else {
                  itemsArray['JR'].push(newjrobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", jritem)
              }
              if (mainSel == "Business Type") {
                let btitem = $(this).siblings('span').text()
                let newbtobj = {btitem, 'stream':true}
                var existbtObj = itemsArray['BT'].find(({btitem}) => btitem === newbtobj.btitem);
                if(existbtObj) {
                  existbtObj.stream = newbtobj.stream;
                } else {
                  itemsArray['BT'].push(newbtobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", btitem)
              }
              if (mainSel == "Business Age") {
                let baitem = $(this).siblings('span').text()
                let newbaobj = {baitem, 'stream':true}
                var existbaObj = itemsArray['BA'].find(({baitem}) => baitem === newbaobj.baitem);
                if(existbaObj) {
                  existbaObj.stream = newbaobj.stream;
                } else {
                  itemsArray['BA'].push(newbaobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", baitem)
              }
              if (mainSel == "Loan Type") {
                let ltitem = $(this).siblings('span').text()
                let newltobj = {ltitem, 'stream':true}
                var existltObj = itemsArray['LT'].find(({ltitem}) => ltitem === newltobj.ltitem);
                if(existltObj) {
                  existltObj.stream = newltobj.stream;
                } else {
                  itemsArray['LT'].push(newltobj)
                };
                console.log(itemsArray, mainSel, "singleSel added", ltitem)
              }
            }
          } 
        }
      } 
    } else {  //if unchecked single selector 
      if ($(this).parents('.leaflet-layerstree-node')[0]){
        if ($(this).parents('.leaflet-layerstree-node:nth(1)')[0]) {//main selector Label 
          let mainSel = ($(this).parents('.leaflet-layerstree-node:nth(1)')[0].children[0].children[1].innerText);
          let inditem = $(this).siblings('span').text().slice(0,4)
          let isnum = /^\d+$/.test(inditem);
          if (isnum == true){ //if digit, Industry unchecked
            let newobj = {inditem, 'stream':false}
            var existObj = itemsArray['IND'].find(({inditem}) => inditem === newobj.inditem);
            if(existObj) {
              existObj.stream = newobj.stream;
            } else {
              itemsArray['IND'].push(newobj)
            }
            console.log(itemsArray, mainSel, "singleSel removed", inditem) //Utilities 2211 unchecked
            } else { //if Other, unchecked
              if (!$(this).is('.leaflet-control-layers-selector.leaflet-layerstree-sel-all-checkbox')) {
                if (mainSel == "State") {
                  let stateitem = $(this).siblings('span').text()
                  let newstateobj = {stateitem, 'stream':false}
                  var existstateObj = itemsArray['STATE'].find(({stateitem}) => stateitem === newstateobj.stateitem);
                  if(existstateObj) {
                    existstateObj.stream = newstateobj.stream;
                  } else {
                    itemsArray['STATE'].push(newstateobj)
                  };
                  console.log(mainSel, itemsArray, "singleSel removed", stateitem)//All Other SingleSel
                }
                if (mainSel == "Loan Range") {
                  let lritem = $(this).siblings('span').text()
                  let newlrobj = {lritem, 'stream':false}
                  var existlrObj = itemsArray['LR'].find(({lritem}) => lritem === newlrobj.lritem);
                  if(existlrObj) {
                    existlrObj.stream = newlrobj.stream;
                  } else {
                    itemsArray['LR'].push(newlrobj)
                  };
                  console.log(mainSel, itemsArray, "singleSel removed", lritem)//All Other SingleSel
                }
                if (mainSel == "Job Range") {
                  let jritem = $(this).siblings('span').text()
                  let newjrobj = {jritem, 'stream':false}
                  var existjrObj = itemsArray['JR'].find(({jritem}) => jritem === newjrobj.jritem);
                  if(existjrObj) {
                    existjrObj.stream = newjrobj.stream;
                  } else {
                    itemsArray['JR'].push(newjrobj)
                  };
                  console.log(mainSel, itemsArray, "singleSel removed", jritem)//All Other SingleSel
                }
                if (mainSel == "Business Type") {
                  let btitem = $(this).siblings('span').text()
                  let newbtobj = {btitem, 'stream':false}
                  var existbtObj = itemsArray['BT'].find(({btitem}) => btitem === newbtobj.btitem);
                  if(existbtObj) {
                    existbtObj.stream = newbtobj.stream;
                  } else {
                    itemsArray['BT'].push(newbtobj)
                  };
                  console.log(itemsArray, mainSel, "singleSel removed", btitem)
                }
                if (mainSel == "Business Age") {
                  let baitem = $(this).siblings('span').text()
                  let newbaobj = {baitem, 'stream':false}
                  var existbaObj = itemsArray['BA'].find(({baitem}) => baitem === newbaobj.baitem);
                  if(existbaObj) {
                    existbaObj.stream = newbaobj.stream;
                  } else {
                    itemsArray['BA'].push(newbaobj)
                  };
                  console.log(itemsArray, mainSel, "singleSel removed", baitem)
                }
                if (mainSel == "Loan Type") {
                  let ltitem = $(this).siblings('span').text()
                  let newltobj = {ltitem, 'stream':false}
                  var existltObj = itemsArray['LT'].find(({ltitem}) => ltitem === newltobj.ltitem);
                  if(existltObj) {
                    existltObj.stream = newltobj.stream;
                  } else {
                    itemsArray['LT'].push(newltobj)
                  };
                  console.log(itemsArray, mainSel, "singleSel removed", ltitem)
                }
              }
            }
          } 
      } 
    } console.log(itemsArray)
    sessionStorage.setItem('myStorage', JSON.stringify(itemsArray));
    var getsessionStore = JSON.parse(sessionStorage.getItem('myStorage'));
    state=itemsArray['STATE']
    sessionStorage.setItem('STATE', JSON.stringify(state));
    var getsessionStoreSTATE = JSON.parse(sessionStorage.getItem('STATE'));
    console.log(getsessionStoreSTATE)
    if(getsessionStoreSTATE.indexOf("STATE").stream ==true){
      console.log(getsessionStore)
    }
  }
})
//var getsessionStore = JSON.parse(sessionStorage.getItem('myStorage'));

  
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
      ptsData = $("input[name='county']:checked").val() //add if/else clause to check if pts data already loaded for state
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
  // var groupblockjobs = L.featureGroup();
  // var groupblockloans = L.featureGroup();
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
var block = L.featureGroup()
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
        }).addTo(block);
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


// CHECKBOX FOR REQUEST ACCESS SINGLE-INSTANCE
$('input[type="checkbox"]').on('change', function() {
  $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});


$("#mybutton5").click(function (event) { 
  if ($("input[name='points']:checked")){
    // ptsData = socket.emit('my event', {data: $("input[name='points']:checked").val()})
    ptsData = $("input[name='points']:checked").val()
    var idVal = $("input[name='points']:checked").attr('id')
    var d1 = $(`#label[for='${idVal}']`)
    createLayerGroup(ptsData, idVal, d1);
  }
});

function createLayerGroup(ptsData, idVal, d1) {
  L.geoJson.ajax(ptsData, {
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
    }, //ends onEachFeature
  }) //ends ajax request
  industry.on("data:loaded", function (){
    d1.append('<span id="loaded" style="background-color:black; color:white"> loaded</span>'); }) 
    //console.log(subGroups);
    //console.log(objSS['IND00SS00'])
}; //ends click function 



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
  
  
  
  
  