import React, { useEffect } from 'react'
import styles from './Dragndrop.module.scss'
import { useState } from 'react';

export default function Dragndrop({ getFiles }) {

    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFiles(files)
    }, [files])
  
    const handleDragOver = (event) => {
      event.preventDefault();
      setDragging(true);
    };
  
    const handleDragLeave = (event) => {
      event.preventDefault();
      setDragging(false);
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      setDragging(false);
  
      const droppedFiles = Array.from(event.dataTransfer.files);
      setFiles(droppedFiles);
    };
  
    const handleFileSelect = (event) => {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    };
  
    return (
      <div className={styles.dragndrop}>
        <input type="file" multiple onChange={handleFileSelect} name="file" id="file" style={{ display: 'none' }} />
        <label
          htmlFor="file"
          className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {files.length > 0 ? (
            <div>
              <h5>Выбранные файлы:</h5>
              {files.map((file) => (
                <p key={file.name}>{file.name}</p>
              ))}
            </div>
          ) : (
            <h5>Перетащите файлы сюда или нажмите для выбора</h5>
          )}
        </label>
      </div>
    );
  };
