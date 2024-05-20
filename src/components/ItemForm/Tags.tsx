import React, { useEffect, useRef, useState, forwardRef} from 'react';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import { FieldValues } from 'react-hook-form';

const Tags = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value: tags, isActive } = props;

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== removedTag);
    console.log(newTags);
    onChange(newTags);
  };

  const showInput = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      onChange([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  
  if (!isActive) {
    if (tags.length === 0) return <></>;
    else return (
      <div>
        {tags?.map((tag: string, index: number) => (
          <span key={index} className='inline-block mr-[4px] text-blue text-[12px]'>
            {`#${tag}`}
          </span>
        ))}
      </div>
    )
  } else return (
    <div className='h-[28px]'>
      {tags?.map((tag: string, index: number) => {
        const isLongTag = tag.length > 10;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            style={{ 
              userSelect: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              lineHeight: '22px',
            }}
            onClose={() => handleClose(tag)}
            bordered={false}
          >
            <span className='inline-block text-blue'>
              {'#' + (isLongTag ? `${tag.slice(0, 10)}...` : tag)}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          className='w-[100px] inline-block text-[12px] leading-1'
        />
      ) : (
        <button
          onClick={(e) => showInput(e)}
          className='cursor-pointer px-[6px] text-[12px] leading-[22px] bg-gray10 rounded text-gray400'
        >
          + 태그 추가
        </button>
      )}
    </div>
  );
});

Tags.displayName = 'Tags';

export default Tags;