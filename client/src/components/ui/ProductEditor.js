import { useRef, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../newAxios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ProductEditor({ text, handleText }) {
  const [cookies] = useCookies();
  const QuillRef = useRef();

  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const formData = new FormData();
      const imageFile = input.files[0];
      formData.append('imageFile', imageFile);

      const getImageURL = async (formData) => {
        const response = instance.post(`/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`,
          },
        });
        return response;
      };

      try {
        getImageURL(formData).then((response) => {
          const url = response.data.data[0];
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="상품 세부 이미지" />`
            );
          }
          return { ...response, success: true };
        });
      } catch (error) {
        return { ...error.response, success: false };
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['image'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={text}
        onChange={handleText}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
}

export default ProductEditor;
