'use client'
import { Tag } from "@/src/common/types";
import { getUserInfo } from "@/src/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Tag as AntdTag } from "antd";
import { useControl } from '@/src/store/useControl';

const TagsFilter = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const { selectedTag, setSelectedTag, setSearchKeyword } = useControl();

  const { data: userInfo } = useQuery({
    queryKey: ['getUserInfo', userName],
    queryFn: () => getUserInfo({ name: userName as string }),
  });

  const onClickTag = (tag: Tag) => {
    setSearchKeyword('');
    setSelectedTag(tag);
  };
  
  return (
    <div>
      <div className='text-sm mb-[8px]'>태그</div>
      {userInfo?.tags.map((tag: Tag) => (
        <AntdTag
          key={tag.name}
          style={{
            userSelect: 'none',
            backgroundColor: selectedTag?.id === tag.id ? '#459fff' : '#cdcdcd',
            color: selectedTag?.id === tag.id ? '#ffffff' : '#262626',
            padding: 6,
            lineHeight: 1,
            borderRadius: 6,
          }}
          bordered={false}
          onClick={() => onClickTag(tag)}
        >
          {'#' + tag.name}
        </AntdTag>
      ))}
    </div>
  )
}

export default TagsFilter;