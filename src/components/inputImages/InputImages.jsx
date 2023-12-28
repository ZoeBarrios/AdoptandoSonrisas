import { ErrorMessage } from "formik";

export default function InputImages({
  values,
  setFieldValue,
  multiple = false,
  isRequired = false,
}) {
  return (
    <>
      <label
        htmlFor={multiple ? "images" : "image"}
        className="bg-orange p-2 rounded font-bold text-white cursor-pointer hover:bg-lightOrange transition-all"
      >
        {multiple ? "Agregar imágenes" : "Agregar imagen"}
      </label>
      <input
        id={multiple ? "images" : "image"}
        name={multiple ? "images" : "image"}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          if (multiple) {
            const filesArray = Array.from(event.currentTarget.files);
            setFieldValue("images", [...values.images, ...filesArray]);
          } else {
            setFieldValue("image", event.currentTarget.files[0]);
          }
        }}
      />
      {isRequired && (
        <ErrorMessage name={multiple ? "images" : "image"}>
          {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
        </ErrorMessage>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {multiple
          ? values.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full text-xs"
                  onClick={() => {
                    const updatedImages = [...values.images];
                    updatedImages.splice(index, 1);
                    setFieldValue("images", updatedImages);
                  }}
                >
                  X
                </button>
              </div>
            ))
          : values.image && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(values.image)}
                  alt="Image"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full text-xs"
                  onClick={() => {
                    setFieldValue("image", "");
                  }}
                >
                  X
                </button>
              </div>
            )}
      </div>
    </>
  );
}
