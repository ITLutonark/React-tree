import React, { useState } from "react";

import TreeNode from "../TreeNode/TreeNode";
import styles from "./Tree.module.css"

// Основной компонент дерева
const Tree = () => {
  const [treeData, setTreeData] = useState([
    {
      title: "Каталог",
      children: [
        {
          title: "Главная страница1",
          children: [
            {
              title: "Дочерняя  страница1.1",
              children: [{ title: "Дочерняя страница 1.1.1" }],
            },
          ],
        },
        {
          title: "Главная страница2",
          children: [{ title: "Дочерняя  страница2.1" }],
          children: [{ title: "Дочерняя страница 2.1.1" },{ title: "Дочерняя страница 2.2.1" } ],
        },
      ],
    },
  ]);

  const addNode = (parentTitle, childTitle) => {
    const addChild = (nodes) => {
      return nodes.map((node) => {
        if (node.title === parentTitle) {
          return {
            ...node,
            children: [...(node.children || []), { title: childTitle }],
          };
        }
        if (node.children) {
          return { ...node, children: addChild(node.children) };
        }
        return node;
      });
    };

    setTreeData(addChild(treeData));
  };

  const deleteNode = (titleToDelete) => {
    const removeNode = (nodes) => {
      return nodes.reduce((acc, node) => {
        if (node.title === titleToDelete) {
          return acc; // Пропускаем узел для удаления
        }
        const children = node.children ? removeNode(node.children) : [];
        return [...acc, { ...node, children }];
      }, []);
    };

    setTreeData(removeNode(treeData));
  };

  return (
    <div>
      {treeData.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          onAdd={addNode}
          onDelete={deleteNode}
        />
      ))}
    </div>
  );
};

export default Tree;
