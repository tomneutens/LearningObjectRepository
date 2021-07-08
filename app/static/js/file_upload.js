
$(function() {

    let file_structure = {};
    let imagesPreview = function(input, placeToInsertImagePreview) {
      file_structure = {};
      let dom_structure;
      let container = $(placeToInsertImagePreview);
      container.empty();
      if (input.files) {
        let filesAmount = input.files.length;
        for (i = 0; i < filesAmount; i++) {
            let filePath = input.files[i].webkitRelativePath;
            let splitPath = filePath.split("/");
            addToFileStructure(file_structure, splitPath);
            let fileInfoElement = $("<li>");
        }
        dom_structure = generateListFromFileStructure(file_structure);
      }
      container.append(dom_structure);
    };
    
    $("#input-multi-files").on("change", function() {
      imagesPreview(this, "div.preview-images");
    });

    let addToFileStructure = (parentdirobj, splitfilename) => {
      if (splitfilename.length == 1){
        parentdirobj[splitfilename[0]] = 1;
      }else{
        if (!parentdirobj[splitfilename[0]]){
          parentdirobj[splitfilename[0]] = {}
        }
        let usedfilename = splitfilename.shift()
        addToFileStructure(parentdirobj[usedfilename], splitfilename);
      }
    };

    let generateListFromFileStructure = (filestructure) => {
      let domStructureRoot = $('<ul>');
      for (key in filestructure){
        if (filestructure[key] === 1){
          domStructureRoot.append($('<li>').text(key));
        }else{
          let folderitem = $("<li>").text(key);
          //let fileitems = $('<li>');
          folderitem.append(generateListFromFileStructure(filestructure[key]));
          domStructureRoot.append(folderitem);
          //domStructureRoot.append(fileitems);
        }
      }
      return domStructureRoot;
    }

  });
