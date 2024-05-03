import React, { useEffect, useRef, useState, forwardRef} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Flex, Input, Tag, Tooltip } from 'antd';
import { FieldValues } from 'react-hook-form';
import { Tag as TagType } from '@/src/types';

const Tags = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value: tags } = props;

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== removedTag);
    console.log(newTags);
    onChange(newTags);
  };

  const showInput = () => {
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

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    onChange(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  return (
    <Flex gap="4px 0" wrap="wrap">
      {tags?.map((tag: TagType, index: number) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag.id}
              size="small"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.name?.length > 20;
        const tagElem = (
          <Tag
            key={tag.id}
            closable={true}
            style={{ userSelect: 'none' }}
            onClose={() => handleClose(tag.name)}
            bordered={false}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag.name);
                  e.preventDefault();
                }
              }}
            >
              {'#' + (isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name)}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.name} key={tag.id}>
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
          className='w-[80px] inline-block'
        />
      ) : (
        <Tag icon={<PlusOutlined />} onClick={showInput}>
          태그 추가
        </Tag>
      )}
    </Flex>
  );
});

Tags.displayName = 'Tags';

export default Tags;