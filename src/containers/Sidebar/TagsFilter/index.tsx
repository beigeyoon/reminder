'use client'
import { Tag } from "@/src/common/types";
import { getUserInfo } from "@/src/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Tag as AntdTag } from "antd";
import { useTagInfo } from "@/src/store/useTagInfo";

const TagsFilter = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const { tagInfo, setTagInfo } = useTagInfo();

  const { data: userInfo } = useQuery({
    queryKey: ['getUserInfo', userName],
    queryFn: () => getUserInfo({ name: userName as string }),
  });

  const onClickTag = (tag: Tag) => {
    setTagInfo(tag);
  };
  
  return (
    <div>
      <div className='text-sm mb-[8px]'>태그</div>
      {userInfo?.tags.map((tag: Tag) => (
        <AntdTag
          key={tag.name}
          style={{
            userSelect: 'none',
            backgroundColor: tagInfo?.id === tag.id ? '#459fff' : '#cdcdcd',
            color: tagInfo?.id === tag.id ? '#ffffff' : '#262626',
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