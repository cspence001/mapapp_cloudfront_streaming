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
