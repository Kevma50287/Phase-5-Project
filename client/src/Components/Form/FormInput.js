import React from "react";

const FormInput = ({formData, handleFormInput, formKey, inputLabel, inputType="text"}) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/3 text-right pr-4">
        <label htmlFor={formKey}>{inputLabel}:</label>
      </div>
      <div className="w-2/3">
        <input
          className="bg-gray-100 rounded border-2 border-gray-300 w-full"
          name={formKey}
          type={inputType}
          value={formData[formKey]}
          onChange={handleFormInput}
        ></input>
      </div>
    </div>
  );
};

export default FormInput;
