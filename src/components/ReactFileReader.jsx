import React, { useState } from "react";
import FileReader from "react-file-reader";

const ReactFileReader = () => {
  //for imagelist
  const [images, setImages] = useState([]);
  //for preview image base64
  const [previewImages, setPreviewImages] = useState([]);

  //check the image is in the array and if not, set it
  const checkIncludeAndSet = file => {
    file.base64.map(item => {
      //check the item is in the array or not and if not
      if (!previewImages.includes(item)) {
        setImages(images.concat(Array.from(file.fileList)));
        setPreviewImages(previewImages.concat(file.base64));
      } else {
        //if item was already in array
        //setError("Your image is already selected");
      }
    });
  };

  const handleFiles = files => {
    //check current file number + files number in the array <= 4 or not
    if (files.base64.length + previewImages.length <= 4) {
      checkIncludeAndSet(files);
    } else {
      //setError("Maximum 4 files allowed");
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: 140,
          height: 140,
          background: "gray",
          margin: "auto",
          cursor: "pointer"
        }}
      >
        <FileReader
          handleFiles={handleFiles}
          base64={true}
          multipleFiles={true}
        >
          <div
            style={{
              width: 140,
              paddingTop: 65,
              paddingBottom: 60,
              textAlign: "center",
              fontWeight: "bolder"
            }}
          >
            Upload
          </div>
        </FileReader>
      </div>
      <div>
        {previewImages.length > 0 &&
          previewImages.map((preview, index) => (
            <div
              key={index}
              style={{
                border: 2,
                borderColor: "gray",
                marginLeft: 2,
                width: 24,
                height: 24
              }}
            >
              <div
                style={{
                  padding: 5,
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bolder",
                  textAlign: "center",
                  background: "red"
                }}
              >
                <span
                  onClick={e => {
                    e.preventDefault();
                    setImages(
                      images.filter(image => images.indexOf(image) !== index)
                    );
                    setPreviewImages(
                      previewImages.filter(
                        image => previewImages.indexOf(image) !== index
                      )
                    );
                  }}
                >
                  x
                </span>
              </div>
              <img src={preview} id={index} className="w-full h-full " alt="" />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ReactFileReader;
