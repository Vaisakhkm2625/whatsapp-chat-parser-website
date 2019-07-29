import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { StyledLabel, StyledP, StyledInput } from './style';

const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

const processFile = file => {
  if (!file) return;
  if (file.type === 'text/plain') {
    const reader = new FileReader();

    reader.onloadend = () => console.log(reader.result);
    reader.readAsText(file);
  } else {
    console.error(`${file.type} is not a supported file type`);
  }
};

const onChangeHandler = e => processFile(e.target.files[0]);

const Dropzone = ({ id }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onDragEnterOverHandler = e => {
    preventDefaults(e);
    setIsHighlighted(true);
  };

  const onDragLeaveHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
  };

  const onDropHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <form
      onDragEnter={onDragEnterOverHandler}
      onDragOver={onDragEnterOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <StyledInput
        id={id}
        type="file"
        accept="text/plain"
        onChange={onChangeHandler}
      />
      <StyledLabel htmlFor={id} isHighlighted={isHighlighted}>
        <StyledP>
          Click here to upload a file or drag and drop it onto the dashed region
        </StyledP>
      </StyledLabel>
    </form>
  );
};

Dropzone.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Dropzone;
