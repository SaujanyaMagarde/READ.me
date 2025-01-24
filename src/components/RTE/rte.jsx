import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function Rte({ name, control, label, defaultValue = "" }) {
  return (
    <div className="">
      {label && <label className="">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_LICENSE_KEY}
            initialValue={defaultValue}
            value={value} // This binds the current content value
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
            onEditorChange={(content) => onChange(content)} // Pass editor content to onChange
          />
        )}
      />
    </div>
  );
}

export default Rte;
