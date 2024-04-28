import { Tag } from "antd";
import { useState } from "react";

const Tags = () => {
  const [tags, setTags] = useState<string[]>(['tag1', 'tag2', 'tag3']);

  return (
    <div>
      {tags.map((tag: string) => (
        <Tag key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  )
}

export default Tags;